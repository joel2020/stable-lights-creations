import { createFileRoute } from '@tanstack/react-router';
import { createStripeClient, type StripeEnv } from '@/lib/stripe.server';
import { enqueueTransactionalEmail } from '@/lib/email/server-send';

const OPS_PRIMARY = 'support@itslitneon.com';
const OPS_CC = 'support@itslitneon.com';

function formatMoney(amount: number | null | undefined, currency: string | null | undefined): string {
  if (amount == null) return '';
  const c = (currency || 'usd').toUpperCase();
  return `${(amount / 100).toFixed(2)} ${c}`;
}

function formatAddress(a?: any): string {
  if (!a) return '';
  return [a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(', '), a.country]
    .filter(Boolean).join(', ');
}

export const Route = createFileRoute('/api/public/stripe-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const env: StripeEnv = url.searchParams.get('env') === 'live' ? 'live' : 'sandbox';
        const signature = request.headers.get('stripe-signature');
        if (!signature) return new Response('Missing signature', { status: 400 });

        const webhookSecret = env === 'live'
          ? process.env.PAYMENTS_LIVE_WEBHOOK_SECRET
          : process.env.PAYMENTS_SANDBOX_WEBHOOK_SECRET;
        if (!webhookSecret) return new Response('Webhook secret not configured', { status: 500 });

        const body = await request.text();
        const stripe = createStripeClient(env);

        let event;
        try {
          event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
        } catch (err) {
          console.error('Stripe webhook signature verification failed', err);
          return new Response('Invalid signature', { status: 400 });
        }

        if (event.type !== 'checkout.session.completed') {
          return new Response('ok', { status: 200 });
        }

        const session = event.data.object as any;
        // Only act on paid sessions
        if (session.payment_status !== 'paid') {
          return new Response('ok', { status: 200 });
        }

        const meta = session.metadata || {};
        const customerEmail = session.customer_details?.email || session.customer_email;
        const customerName = session.customer_details?.name || '';
        const customerPhone = session.customer_details?.phone || '';
        const shipping = session.collected_information?.shipping_details
          || session.shipping_details
          || session.customer_details;
        const shippingAddress = formatAddress(shipping?.address);
        const productName = meta.productType === 'regular' ? 'Regular Neon Clock' : 'Custom Neon Clock';
        const orderTotal = formatMoney(session.amount_total, session.currency);
        const orderId = session.id;

        const designSummary = [
          meta.stable && `Name/Business: ${meta.stable}`,
          meta.horse && `Subtitle: ${meta.horse}`,
          meta.trainer && `Tagline: ${meta.trainer}`,
          meta.neonColor && `Neon: ${meta.neonColor}`,
          meta.colors && `Colors: ${meta.colors}`,
          meta.notes && `Notes: ${meta.notes}`,
        ].filter(Boolean).join(' · ');

        const customerData = {
          customerName, productName, orderTotal, orderId, shippingAddress, designSummary,
        };
        const opsData = {
          productName, orderTotal, orderId, customerName, customerEmail, customerPhone,
          shippingAddress,
          stable: meta.stable, horse: meta.horse, trainer: meta.trainer,
          colors: meta.colors, neonColor: meta.neonColor,
          photoName: meta.photoName, notes: meta.notes,
        };

        const results = await Promise.allSettled([
          customerEmail ? enqueueTransactionalEmail({
            templateName: 'order-confirmation',
            recipientEmail: customerEmail,
            templateData: customerData,
            idempotencyKey: `confirm-${orderId}`,
          }) : Promise.resolve({ success: false, reason: 'no_customer_email' }),
          enqueueTransactionalEmail({
            templateName: 'order-notification',
            recipientEmail: OPS_PRIMARY,
            templateData: opsData,
            idempotencyKey: `notify-${orderId}-primary`,
          }),
          enqueueTransactionalEmail({
            templateName: 'order-notification',
            recipientEmail: OPS_CC,
            templateData: opsData,
            idempotencyKey: `notify-${orderId}-cc`,
          }),
        ]);

        results.forEach((r, i) => {
          if (r.status === 'rejected') console.error(`Order email #${i} failed`, r.reason);
        });

        return new Response('ok', { status: 200 });
      },
    },
  },
});
