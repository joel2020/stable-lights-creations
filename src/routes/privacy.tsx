import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 md:px-6 py-12 prose prose-invert">
        <h1 className="font-display text-5xl">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

        <h2 className="font-display text-2xl mt-8">What we collect</h2>
        <p className="text-muted-foreground">When you order from Light Me Up Productions we collect the information you submit — your name, email, phone number, shipping address, design details, and any photos you upload. Payment information is handled by our payment processor and is not stored on our servers.</p>

        <h2 className="font-display text-2xl mt-6">How we use it</h2>
        <p className="text-muted-foreground">Your information is used only to design, build, and ship your clock, and to communicate with you about your order. We do not sell or share your information with third parties.</p>

        <h2 className="font-display text-2xl mt-6">Photos you upload</h2>
        <p className="text-muted-foreground">By uploading a photo you confirm you own it or have permission to use it. We use uploaded photos only to design and produce your clock.</p>

        <h2 className="font-display text-2xl mt-6">Contact</h2>
        <p className="text-muted-foreground">Questions? Email <a className="text-[var(--neon-orange)]" href="mailto:lightmeupvegas@yahoo.com">lightmeupvegas@yahoo.com</a> or text Joe at 702-460-9190.</p>
      </article>
    </PageShell>
  );
}
