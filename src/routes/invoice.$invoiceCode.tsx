import { createFileRoute } from "@tanstack/react-router";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/Layout";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createManualInvoiceCheckoutSession } from "@/utils/payments.functions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const markWeaverStripeInvoiceUrl = import.meta.env.VITE_MARK_WEAVER_STRIPE_INVOICE_URL as string | undefined;

export const Route = createFileRoute("/invoice/$invoiceCode")({
  component: InvoiceCheckout,
  head: () => ({
    meta: [
      { title: "Invoice ILN-2026-0611-12 · It's Lit Neon" },
      { name: "description", content: "Secure Stripe invoice checkout for a custom It's Lit Neon clock order." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function InvoiceCheckout() {
  const { invoiceCode } = Route.useParams();
  const isKnownInvoice = invoiceCode === "ILN-2026-0611-12";

  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[0.92fr_1.08fr] md:px-6 md:py-20">
        <aside className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-4">Secure Stripe Invoice</Badge>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">
              Invoice <span className="text-[var(--neon-orange)] text-glow-orange">{invoiceCode}</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              This is a secure Stripe checkout for Joe&apos;s custom 12-clock order.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <h2 className="font-display text-2xl">Order Summary</h2>
            <Separator className="my-4" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span>Custom neon clocks</span>
                <span className="tabular-nums">12</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Unit price</span>
                <span className="tabular-nums">$125.00</span>
              </div>
              <div className="flex justify-between gap-4 font-semibold">
                <span>Clock subtotal</span>
                <span className="tabular-nums">$1,500.00</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Custom design @ $25 each</span>
                <span className="tabular-nums">FREE NO CHARGE</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Shipping</span>
                <span className="tabular-nums">$90.00</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Tax and other charges</span>
                <span className="tabular-nums">$0.00</span>
              </div>
              <div className="flex justify-between gap-4 pt-2 text-base font-bold">
                <span>Total due</span>
                <span className="tabular-nums">$1,590.00</span>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Due upon receipt. Once payment is received, your clocks will move into production and be
              shipped within 72 hours. No tax or additional charges.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Payments are processed securely by Stripe. It&apos;s Lit Neon does not store full card numbers.
          </p>
        </aside>

        <div className="min-h-[620px] rounded-lg border border-white/10 bg-white p-2 text-black shadow-2xl">
          {isKnownInvoice ? (
            <InvoiceStripeCheckout invoiceCode={invoiceCode} />
          ) : (
            <div className="flex min-h-[560px] items-center justify-center p-8 text-center">
              <div>
                <h2 className="text-2xl font-bold text-black">Invoice not found</h2>
                <p className="mt-2 text-sm text-neutral-600">Please check the invoice link and try again.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function InvoiceStripeCheckout({ invoiceCode }: { invoiceCode: string }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function createSession() {
      if (markWeaverStripeInvoiceUrl) return;

      try {
        const secret = await createManualInvoiceCheckoutSession({
          data: {
            invoiceCode,
            returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
            environment: getStripeEnvironment(),
          },
        });

        if (!secret) throw new Error("Unable to open Stripe invoice checkout");
        if (isMounted) setClientSecret(secret);
      } catch (err) {
        console.error("Unable to load Stripe invoice checkout", err);
        if (isMounted) setError(true);
      }
    }

    createSession();

    return () => {
      isMounted = false;
    };
  }, [invoiceCode]);

  if (markWeaverStripeInvoiceUrl) {
    return (
      <div className="flex min-h-[560px] items-center justify-center p-8 text-center">
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold text-black">Open the secure Stripe invoice</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Mark Weaver&apos;s custom order invoice is ready to pay through Stripe&apos;s hosted invoice page.
          </p>
          <Button asChild className="mt-6">
            <a href={markWeaverStripeInvoiceUrl} target="_blank" rel="noreferrer">
              Pay Securely on Stripe
            </a>
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[560px] items-center justify-center p-8 text-center">
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold text-black">Open the secure Stripe invoice</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            This order is ready to pay through Stripe&apos;s hosted invoice page. Please confirm with Joe
            before forwarding this invoice link.
          </p>
          {markWeaverStripeInvoiceUrl ? (
            <Button asChild className="mt-6">
              <a href={markWeaverStripeInvoiceUrl} target="_blank" rel="noreferrer">
                Pay Securely on Stripe
              </a>
            </Button>
          ) : (
            <p className="mt-5 text-xs text-neutral-500">
              Stripe invoice link is not configured yet.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex min-h-[560px] items-center justify-center p-8 text-center">
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold text-black">Preparing secure checkout</h2>
          <p className="mt-3 text-sm text-neutral-600">Connecting to Stripe...</p>
        </div>
      </div>
    );
  }

  return (
    <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
