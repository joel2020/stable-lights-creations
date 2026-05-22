import { createFileRoute, Link } from '@tanstack/react-router';
import { PageShell } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const Route = createFileRoute('/checkout/return')({
  validateSearch: (s: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof s.session_id === 'string' ? s.session_id : undefined,
  }),
  component: CheckoutReturn,
  head: () => ({ meta: [{ title: 'Order Confirmed · It\'s Lit Neon' }] }),
});

function CheckoutReturn() {
  const { session_id } = Route.useSearch();
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 md:px-6 py-20 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-[var(--neon-green)]/15 flex items-center justify-center ring-glow-green">
          <Check className="h-8 w-8 text-[var(--neon-green)]" />
        </div>
        <h1 className="mt-6 font-display text-5xl md:text-6xl">You're <span className="text-[var(--neon-orange)] text-glow-orange">Lit Up!</span></h1>
        <p className="mt-4 text-muted-foreground">
          Your order is confirmed. We just sent a receipt to your inbox. Joe will review your design
          and reach out within 1 business day to confirm details before your clock goes into production.
        </p>
        {session_id && (
          <p className="mt-2 text-xs text-muted-foreground/70">Order ID: {session_id}</p>
        )}
        <p className="mt-4 text-sm">
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
