import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Zap, Upload, Palette, Truck, Phone } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorks,
  head: () => ({
    meta: [
      { title: "How Custom Neon Clocks Are Made · It's Lit Neon" },
      { name: "description", content: "Our 4-step custom neon clock process: send your idea, we create the design, you approve the look, then we hand-build and ship your one-of-a-kind clock." },
      { property: "og:title", content: "How Custom Neon Clocks Are Made · It's Lit Neon" },
      { property: "og:description", content: "Send your idea, get a custom mockup, approve, and we build your one-of-a-kind neon wall clock." },
      { property: "og:url", content: "https://itslitneon.com/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/how-it-works" }],
  }),
});

const STEPS = [
  { i: Zap, t: "Send Us Your Idea", d: "Tell us what you want — your name, business, logo, photo, team, stable, or memorial concept. Send pictures, sketches, or just describe it." },
  { i: Upload, t: "We Create the Design", d: "Joe builds a custom mockup of your clock face — artwork, text layout, photo placement, background, and neon glow color." },
  { i: Palette, t: "Approve Your Custom Look", d: "Review the design, request tweaks, lock in your colors, and give the green light. Nothing goes into production until you love it." },
  { i: Truck, t: "Your Clock Gets Built & Delivered", d: "Joe hand-builds your one-of-a-kind clock — chrome border, neon ring, quartz movement — and ships it right to your door." },
];

function HowItWorks() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 md:px-6 pt-10 pb-6">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">How It Works</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">From Idea to <span className="text-[var(--neon-orange)] text-glow-orange">Lit Up</span></h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Every clock is hand-built. Here's the simple 4-step process from your first message to delivery.</p>
      </section>

      <section className="mx-auto max-w-5xl px-4 md:px-6 pb-16">
        <ol className="space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4 rounded-2xl border border-white/10 bg-card p-5 md:p-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--neon-orange)] text-black font-display text-2xl">{i + 1}</div>
              <div>
                <div className="flex items-center gap-2">
                  <s.i className="h-5 w-5 text-[var(--neon-orange)]" />
                  <h2 className="font-display text-2xl">{s.t}</h2>
                </div>
                <p className="mt-1 text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-[var(--neon-orange)]/40 bg-[var(--neon-orange)]/5 p-6 md:p-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Ready to start?</h2>
          <p className="mt-2 text-muted-foreground">Send us your name, logo, or photo and we'll turn it into a clock that glows.</p>
          <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
              <Link to="/shop">Start Your Custom Clock</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 font-bold">
              <a href="sms:+17024609190"><Phone className="mr-1 h-5 w-5" />Get a Custom Quote</a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
