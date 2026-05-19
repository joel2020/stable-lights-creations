import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Zap, Upload, Palette, Truck, Phone, Star, Check } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { galleryClocks, heroClocks } from "@/lib/clocks";
import hollandLit from "@/assets/clock-holland-blue.jpg";
import hollandUnlit from "@/assets/clock-holland-white.jpg";
import beckwithLit from "@/assets/clock-beckwith-red.jpg";
import beckwithUnlit from "@/assets/clock-beckwith-white.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({ component: Home });

const HERO_ROTATION = [
  { src: heroClocks[0], color: "red" },
  { src: heroClocks[1], color: "blue" },
  { src: heroClocks[2], color: "yellow" },
  { src: heroClocks[3], color: "green" },
  { src: heroClocks[4], color: "orange" },
] as const;

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
            <HeroClockShowcase />
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
            image={hollandLit}
            imageUnlit={hollandUnlit}
            imageGlow="blue"
          />
          <ProductCard
            title="Custom Neon Stable Clock"
            price={125}
            tagline="Fully personalized — your stable name, horse, driver, colors, and photo on the face."
            features={["Everything in Regular", "Custom face artwork", "Stable / barn / farm name", "Horse, trainer, driver name", "Upload your racing photo"]}
            badge="Custom"
            color="red"
            highlight
            image={beckwithLit}
            imageUnlit={beckwithUnlit}
            imageGlow="red"
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
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {galleryClocks.slice(0, 5).map((c) => (
            <figure key={c.caption} className="group flex flex-col items-center">
              <div className={`relative aspect-square w-full overflow-hidden rounded-full border-2 border-white/10 bg-black ring-glow-${c.color} transition-transform duration-300 group-hover:-translate-y-1`}>
                <img src={c.src} alt={c.alt} loading="lazy" className="h-full w-full object-cover scale-110" />
              </div>
              <figcaption className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{c.caption.split(" · ")[0]}</figcaption>
            </figure>
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
  title, price, tagline, features, badge, color, highlight, image, imageGlow,
}: {
  title: string; price: number; tagline: string; features: string[]; badge: string;
  color: "red" | "orange"; highlight?: boolean;
  image: string; imageGlow: "red" | "orange" | "blue" | "green" | "yellow" | "purple" | "white";
}) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8 transition ${highlight ? "border-[var(--neon-red)]/50 ring-glow-red" : "border-white/10 hover:border-white/30"}`}>
      <div className={`absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-bold ${color === "red" ? "bg-[var(--neon-red)] text-white" : "bg-[var(--neon-orange)] text-black"}`}>{badge}</div>
      <div className="grid sm:grid-cols-[180px,1fr] gap-5 md:gap-6 items-center">
        <div className={`relative mx-auto aspect-square w-40 sm:w-full overflow-hidden rounded-full border-2 border-white/10 bg-black ring-glow-${imageGlow}`}>
          <img src={image} alt={`${title} example`} loading="eager" className="h-full w-full object-cover scale-110 transition-transform duration-500 group-hover:scale-125" />
        </div>
        <div>
          <h3 className="font-display text-3xl md:text-4xl">{title}</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-5xl chrome-text">${price}</span>
            <span className="text-sm text-muted-foreground">plus shipping</span>
          </div>
          <p className="mt-2 text-muted-foreground text-sm">{tagline}</p>
        </div>
      </div>
      <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
        {features.map((f) => <li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-[var(--neon-orange)] shrink-0" />{f}</li>)}
      </ul>
      <Button asChild size="lg" className="mt-6 w-full bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
        <Link to="/shop" search={{ type: price === 99 ? "regular" : "custom" } as never}>Order Now</Link>
      </Button>
    </div>
  );
}

function HeroClockShowcase() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % HERO_ROTATION.length), 2600);
    return () => clearInterval(t);
  }, []);
  const active = HERO_ROTATION[i];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* ambient color bloom (matches current neon) */}
      <div
        className="pointer-events-none absolute inset-[-18%] rounded-full bloom-pulse blur-3xl"
        style={{ background: `radial-gradient(circle, var(--neon-${active.color}) 0%, transparent 62%)` }}
      />
      {/* outer chrome bezel — slow rotation */}
      <div className="absolute inset-0 rounded-full p-[7px] chrome-spin"
        style={{ background: "conic-gradient(from 0deg, #1a1a1f, #f4f6fa, #6a6f78, #e8eaf0, #2a2a31, #f4f6fa, #1a1a1f)" }}>
        <div className="relative h-full w-full rounded-full bg-black p-[3px]">
          {/* inner chrome ring (static) */}
          <div className="relative h-full w-full overflow-hidden rounded-full p-[10px]"
            style={{ background: "linear-gradient(145deg, #2a2a31 0%, #cfd3da 35%, #6a6f78 55%, #e8eaf0 80%, #1a1a1f 100%)" }}>
            {/* neon ring with image */}
            <div className={`relative h-full w-full overflow-hidden rounded-full bg-black ring-glow-${active.color} transition-shadow duration-700 neon-pulse`}>
              {HERO_ROTATION.map((h, idx) => (
                <img
                  key={idx}
                  src={h.src}
                  alt="Custom neon stable clock with glowing neon ring"
                  loading="eager"
                  className={`absolute inset-0 h-full w-full object-cover scale-110 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              {/* glass highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(ellipse at 30% 18%, rgba(255,255,255,0.22) 0%, transparent 38%)" }} />
            </div>
          </div>
        </div>
      </div>
      {/* floating spec chips */}
      <div className="hidden md:block absolute -left-2 top-8 rounded-full border border-white/15 bg-black/70 backdrop-blur px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/80">
        Chrome Bezel
      </div>
      <div className="hidden md:block absolute -right-4 top-1/3 rounded-full border border-white/15 bg-black/70 backdrop-blur px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest"
        style={{ color: `var(--neon-${active.color})` }}>
        Neon Glow · {active.color.toUpperCase()}
      </div>
      <div className="hidden md:block absolute -left-2 bottom-12 rounded-full border border-white/15 bg-black/70 backdrop-blur px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/80">
        Quartz Movement
      </div>
      {/* thumbs */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2 rounded-full border border-white/10 bg-black/80 backdrop-blur px-3 py-2 shadow-xl">
        {HERO_ROTATION.map((h, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show ${h.color} clock`}
            className={`h-3 w-3 rounded-full transition ring-glow-${h.color} ${idx === i ? "scale-125" : "opacity-60 hover:opacity-100"}`}
            style={{ backgroundColor: `var(--neon-${h.color})` }}
          />
        ))}
      </div>
    </div>
  );
}


