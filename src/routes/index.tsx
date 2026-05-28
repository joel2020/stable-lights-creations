import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Zap, Upload, Palette, Truck, Phone, Star, Check, Building2, Wine, Wrench, Gamepad2, Trophy, Gift } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { galleryClocks, heroClocks, stableClocks } from "@/lib/clocks";
import regularLit from "@/assets/clock-regular-plain.jpg";
import regularUnlit from "@/assets/clock-regular-plain.jpg";
import vegasLit from "@/assets/clock-vegas.jpg";
import cocacolaLit from "@/assets/clock-cocacola.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "It's Lit Neon · Custom Harness Racing Stable Clocks" },
      { name: "description", content: "Custom neon clocks for harness racing stables, owners, trainers, drivers & racetracks. Your stable name, silks colors, and racing logo — hand-built one at a time." },
      { name: "keywords", content: "harness racing clock, stable neon clock, custom racing stable sign, harness racing gift, trainer driver gift, racetrack memorabilia" },
      { property: "og:title", content: "Custom Harness Racing Stable Neon Clocks · It's Lit Neon" },
      { property: "og:description", content: "Personalized neon clocks for harness racing stables, drivers, trainers, and tracks. Built one at a time." },
      { property: "og:url", content: "https://itslitneon.com/" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Product",
              name: "Regular Neon Clock",
              description: "Pre-designed neon wall clock with chrome border, quartz movement, and your choice of 7 neon glow colors. Perfect for homes, garages, businesses, and man caves.",
              brand: { "@type": "Brand", name: "Light Me Up Productions" },
              offers: { "@type": "Offer", price: "99.00", priceCurrency: "USD", availability: "https://schema.org/InStock" },
            },
            {
              "@type": "Product",
              name: "Custom Neon Clock",
              description: "Fully personalized neon wall clock featuring your name, business, logo, photo, or memorial design. Handmade one at a time.",
              brand: { "@type": "Brand", name: "Light Me Up Productions" },
              offers: { "@type": "Offer", price: "125.00", priceCurrency: "USD", availability: "https://schema.org/InStock" },
            },
          ],
        }),
      },
    ],
  }),
});

