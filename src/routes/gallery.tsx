import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { galleryClocks, latestBuilds } from "@/lib/clocks";
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

      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Latest Custom Builds</div>
            <h2 className="mt-1 font-display text-3xl md:text-4xl">Fresh off the bench</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {latestBuilds.map((c) => (
            <figure key={c.caption + c.src} className="group flex flex-col items-center">
              <div className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-black ring-glow-${c.color} transition-transform duration-300 group-hover:-translate-y-1`}>
                <img src={c.src} alt={c.alt} loading="lazy" className="h-full w-full object-contain object-center p-2" />
              </div>
              <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-wider text-white/80">{c.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-16">
        <div className="mb-5">
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Stable Clocks</div>
          <h2 className="mt-1 font-display text-3xl md:text-4xl">Built for the barn</h2>
        </div>
        <div className="grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryClocks.map((c) => (
            <figure key={c.caption} className="group flex flex-col items-center">
              <div className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-black ring-glow-${c.color} transition-transform duration-300 group-hover:-translate-y-1`}>
                <img src={c.src} alt={c.alt} loading="lazy" className="h-full w-full object-contain object-center p-2" />
              </div>
              <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-wider text-white/80">{c.caption}</figcaption>
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
