import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Sparkles } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact · Custom Neon Clock Quotes · It's Lit Neon" },
      { name: "description", content: "Contact It's Lit Neon. Email support@itslitneon.com or start a free design proof to build your custom neon clock for any home, business, or gift." },
      { property: "og:title", content: "Contact It's Lit Neon" },
      { property: "og:description", content: "Get a custom quote, send us your logo, or ask anything. We answer personally." },
      { property: "og:url", content: "https://itslitneon.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Light Me Up Productions",
          alternateName: "It's Lit Neon",
          url: "https://itslitneon.com",
          email: "support@itslitneon.com",
          areaServed: "US",
          priceRange: "$$",
        }),
      },
    ],
  }),
});

function Contact() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 md:px-6 pt-10 pb-16">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Contact</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Let's Build <span className="text-[var(--neon-orange)] text-glow-orange">Your Clock</span></h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">The fastest way to get a custom quote is to start a free design proof — send us your name, logo, photo, and colors, and we'll send back exactly how your clock will look before you pay a cent. Prefer email? We answer personally.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link to="/custom-order" className="group rounded-2xl border border-[var(--neon-orange)]/40 bg-[var(--neon-orange)]/5 p-6 hover:border-[var(--neon-orange)] hover:ring-glow-orange transition">
            <Sparkles className="h-7 w-7 text-[var(--neon-orange)]" />
            <div className="mt-3 font-display text-2xl">Get a Free Design Proof</div>
            <div className="text-sm text-muted-foreground">No charge until you approve the artwork.</div>
          </Link>
          <a href="mailto:support@itslitneon.com" className="group rounded-2xl border border-white/10 bg-card p-6 hover:border-[var(--neon-orange)] hover:ring-glow-orange transition">
            <Mail className="h-7 w-7 text-[var(--neon-orange)]" />
            <div className="mt-3 font-display text-2xl">Email Us</div>
            <div className="text-sm text-muted-foreground break-all">support@itslitneon.com</div>
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-card p-6 md:p-8">
          <h2 className="font-display text-3xl">Ready to design your clock?</h2>
          <p className="mt-2 text-muted-foreground">Use our customizer to send us everything we need in one shot — name, logo, photo, colors, and notes.</p>
          <Button asChild size="lg" className="mt-5 bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
            <Link to="/custom-order">Get My Free Design Proof</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
