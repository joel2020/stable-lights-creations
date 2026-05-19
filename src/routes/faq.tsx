import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({ component: FAQ });

const FAQS = [
  { q: "What's the difference between the Regular and Custom clock?", a: "The Regular Neon Clock ($99 + shipping) is pre-designed with your choice of neon glow color. The Custom Neon Stable Clock ($125 + shipping) is fully personalized — your stable name, horse, trainer/driver, racing colors, and uploaded photo." },
  { q: "How much does shipping cost?", a: "Shipping is calculated at checkout based on your address. Joe will confirm the total before charging." },
  { q: "How long until I get my clock?", a: "Regular clocks typically ship within a few business days. Custom builds usually take 2-3 weeks from when the design is finalized." },
  { q: "What neon colors can I choose?", a: "Red, orange, yellow, green, blue, purple, and white." },
  { q: "Does the clock keep running if I turn the neon off?", a: "Yes — there's an on/off switch for the neon light. The quartz clock movement runs independently." },
  { q: "What kind of photo should I send?", a: "Anything sharp and well-lit works best — race photos, paddock shots, headshots. We'll let you know if anything needs to be re-sent before production." },
  { q: "Can I do a memorial clock?", a: "Absolutely. We've built memorial editions before — just include the wording and any photos in your custom notes." },
  { q: "Is the clock indoor or outdoor?", a: "Designed for indoor display — tack rooms, barns, offices, mancaves, race shops." },
  { q: "Can I order multiple clocks?", a: "Yes. Text Joe at 702-460-9190 for multi-clock pricing." },
  { q: "Refunds?", a: "Custom clocks are personalized and generally not refundable once production begins. See our Terms & Refund Policy for details, or reach out to Joe with any concerns." },
  { q: "Where are you based?", a: "Light Me Up Productions is run by Joe Dakuras. Reach Joe by text at 702-460-9190 or email at lightmeupvegas@yahoo.com." },
];

function FAQ() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 md:px-6 pt-10 pb-6">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">FAQ</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Common Questions</h1>
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
          <p className="mt-1 text-sm text-muted-foreground">Text Joe directly — fastest way to get an answer.</p>
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
