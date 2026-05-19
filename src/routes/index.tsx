import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, Upload, Palette, Truck, Phone, Star, Check } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { galleryClocks, heroClocks } from "@/lib/clocks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 stripe-track opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-12 md:px-6 md:pt-20 md:pb-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--neon-orange)]/40 bg-[var(--neon-orange)]/10 px-3 py-1 text-xs uppercase tracking-widest text-[var(--neon-orange)]">
              <Zap className="h-3.5 w-3.5" /> Built for Harness Racing
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="chrome-text">PUT YOUR</span>
              <br />
              <span className="text-[var(--neon-orange)] text-glow-orange">STABLE NAME</span>
              <br />
              <span className="chrome-text">IN LIGHTS</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
              Custom neon clocks designed with your horse, barn name, racing colors, trainer, or driver. Built to stand out in the barn, tack room, or winner's circle.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold text-base h-12">
                <Link to="/shop">Customize Your Clock <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/20 hover:bg-white/5 font-bold">
                <a href="sms:+17024609190"><Phone className="mr-1 h-5 w-5" />Text Joe to Order</a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-[var(--neon-green)]" /> Quartz movement</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-[var(--neon-green)]" /> On/off neon switch</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-[var(--neon-green)]" /> Chrome-style border</span>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {heroClocks.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black ${
                    ["ring-glow-red","ring-glow-blue","ring-glow-yellow","ring-glow-green"][i]
                  }`}
                >
                  <img src={src} alt="Custom neon stable clock" className="h-full w-full object-cover" loading={i < 2 ? "eager" : "lazy"} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ticker */}
        <div className="border-y border-white/10 bg-black/40 overflow-hidden">
          <div className="flex whitespace-nowrap ticker py-3 text-sm font-bold uppercase tracking-[0.3em] text-[var(--neon-orange)]">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0">
                {["Standardbred Owned", "Custom Built", "Made in the USA Spirit", "Quartz Movement", "Neon On/Off Switch", "Chrome Border", "Ships Worldwide"].map((t) => (
                  <span key={t} className="flex items-center gap-4 px-6"><Zap className="h-4 w-4" />{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM CLOCKS FOR HORSEMEN */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">For the Racing Community</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Custom Clocks for Horsemen & Horsewomen</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Every clock is built one at a time — designed with your barn, your horse, your colors. Whether it's a gift for a trainer, a tribute to a favorite racehorse, or a centerpiece for the tack room, we light it up.
          </p>
        </div>

        {/* Product cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ProductCard
            title="Regular Neon Clock"
            price={99}
            tagline="Pre-designed neon clock with chrome border and your choice of glow color."
            features={["Chrome-style border", "Neon glow ring", "Quartz movement", "On/off neon switch", "Pick from 7 neon colors"]}
            badge="Best Seller"
            color="orange"
          />
          <ProductCard
            title="Custom Neon Stable Clock"
            price={125}
            tagline="Fully personalized — your stable name, horse, driver, colors, and photo on the face."
            features={["Everything in Regular", "Custom face artwork", "Stable / barn / farm name", "Horse, trainer, driver name", "Upload your racing photo"]}
            badge="Custom"
            color="red"
            highlight
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">Prices shown plus shipping. Shipping calculated at checkout.</p>
      </section>

      {/* GALLERY STRIP */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl chrome-text">RECENT BUILDS</h2>
          <Link to="/gallery" className="text-sm font-semibold text-[var(--neon-orange)] hover:underline">View gallery →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {galleryClocks.slice(0, 5).map((c) => (
            <div key={c.caption} className={`relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black ring-glow-${c.color}`}>
              <img src={c.src} alt={c.alt} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">How It Works</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">From Idea to Lit Up in 4 Steps</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            { i: Zap, t: "Choose Your Clock", d: "Pick Regular ($99) or Custom ($125)." },
            { i: Upload, t: "Send Your Details", d: "Upload your horse photo and stable info." },
            { i: Palette, t: "Pick Your Colors", d: "Choose your neon glow and racing colors." },
            { i: Truck, t: "We Build & Ship", d: "We design, build, and ship right to your barn." },
          ].map((s, idx) => (
            <div key={s.t} className="relative rounded-2xl border border-white/10 bg-card p-6">
              <div className="absolute -top-3 left-6 rounded-full bg-[var(--neon-orange)] px-3 py-0.5 text-xs font-bold text-black">STEP {idx + 1}</div>
              <s.i className="h-7 w-7 text-[var(--neon-orange)]" />
              <h3 className="mt-3 font-display text-2xl">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMIZATION OPTIONS */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Everything You Can <span className="text-[var(--neon-orange)] text-glow-orange">Customize</span></h2>
            <p className="mt-4 text-muted-foreground">Make it yours, end-to-end. The custom build lets you control every detail.</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Stable / barn / farm name","Horse name","Trainer / driver name","Racing colors","Neon glow color","Upload your image","Special design notes","Memorial editions"].map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 mt-0.5 text-[var(--neon-orange)]" />{x}</li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-7 bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
              <Link to="/shop">Start Your Custom Build</Link>
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[
              { c: "red", t: "RED" },{ c: "orange", t: "ORG" },{ c: "yellow", t: "YEL" },
              { c: "green", t: "GRN" },{ c: "blue", t: "BLU" },{ c: "purple", t: "PUR" },{ c: "white", t: "WHT" },
            ].map((n) => (
              <div key={n.c} className={`aspect-[1/2] rounded-full ring-glow-${n.c} bg-black/60 grid place-items-center text-[10px] font-bold tracking-widest text-glow-${n.c}`}>{n.t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 text-center">
        <div className="flex justify-center gap-1 text-[var(--neon-yellow)]">
          {[1,2,3,4,5].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}
        </div>
        <h2 className="mt-4 font-display text-4xl md:text-5xl chrome-text">BE THE TALK OF THE BARN AREA</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Perfect for tack rooms, barns, stables, offices, and horse racing gifts. The kind of piece that gets a compliment every time someone walks in.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 md:px-6 py-12">
        <h2 className="font-display text-4xl text-center">Quick Answers</h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQ_HOME.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-white/10">
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-6 text-center">
          <Link to="/faq" className="text-sm font-semibold text-[var(--neon-orange)] hover:underline">See all FAQs →</Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 stripe-track opacity-50" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-6 py-20 text-center">
          <h2 className="font-display text-4xl md:text-6xl">
            Ready to see your <span className="text-[var(--neon-orange)] text-glow-orange">stable name</span> in lights?
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold h-12">
              <Link to="/shop">Customize Your Clock</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/20 hover:bg-white/5 font-bold">
              <a href="sms:+17024609190"><Phone className="mr-1 h-5 w-5" />Text Joe 702-460-9190</a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

const FAQ_HOME = [
  { q: "How long does it take to get my clock?", a: "Regular clocks ship within a few business days. Custom builds typically take 2-3 weeks once we finalize the design with you." },
  { q: "Do I need to send a high-res photo?", a: "Higher resolution gives the cleanest result, but we'll let you know if anything needs to be re-sent before production." },
  { q: "Can I use my own racing colors?", a: "Yes — just tell us the colors in the customizer or text Joe with details." },
];

function ProductCard({
  title, price, tagline, features, badge, color, highlight,
}: { title: string; price: number; tagline: string; features: string[]; badge: string; color: "red" | "orange"; highlight?: boolean }) {
  return (
    <div className={`relative rounded-2xl border bg-card p-6 md:p-8 ${highlight ? "border-[var(--neon-red)]/50 ring-glow-red" : "border-white/10"}`}>
      <div className={`absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-bold ${color === "red" ? "bg-[var(--neon-red)] text-white" : "bg-[var(--neon-orange)] text-black"}`}>{badge}</div>
      <h3 className="font-display text-3xl md:text-4xl">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-5xl chrome-text">${price}</span>
        <span className="text-sm text-muted-foreground">plus shipping</span>
      </div>
      <p className="mt-3 text-muted-foreground">{tagline}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {features.map((f) => <li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-[var(--neon-orange)]" />{f}</li>)}
      </ul>
      <Button asChild size="lg" className="mt-6 w-full bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
        <Link to="/shop" search={{ type: price === 99 ? "regular" : "custom" } as never}>Order Now</Link>
      </Button>
    </div>
  );
}
