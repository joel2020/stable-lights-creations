import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { galleryClocks } from "@/lib/clocks";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gallery")({ component: Gallery });

function Gallery() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 md:px-6 pt-10 pb-6">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Gallery</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl chrome-text">RECENT BUILDS</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">A look at custom neon stable clocks we've built for trainers, drivers, and racing families. Yours is next.</p>
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
          <h2 className="font-display text-3xl md:text-4xl">Your clock could be here next.</h2>
          <Button asChild size="lg" className="mt-5 bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
            <Link to="/shop">Customize Your Clock</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
