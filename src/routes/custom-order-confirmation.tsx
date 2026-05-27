import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, Mail, Phone, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/custom-order-confirmation")({
  component: CustomOrderConfirmationPage,
  head: () => ({
    meta: [
      { title: "Order Received · It's Lit Neon" },
      { name: "description", content: "Thanks for your custom clock order. Here's what happens next — logo review, proof approval, invoice, then build & ship. No charge until you approve the artwork." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const STEPS = [
  { n: 1, t: "We review your logo", d: "Joe personally checks the artwork — usually within 1 business day." },
  { n: 2, t: "We send a proof for approval", d: "You'll see exactly how the clock will look. Reply with changes or a thumbs-up." },
  { n: 3, t: "We send an invoice", d: "Only after you approve the proof. Pay by card, check, or however works for you." },
  { n: 4, t: "We build & ship it", d: "Hand-built, packed carefully, and shipped to your door." },
];

function CustomOrderConfirmationPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 md:px-6 pt-10 pb-6">
        <div className="flex items-center gap-3 text-[var(--neon-orange)]">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--neon-orange)] text-black">
            <Check className="h-7 w-7" strokeWidth={3} />
          </div>
          <div className="text-xs uppercase tracking-widest">Order received</div>
        </div>
        <h1 className="mt-4 font-display text-4xl md:text-6xl leading-tight">
          Thanks — we've got your <span className="text-[var(--neon-orange)] text-glow-orange">custom order</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
          A confirmation email is on its way with the next steps. Joe will be in touch personally — no accounts, no online checkout, no surprises.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[var(--neon-orange)]/50 bg-[var(--neon-orange)]/5 p-4 md:p-5">
          <ShieldCheck className="h-8 w-8 md:h-10 md:w-10 text-[var(--neon-orange)] shrink-0" />
          <div>
            <div className="font-display text-xl md:text-2xl">You won't be charged until artwork is approved</div>
            <div className="text-sm md:text-base text-muted-foreground">Nothing is billed today. The invoice only comes after you approve the proof.</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 md:px-6 py-6">
        <h2 className="font-display text-2xl md:text-3xl">What happens next</h2>
        <ol className="mt-5 space-y-3">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4 rounded-xl border border-white/10 bg-card p-4 md:p-5">
              <div className="grid h-10 w-10 md:h-12 md:w-12 shrink-0 place-items-center rounded-full bg-[var(--neon-orange)] text-black font-display text-xl md:text-2xl">
                {s.n}
              </div>
              <div>
                <div className="font-semibold text-lg md:text-xl">{s.t}</div>
                <div className="text-sm md:text-base text-muted-foreground">{s.d}</div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">
          Heads up: a standard $25 shipping fee is included on the invoice. If actual postage is higher, you'll get a separate invoice for the exact difference — not a penny more.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 md:px-6 pt-2 pb-12">
        <div className="rounded-2xl border border-[var(--neon-orange)]/40 bg-[var(--neon-orange)]/5 p-5 md:p-7">
          <h2 className="font-display text-2xl md:text-3xl">Need to add something?</h2>
          <p className="mt-2 text-base md:text-lg text-muted-foreground">
            Forgot a photo or want to add a note? Reach Joe directly — replies usually come the same day.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg" className="h-14 text-base bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
              <a href="tel:+17024609190"><Phone className="mr-2 h-5 w-5" /> Call Joe · 702-460-9190</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 text-base border-[var(--neon-orange)]/60">
              <a href="mailto:support@itslitneon.com"><Mail className="mr-2 h-5 w-5" /> support@itslitneon.com</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            In the meantime, <Link to="/gallery" className="underline hover:text-[var(--neon-orange)]">browse the gallery</Link> for ideas.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
