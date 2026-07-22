import { useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { PageShell } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { getCheckoutSessionSummary } from '@/utils/payments.functions';
import { getStripeEnvironment } from '@/lib/stripe';

export const Route = createFileRoute('/checkout/return')({
  validateSearch: (s: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof s.session_id === 'string' ? s.session_id : undefined,
  }),
  component: CheckoutReturn,
  head: () => ({
    meta: [
      { title: "Order Confirmed · It's Lit Neon" },
      { name: 'description', content: "Your custom neon clock order is confirmed. Here's your receipt and what happens next." },
      { property: 'og:title', content: "Order Confirmed · It's Lit Neon" },
      { property: 'og:description', content: 'Your custom neon clock order is confirmed.' },
      { property: 'og:url', content: 'https://itslitneon.com/checkout/return' },
      { name: 'robots', content: 'noindex,follow' },
    ],
    links: [{ rel: 'canonical', href: 'https://itslitneon.com/checkout/return' }],
  }),
});

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

function CheckoutReturn() {
  const { session_id } = Route.useSearch();
  const fetchSummary = useServerFn(getCheckoutSessionSummary);
  const { data: summary, isLoading } = useQuery({
    queryKey: ['checkout-summary', session_id],
    queryFn: () => fetchSummary({ data: { sessionId: session_id!, environment: getStripeEnvironment() } }),
    enabled: !!session_id,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (summary) {
      (window as any).fbq?.('track', 'Purchase', { value: summary.total, currency: summary.currency || 'USD' });
    }
  }, [summary]);

  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 md:px-6 py-20">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-[var(--neon-green)]/15 flex items-center justify-center ring-glow-green">
            <Check className="h-8 w-8 text-[var(--neon-green)]" />
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl">You're <span className="text-[var(--neon-orange)] text-glow-orange">Lit Up!</span></h1>
          <p className="mt-4 text-muted-foreground">
            Your order is confirmed. We just sent a receipt to your inbox. Joe will review your design
            and reach out within 1 business day to confirm details before your clock goes into production.
          </p>
        </div>

        {session_id && (
          <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.02] p-6 text-left">
            <h2 className="font-display text-2xl mb-4">Order Receipt</h2>

            {isLoading && <p className="text-sm text-muted-foreground">Loading receipt…</p>}

            {summary && (
              <>
                <div className="space-y-2 text-sm">
                  {summary.items.map((item, i) => (
                    <div key={i} className="flex justify-between gap-4">
                      <span className="text-foreground">
                        {item.description}
                        {item.quantity > 1 && <span className="text-muted-foreground"> × {item.quantity}</span>}
                      </span>
                      <span className="tabular-nums">{formatMoney(item.amount, summary.currency)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatMoney(summary.subtotal, summary.currency)}</span>
                  </div>
                  {summary.discount > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Discount</span>
                      <span className="tabular-nums">−{formatMoney(summary.discount, summary.currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping (flat rate)</span>
                    <span className="tabular-nums">{formatMoney(summary.shipping, summary.currency)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span className="tabular-nums">{formatMoney(summary.tax, summary.currency)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between font-display text-xl">
                  <span>Total</span>
                  <span className="tabular-nums text-[var(--neon-orange)] text-glow-orange">
                    {formatMoney(summary.total, summary.currency)}
                  </span>
                </div>

                {summary.email && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Receipt sent to <span className="text-foreground">{summary.email}</span>
                  </p>
                )}
              </>
            )}

            <p className="mt-4 text-xs text-muted-foreground/70 break-all">Order ID: {session_id}</p>
          </div>
        )}

        <p className="mt-6 text-sm text-center">
          If you uploaded a logo or photo, please email the high-res file to{' '}
          <a href="mailto:support@itslitneon.com" className="text-[var(--neon-orange)] underline">support@itslitneon.com</a>{' '}
          referencing your order ID.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Button asChild size="lg" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
            <Link to="/gallery">See more builds</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
