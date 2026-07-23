import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { enqueueTransactionalEmail } from '@/lib/email/server-send';

const InquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(40),
  shippingAddress: z.string().trim().min(8).max(500),
  stableName: z.string().trim().max(120).optional().default(''),
  logoUrl: z.string().trim().url().max(2000).optional().or(z.literal('')).default(''),
  logoFilename: z.string().trim().max(255).optional().default(''),
  notes: z.string().trim().max(2000).optional().default(''),
});

export const submitCustomOrderInquiry = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => InquirySchema.parse(data))
  .handler(async ({ data }) => {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Server is not configured to receive orders. Please email support@itslitneon.com.');
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: inserted, error } = await supabase
      .from('custom_order_inquiries')
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        shipping_address: data.shippingAddress,
        stable_name: data.stableName || null,
        logo_url: data.logoUrl || null,
        logo_filename: data.logoFilename || null,
        notes: data.notes || null,
      })
      .select('id')
      .single();

    if (error || !inserted) {
      console.error('Custom order insert failed', error);
      throw new Error('We could not save your order. Please email support@itslitneon.com.');
    }

    try {
      await enqueueTransactionalEmail({
        templateName: 'custom-order-inquiry',
        recipientEmail: 'support@itslitneon.com',
        templateData: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          shippingAddress: data.shippingAddress,
          stableName: data.stableName,
          logoUrl: data.logoUrl,
          logoFilename: data.logoFilename,
          notes: data.notes,
          inquiryId: inserted.id,
        },
        idempotencyKey: `custom-order-ops:${inserted.id}`,
      });
    } catch (e) {
      console.error('Custom order ops email enqueue failed', e);
      // Don't fail the user — we have the record.
    }

    try {
      await enqueueTransactionalEmail({
        templateName: 'custom-order-customer-confirmation',
        recipientEmail: data.email,
        templateData: {
          fullName: data.fullName,
          stableName: data.stableName,
          inquiryId: inserted.id,
        },
        idempotencyKey: `custom-order-customer:${inserted.id}`,
      });
    } catch (e) {
      console.error('Custom order customer email enqueue failed', e);
    }

    return { success: true, id: inserted.id };
  });
