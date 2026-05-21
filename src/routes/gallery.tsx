import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { galleryClocks } from "@/lib/clocks";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Custom Neon Clock Gallery · Designs & Inspiration · It's Lit Neon" },
      { name: "description", content: "Browse custom neon clocks built for businesses, garages, bars, game rooms, and personalized gifts. Get design ideas for your one-of-a-kind clock." },
      { property: "og:title", content: "Custom Neon Clock Gallery · It's Lit Neon" },
      { property: "og:description", content: "Real custom neon clocks we've built — logos, photos, bars, and gifts. See what's possible." },
      { property: "og:url", content: "https://itslitneon.com/gallery" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/gallery" }],
  }),
});

function Gallery() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 md:px-6 pt-10 pb-6">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Gallery</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl chrome-text">DESIGN IDEAS</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">A look at custom neon clocks we've built — businesses, bars, garages, gifts, and more. Yours is next.</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryClocks.map((c) => (
            <figure key={c.caption} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black ring-glow-${c.color}`}>
              <img src={c.src} alt={c.alt} loading="lazy" className="aspect-square w-full object-cover transition group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-sm font-semibold">{c.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Your clock could be next.</h2>
          <p className="mt-2 text-muted-foreground">Send us your idea and we'll turn it into something that glows.</p>
          <Button asChild size="lg" className="mt-5 bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
            <Link to="/shop">Start Your Custom Clock</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
