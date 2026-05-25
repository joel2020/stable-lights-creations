import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact · Custom Neon Clock Quotes · It's Lit Neon" },
      { name: "description", content: "Talk to Joe at It's Lit Neon. Text 702-460-9190 or email lightmeupvegas@yahoo.com to design your custom neon clock for any home, business, or gift." },
      { property: "og:title", content: "Contact It's Lit Neon" },
      { property: "og:description", content: "Get a custom quote, send us your logo, or ask anything. Joe answers personally." },
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
          telephone: "+1-702-460-9190",
          email: "lightmeupvegas@yahoo.com",
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
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Talk to <span className="text-[var(--neon-orange)] text-glow-orange">Joe</span></h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Fastest way to get a custom quote, send us your logo, or ask a question is to text Joe directly. He'll walk you through the design and pricing.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <a href="sms:+17024609190" className="group rounded-2xl border border-white/10 bg-card p-6 hover:border-[var(--neon-orange)] hover:ring-glow-orange transition">
            <MessageCircle className="h-7 w-7 text-[var(--neon-orange)]" />
            <div className="mt-3 font-display text-2xl">Text Joe</div>
            <div className="text-sm text-muted-foreground">702-460-9190</div>
          </a>
          <a href="tel:+17024609190" className="group rounded-2xl border border-white/10 bg-card p-6 hover:border-[var(--neon-orange)] hover:ring-glow-orange transition">
            <Phone className="h-7 w-7 text-[var(--neon-orange)]" />
            <div className="mt-3 font-display text-2xl">Call</div>
            <div className="text-sm text-muted-foreground">702-460-9190</div>
          </a>
          <a href="mailto:lightmeupvegas@yahoo.com" className="group rounded-2xl border border-white/10 bg-card p-6 hover:border-[var(--neon-orange)] hover:ring-glow-orange transition">
            <Mail className="h-7 w-7 text-[var(--neon-orange)]" />
            <div className="mt-3 font-display text-2xl">Email</div>
            <div className="text-sm text-muted-foreground break-all">lightmeupvegas@yahoo.com</div>
            <div className="mt-1 text-xs text-muted-foreground break-all">Alt: josephdakuras@aol.com</div>
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-card p-6 md:p-8">
          <h2 className="font-display text-3xl">Ready to design your clock?</h2>
          <p className="mt-2 text-muted-foreground">Use our customizer to send Joe everything he needs in one shot — name, logo, photo, colors, and notes.</p>
          <Button asChild size="lg" className="mt-5 bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
            <Link to="/shop">Start Your Custom Clock</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
