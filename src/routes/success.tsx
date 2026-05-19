import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/success")({ component: Success });

function Success() {
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 md:px-6 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--neon-green)]/15 ring-glow-green">
          <CheckCircle2 className="h-9 w-9 text-[var(--neon-green)]" />
        </div>
        <h1 className="mt-6 font-display text-5xl md:text-6xl chrome-text">ORDER RECEIVED</h1>
        <p className="mt-3 text-muted-foreground">
          Joe got your details and will reach out shortly to confirm your design, shipping, and payment.
          Watch your phone and email — including spam — for a message from Light Me Up Productions.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Button asChild className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
            <Link to="/gallery">See more builds</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20">
            <a href="sms:+17024609190">Text Joe 702-460-9190</a>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
