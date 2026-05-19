import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/terms")({ component: Terms });

function Terms() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 md:px-6 py-12 prose prose-invert">
        <h1 className="font-display text-5xl">Terms & Refund Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

        <h2 className="font-display text-2xl mt-8">Custom builds</h2>
        <p className="text-muted-foreground">Custom Neon Stable Clocks ($125 + shipping) are personalized to your design. Because each clock is hand-built to order, custom orders are generally not refundable once production begins. We'll confirm your design with you before we start.</p>

        <h2 className="font-display text-2xl mt-6">Regular clocks</h2>
        <p className="text-muted-foreground">Regular Neon Clocks ($99 + shipping) may be returned in original condition within 14 days of delivery for a refund of the product price, less return shipping. Contact Joe before sending anything back.</p>

        <h2 className="font-display text-2xl mt-6">Damaged in shipping</h2>
        <p className="text-muted-foreground">If your clock arrives damaged, contact us within 7 days with photos and we'll make it right.</p>

        <h2 className="font-display text-2xl mt-6">Photos & image use</h2>
        <p className="text-muted-foreground">By placing an order you confirm you own or have permission to use any image you submit for use on your clock.</p>

        <h2 className="font-display text-2xl mt-6">Contact</h2>
        <p className="text-muted-foreground">Email <a className="text-[var(--neon-orange)]" href="mailto:lightmeupvegas@yahoo.com">lightmeupvegas@yahoo.com</a> or text Joe at 702-460-9190.</p>
      </article>
    </PageShell>
  );
}