const HERO_ROTATION = [
  { src: heroClocks[0], color: "blue" },
  { src: heroClocks[1], color: "green" },
  { src: heroClocks[2], color: "red" },
  { src: heroClocks[3], color: "red" },
  { src: heroClocks[4], color: "green" },
  { src: heroClocks[5], color: "red" },
  { src: heroClocks[6], color: "blue" },
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
              <Zap className="h-3.5 w-3.5" /> Built for Harness Racing Stables
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="chrome-text">YOUR STABLE.</span>
              <br />
              <span className="text-[var(--neon-orange)] text-glow-orange">YOUR COLORS.</span>
              <br />
              <span className="chrome-text">IN NEON.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
              Custom neon clocks for harness racing stables, owners, trainers, drivers, and racetracks. Your stable name, your silks colors, your racing logo — hand-built one at a time. The perfect piece for the tack room, the office, or as a gift for the team.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold text-base h-12">
                <Link to="/shop">Design Your Stable Clock <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/20 hover:bg-white/5 font-bold">
                <Link to="/gallery">See Design Ideas</Link>
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
                {["Custom Built", "Quartz Movement", "Neon On/Off Switch", "Chrome Border", "Personalized for You", "Ships Worldwide", "One of a Kind"].map((t) => (
                  <span key={t} className="flex items-center gap-4 px-6"><Zap className="h-4 w-4" />{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUPON BANNER */}
      <section className="relative z-20 mx-4 md:mx-6 mt-6 mb-6 max-w-7xl lg:mx-auto">
        <div className="coupon-banner rounded-2xl border-2 border-[var(--neon-orange)]/80 bg-[var(--neon-orange)]/15 px-6 py-4 text-center backdrop-blur">
          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3">
            <span className="text-sm font-bold uppercase tracking-widest text-[var(--neon-orange)]">Limited Time Offer</span>
            <span className="hidden sm:inline text-white/70">|</span>
            <span className="flash-coupon font-display text-2xl tracking-wide text-[var(--neon-orange)] text-glow-orange sm:text-3xl">
              Code: BECKWITH — $5 Off
            </span>
            <span className="hidden sm:inline text-white/70">|</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Applied at checkout</span>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Two Ways to Light It Up</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Pick Your Clock. Make It Yours.</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Every clock is hand-built one at a time. Start with a clean classic or go fully custom — your name, logo, photo, or design on the face.
          </p>
        </div>

        {/* Product cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ProductCard
            title="Regular Neon Clock"
            price={99}
            tagline="Pre-designed neon clock with chrome border and your choice of glow color."
            features={["Chrome-style border", "Neon glow ring", "Quartz movement", "On/off neon switch", "Pick from 7 neon colors"]}
            badge="Classic"
            color="orange"
            image={regularLit}
            imageUnlit={regularUnlit}
            imageGlow="red"
          />
          <ProductCard
            title="Custom Neon Clock"
            price={125}
            tagline="Fully personalized — your name, logo, photo, business, team, or memorial design on the face."
            features={["Everything in Regular", "Custom face artwork", "Your name, business, or logo", "Memorial & gift designs", "Upload your own photo"]}
            badge="Best Seller"
            color="red"
            highlight
            image={vegasLit}
            imageUnlit={cocacolaLit}
            imageGlow="blue"
          />

        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">Prices shown plus shipping. A standard $29 shipping fee is applied at checkout. If actual shipping is more, you'll get an invoice for the difference — we only charge exact shipping costs, not a penny more. Multiple clocks ship together for less. International/Canadian quoted separately.</p>
      </section>

      {/* USE CASES / WHO IT'S FOR */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Who It's For</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">A Clock for Every Wall, Brand & Occasion</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From boardrooms to barrooms, garages to game rooms. If you've got a wall, we've got a clock for it.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { i: Building2, c: "orange", t: "Business & Logo Clocks", d: "Branded wall decor for offices, studios, salons, barbershops, gyms, and retail floors." },
              { i: Wine, c: "red", t: "Bars, Restaurants & Cafés", d: "Statement pieces for bars, lounges, diners, breweries, and coffee shops." },
              { i: Wrench, c: "yellow", t: "Garages, Auto Shops & Dealerships", d: "Custom logos, classic builds, and shop signage that glow above the lift." },
              { i: Gamepad2, c: "purple", t: "Game Rooms, Man Caves & Home Bars", d: "Personalized clocks for basements, dens, pool rooms, and home theaters." },
              { i: Trophy, c: "green", t: "Sports Teams, Clubs & Hobbies", d: "Team logos, club names, hobby shops, and collectibles that show off your passion." },
              { i: Gift, c: "blue", t: "Personalized Gifts & Memorials", d: "Birthdays, anniversaries, weddings, and tribute pieces that last a lifetime." },
            ].map((u) => (
              <div key={u.t} className="rounded-2xl border border-white/10 bg-card p-5 hover:border-white/30 transition">
                <div className={`grid h-10 w-10 place-items-center rounded-full ring-glow-${u.c} bg-black`}>
                  <u.i className="h-5 w-5" style={{ color: `var(--neon-${u.c})` }} />
                </div>
                <h3 className="mt-3 font-display text-xl md:text-2xl">{u.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{u.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
              <Link to="/shop">Design My Clock</Link>
            </Button>
          </div>
        </div>
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
                <img src={c.src} alt={c.alt} loading="lazy" className="h-full w-full object-cover object-center" />
              </div>
              <figcaption className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{c.caption.split(" · ")[0]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* VIDEO SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16" id="video-showcase">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">See It In Action</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl chrome-text">LIT UP & RUNNING</h2>
          <p className="mt-3 text-muted-foreground">Watch one of our custom builds glow.</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 ring-glow-orange bg-black">
          <video
            src="/videos/showcase.mp4"
            className="w-full h-auto aspect-video object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground max-w-md">Ready to turn your name, logo, or photo into a clock that glows? Start your build today.</p>
          <Button
            asChild
            size="lg"
            className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold text-base h-12 px-8 shadow-[0_0_20px_rgba(251,146,60,0.35)]"
          >
            <Link
              to="/shop"
              data-track="video-cta-customize"
              onClick={() => {
                if (typeof window !== "undefined" && "gtag" in window) {
                  (window as any).gtag?.("event", "click", {
                    event_category: "engagement",
                    event_label: "video_cta_customize",
                  });
                }
              }}
            >
              Start Your Custom Clock →
            </Link>
          </Button>
        </div>
      </section>

      {/* FEATURED BUILDS */}
      <section className="border-y border-white/10 bg-black/40">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Featured Builds</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl chrome-text">CUSTOM NEON CLOCKS IN ACTION</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Real clocks we've built for bars, garages, game rooms, businesses, and gift moments. Each one is hand-crafted to order and built to be the focal point of the room.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              { src: vegasLit, label: "Las Vegas · Blue Neon", alt: "Custom blue neon Las Vegas clock on wall" },
              { src: cocacolaLit, label: "Coca-Cola · Green Neon", alt: "Custom green neon Coca-Cola themed clock" },
            ].map((s) => (
              <figure key={s.label} className="group relative overflow-hidden rounded-2xl border border-white/10">
                <img src={s.src} alt={s.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="font-display text-xl md:text-2xl">{s.label}</span>
                  <Link to="/shop" className="rounded-full bg-[var(--neon-orange)] px-4 py-2 text-xs font-bold text-black hover:bg-[var(--neon-orange)]/90">Build Yours →</Link>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-20">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Regular vs Custom</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Which One's Yours?</h2>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-card">
          <div className="grid grid-cols-3 text-sm md:text-base">
            <div className="p-4 md:p-5 border-b border-white/10" />
            <div className="p-4 md:p-5 border-b border-l border-white/10 text-center">
              <div className="font-display text-2xl">Regular</div>
              <div className="font-display text-3xl chrome-text">$99</div>
              <div className="text-xs text-muted-foreground">+ shipping</div>
            </div>
            <div className="p-4 md:p-5 border-b border-l border-white/10 text-center bg-[var(--neon-orange)]/10">
              <div className="font-display text-2xl text-[var(--neon-orange)]">Custom</div>
              <div className="font-display text-3xl chrome-text">$125</div>
              <div className="text-xs text-muted-foreground">+ shipping</div>
            </div>
            {[
              ["Chrome-style border", true, true],
              ["Quartz movement", true, true],
              ["Neon on/off switch", true, true],
              ["7 neon glow colors", true, true],
              ["Your name, business, or logo", false, true],
              ["Custom artwork & text", false, true],
              ["Your colors", false, true],
              ["Custom photo on the face", false, true],
              ["Memorial editions", false, true],
            ].map(([label, r, c]) => (
              <FragmentRow key={label as string} label={label as string} reg={r as boolean} cus={c as boolean} />
            ))}
          </div>
          <div className="grid grid-cols-3 border-t border-white/10">
            <div className="p-4 md:p-5" />
            <div className="p-4 md:p-5 border-l border-white/10">
              <Button asChild className="w-full bg-white/10 hover:bg-white/15 font-bold">
                <Link to="/shop" search={{ type: "regular" } as never}>Order Regular</Link>
              </Button>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10 bg-[var(--neon-orange)]/5">
              <Button asChild className="w-full bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
                <Link to="/shop" search={{ type: "custom" } as never}>Build Custom</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">What People Are Saying</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Lit Up Everywhere.</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { q: "Joe builds a beautiful clock. The detail and the glow are unreal — looks even better in person.", n: "D.M. Hollywood, FL", c: "orange" },
              { q: "Hands down the coolest piece of memorabilia I own. Quality is top-shelf.", n: "T.T. Las Vegas, NV", c: "yellow" },
              { q: "Custom from top to bottom. Joe nailed every detail we asked for.", n: "J.H. Miami, FL", c: "blue" },
              { q: "Best gift I've ever gotten. It's the first thing everyone notices when they walk in.", n: "M.R. Chicago, IL", c: "red" },
              { q: "Hung it in the office and every visitor stops dead. Worth every penny.", n: "S.B. Austin, TX", c: "red" },
              { q: "We've got Joe's clocks all over the property. They're a fan favorite.", n: "K.P. Denver, CO", c: "green" },
            ].map((t) => (
              <figure key={t.n} className="rounded-2xl border border-white/10 bg-card p-6 flex flex-col">
                <div className="flex gap-1 text-[var(--neon-yellow)]">{[1,2,3,4,5].map((i)=><Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-3 text-sm md:text-base leading-relaxed">"{t.q}"</blockquote>
                <figcaption className="mt-4 flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className={`h-9 w-9 rounded-full ring-glow-${t.c} bg-black grid place-items-center text-[10px] font-bold uppercase`} style={{ color: `var(--neon-${t.c})` }}>★</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.n}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Lighting Up Homes, Bars, Garages & Businesses Across North America</div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
          {["Las Vegas","Los Angeles","Chicago","Miami","Houston","Denver"].map((t) => (
            <div key={t} className="rounded-lg border border-white/10 bg-black/40 py-3 px-2 font-display text-sm md:text-base tracking-wider chrome-text">
              {t.toUpperCase()}
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
            { i: Zap, t: "Send Us Your Idea", d: "Tell us what you want — name, logo, photo, business, team, or memorial." },
            { i: Upload, t: "We Create the Design", d: "Joe mocks up your custom clock face and sends it over for review." },
            { i: Palette, t: "Approve Your Look", d: "Pick your neon glow color and lock in any final tweaks." },
            { i: Truck, t: "We Build & Ship", d: "Your one-of-a-kind clock is hand-built and shipped right to your door." },
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
            <p className="mt-4 text-muted-foreground">Make it yours, end-to-end. The custom build lets you control every detail of the face.</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Names & personal text",
                "Business logos & branding",
                "Photos (people, pets, places)",
                "Sports teams & club logos",
                "Custom artwork & themes",
                "Your colors & color combos",
                "Background imagery",
                "Neon glow color & style",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 mt-0.5 text-[var(--neon-orange)]" />{x}</li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-7 bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
              <Link to="/shop">Create My Neon Clock</Link>
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
        <h2 className="mt-4 font-display text-4xl md:text-5xl chrome-text">THE FOCAL POINT OF EVERY ROOM</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Premium custom neon clocks that turn any wall into a statement — perfect for businesses, garages, bars, game rooms, offices, and giftable moments people remember.
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
            Ready to build a clock that <span className="text-[var(--neon-orange)] text-glow-orange">glows like nothing else?</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Send us your idea — your name, logo, photo, or business — and we'll turn it into a one-of-a-kind neon clock.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold h-12">
              <Link to="/shop">Start Your Custom Clock</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/20 hover:bg-white/5 font-bold">
              <a href="sms:+17024609190"><Phone className="mr-1 h-5 w-5" />Get a Custom Quote</a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

const FAQ_HOME = [
  { q: "How long does it take to get my clock?", a: "Regular clocks ship within a few business days. Custom builds typically take 2-3 weeks once we finalize the design with you." },
  { q: "Can I send my logo or a photo?", a: "Absolutely — logos, photos, artwork, business branding, team graphics, memorial photos. Higher resolution gives the cleanest result, and we'll let you know if anything needs to be re-sent before production." },
  { q: "Can I use my own colors?", a: "Yes. Send us your brand colors, team colors, or favorite combos and we'll work them into the design." },
];

function FragmentRow({ label, reg, cus }: { label: string; reg: boolean; cus: boolean }) {
  return (
    <>
      <div className="p-4 md:p-5 border-t border-white/10 text-sm">{label}</div>
      <div className="p-4 md:p-5 border-t border-l border-white/10 text-center">
        {reg ? <Check className="inline h-5 w-5 text-[var(--neon-green)]" /> : <span className="text-muted-foreground" aria-label="Not included">—</span>}
      </div>
      <div className="p-4 md:p-5 border-t border-l border-white/10 text-center bg-[var(--neon-orange)]/5">
        {cus ? <Check className="inline h-5 w-5 text-[var(--neon-orange)]" /> : <span className="text-muted-foreground" aria-label="Not included">—</span>}
      </div>
    </>
  );
}

function ProductCard({
  title, price, tagline, features, badge, color, highlight, image, imageUnlit, imageGlow,
}: {
  title: string; price: number; tagline: string; features: string[]; badge: string;
  color: "red" | "orange"; highlight?: boolean;
  image: string; imageUnlit?: string;
  imageGlow: "red" | "orange" | "blue" | "green" | "yellow" | "purple" | "white";
}) {
  const [lit, setLit] = useState(true);
  return (
    <div className={`group relative overflow-hidden rounded-2xl border bg-card p-6 pt-11 md:p-8 md:pt-12 transition ${highlight ? "border-[var(--neon-red)]/50 ring-glow-red" : "border-white/10 hover:border-white/30"}`}>
      <div className={`absolute top-4 left-6 z-20 max-w-[calc(100%-3rem)] whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold leading-none ${color === "red" ? "bg-[var(--neon-red)] text-white" : "bg-[var(--neon-orange)] text-black"}`}>{badge}</div>
      <div className="grid sm:grid-cols-[200px,1fr] gap-5 md:gap-6 items-center">
        <div className="relative mx-auto w-44 sm:w-full">
          {/* ambient glow */}
          <div
            className={`pointer-events-none absolute inset-[-22%] rounded-full blur-2xl transition-opacity duration-500 ${lit ? "opacity-80" : "opacity-0"}`}
            style={{ background: `radial-gradient(circle, var(--neon-${imageGlow}) 0%, transparent 65%)` }}
          />
          <div className={`relative aspect-square w-full overflow-hidden rounded-full border-2 border-white/10 bg-black transition-shadow duration-500 ${lit ? `ring-glow-${imageGlow}` : ""}`}>
            {imageUnlit && (
              <img src={imageUnlit} alt="" loading="eager" className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${lit ? "opacity-0" : "opacity-100"}`} />
            )}
            <img src={image} alt={`${title} example`} loading="eager" className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ${lit ? "opacity-100 group-hover:scale-125" : "opacity-0"}`} />
          </div>
          {imageUnlit && (
            <div className="mt-3 flex justify-center">
              <div className="inline-flex rounded-full border border-white/10 bg-black/70 p-0.5 text-[10px] font-bold uppercase tracking-widest">
                <button onClick={() => setLit(false)} className={`px-3 py-1 rounded-full transition ${!lit ? "bg-white/10 text-white" : "text-muted-foreground"}`}>Off</button>
                <button onClick={() => setLit(true)} className={`px-3 py-1 rounded-full transition ${lit ? `bg-[var(--neon-${imageGlow})] text-black` : "text-muted-foreground"}`}>Lit</button>
              </div>
            </div>
          )}
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
                  alt="Custom neon wall clock with chrome border and glowing neon ring"
                  width={720}
                  height={720}
                  loading="eager"
                  {...(idx === 0 ? { fetchPriority: "high" as const } : {})}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
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


