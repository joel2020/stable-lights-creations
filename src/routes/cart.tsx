import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({
    meta: [
      { title: "Cart & Checkout · It's Lit Neon" },
      { name: "description", content: "Every It's Lit Neon clock is built to order. Start your custom neon clock design and Joe will confirm before production." },
      { property: "og:title", content: "Cart & Checkout · It's Lit Neon" },
      { property: "og:description", content: "Custom neon clocks are made to order — start your design and Joe will confirm before we build." },
      { property: "og:url", content: "https://itslitneon.com/cart" },
      { name: "robots", content: "noindex,follow" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/cart" }],
  }),
});

function Cart() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 md:px-6 py-16 text-center">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Cart & Checkout</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Every clock is built to order</h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Because each piece is custom, orders start with our quick design form. Joe confirms your design and sends a secure payment link before production begins.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Button asChild size="lg" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
            <Link to="/shop">Start Your Order</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20">
            <a href="sms:+17024609190">Call or Text 702-460-9190</a>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
