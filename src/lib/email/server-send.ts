/**
 * Server-only email enqueue helper. Used by webhook routes that need to send
 * transactional emails without a user JWT (e.g. Stripe webhook).
 *
 * Mirrors the enqueue path of /lovable/email/transactional/send but uses the
 * service-role key for auth (signature-verified caller is trusted).
 */
import * as React from 'react';
import { render } from '@react-email/render';
import { createClient } from '@supabase/supabase-js';
import { TEMPLATES } from '@/lib/email-templates/registry';

const SITE_NAME = "It's Lit Neon";
const SENDER_DOMAIN = 'notify.itslitneon.com';
const FROM_DOMAIN = 'itslitneon.com';

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function enqueueTransactionalEmail(opts: {
  templateName: string;
  recipientEmail: string;
  templateData?: Record<string, any>;
  idempotencyKey?: string;
}): Promise<{ success: boolean; reason?: string }> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase env vars missing for email send');
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const template = TEMPLATES[opts.templateName];
  if (!template) throw new Error(`Template '${opts.templateName}' not found`);

  const effectiveRecipient = (template.to || opts.recipientEmail).toLowerCase();
  const messageId = crypto.randomUUID();
  const idempotencyKey = opts.idempotencyKey || messageId;
  const templateData = opts.templateData || {};

  // Suppression check
  const { data: suppressed } = await supabase
    .from('suppressed_emails')
    .select('id')
    .eq('email', effectiveRecipient)
    .maybeSingle();
  if (suppressed) {
    await supabase.from('email_send_log').insert({
      message_id: messageId, template_name: opts.templateName,
      recipient_email: effectiveRecipient, status: 'suppressed',
    });
    return { success: false, reason: 'email_suppressed' };
  }

  // Unsubscribe token (one per email)
  let unsubscribeToken: string;
  const { data: existingToken } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', effectiveRecipient)
    .maybeSingle();
  if (existingToken && !existingToken.used_at) {
    unsubscribeToken = existingToken.token;
  } else if (!existingToken) {
    unsubscribeToken = generateToken();
    await supabase.from('email_unsubscribe_tokens').upsert(
      { token: unsubscribeToken, email: effectiveRecipient },
      { onConflict: 'email', ignoreDuplicates: true }
    );
    const { data: stored } = await supabase
      .from('email_unsubscribe_tokens').select('token').eq('email', effectiveRecipient).maybeSingle();
    if (stored?.token) unsubscribeToken = stored.token;
  } else {
    return { success: false, reason: 'email_suppressed' };
  }

  // Render
  const element = React.createElement(template.component, templateData);
  const html = await render(element);
  const text = await render(element, { plainText: true });
  const subject = typeof template.subject === 'function'
    ? template.subject(templateData)
    : template.subject;

  await supabase.from('email_send_log').insert({
    message_id: messageId, template_name: opts.templateName,
    recipient_email: effectiveRecipient, status: 'pending',
  });

  const { error: enqueueError } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text,
      purpose: 'transactional',
      label: opts.templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  });

  if (enqueueError) {
    await supabase.from('email_send_log').insert({
      message_id: messageId, template_name: opts.templateName,
      recipient_email: effectiveRecipient, status: 'failed',
      error_message: 'Failed to enqueue email',
    });
    throw enqueueError;
  }
  return { success: true };
}
