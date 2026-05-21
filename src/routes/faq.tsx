import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "Custom Neon Clock FAQ · It's Lit Neon" },
      { name: "description", content: "Answers about custom neon clocks — turnaround time, photo and logo requirements, neon colors, shipping, and ordering for businesses, gifts, garages, bars, and more." },
      { property: "og:title", content: "Custom Neon Clock FAQ · It's Lit Neon" },
      { property: "og:description", content: "Everything you need to know before ordering a custom neon clock — design, build time, shipping, and personalization options." },
      { property: "og:url", content: "https://itslitneon.com/faq" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

const FAQS = [
  { q: "What's the difference between the Regular and Custom clock?", a: "The Regular Neon Clock ($99 + shipping) is pre-designed with your choice of neon glow color. The Custom Neon Clock ($125 + shipping) is fully personalized — your name, logo, photo, business, team, or memorial design on the face." },
  { q: "What can I personalize on a custom clock?", a: "Names, logos, photos, business branding, team graphics, custom artwork, text, background imagery, your colors, and the neon glow style. If you can describe it, we can usually build it." },
  { q: "Who are these clocks for?", a: "Businesses, bars, restaurants, cafés, garages, auto shops, dealerships, game rooms, man caves, home bars, offices, salons, gyms, families buying personalized gifts, and collectors of retro neon decor." },
  { q: "How much does shipping cost?", a: "Shipping is calculated at checkout based on your address. Joe will confirm the total before charging." },
  { q: "How long until I get my clock?", a: "Regular clocks typically ship within a few business days. Custom builds usually take 2-3 weeks from when the design is finalized." },
  { q: "What neon colors can I choose?", a: "Red, orange, yellow, green, blue, purple, and white." },
  { q: "Does the clock keep running if I turn the neon off?", a: "Yes — there's an on/off switch for the neon light. The quartz clock movement runs independently." },
  { q: "What kind of photo or logo file should I send?", a: "Anything sharp and well-lit works best — high-res logos, product photos, family photos, headshots, or vector files. We'll let you know if anything needs to be re-sent before production." },
  { q: "Can I do a memorial or gift clock?", a: "Absolutely. We've built memorial, anniversary, wedding, and birthday editions before — just include the wording and any photos in your custom notes." },
  { q: "Is the clock indoor or outdoor?", a: "Designed for indoor display — homes, offices, bars, garages, game rooms, retail spaces, and showrooms." },
  { q: "Can I order multiple clocks for my business or team?", a: "Yes. Text Joe at 702-460-9190 for multi-clock and bulk pricing for businesses, teams, dealerships, and gift orders." },
  { q: "Refunds?", a: "Custom clocks are personalized and generally not refundable once production begins. See our Terms & Refund Policy for details, or reach out to Joe with any concerns." },
  { q: "Where are you based?", a: "It's Lit Neon is run by Joe Dakuras at Light Me Up Productions. Reach Joe by text at 702-460-9190 or email at lightmeupvegas@yahoo.com." },
];

function FAQ() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 md:px-6 pt-10 pb-6">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">FAQ</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Custom Neon Clock Questions</h1>
        <p className="mt-3 text-muted-foreground">Everything you need to know before you build your one-of-a-kind clock.</p>
      </section>

      <section className="mx-auto max-w-3xl px-4 md:px-6 pb-16">
        <Accordion type="single" collapsible>
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-white/10">
              <AccordionTrigger className="text-left font-semibold text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-2xl border border-white/10 bg-card p-6 text-center">
          <h2 className="font-display text-2xl">Still have questions?</h2>
          <p className="mt-1 text-sm text-muted-foreground">Text Joe directly — fastest way to get an answer or a custom quote.</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
              <a href="sms:+17024609190">Text Joe 702-460-9190</a>
            </Button>
            <Button asChild variant="outline" className="border-white/20">
              <Link to="/contact">Contact Page</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
