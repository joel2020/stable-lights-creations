import { createFileRoute } from "@tanstack/react-router";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { PageShell } from "@/components/Layout";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createManualInvoiceCheckoutSession } from "@/utils/payments.functions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

  const fetchClientSecret = async () => {
    if (!isKnownInvoice) throw new Error("Invoice not found");

    const clientSecret = await createManualInvoiceCheckoutSession({
      data: {
        invoiceCode,
        returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        environment: getStripeEnvironment(),
      },
    });

    if (!clientSecret) throw new Error("Unable to open Stripe invoice checkout");
    return clientSecret;
  };

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
                <span className="tabular-nums">$149.00</span>
              </div>
              <div className="flex justify-between gap-4 font-semibold">
                <span>Clock subtotal</span>
                <span className="tabular-nums">$1,788.00</span>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Sales tax may be calculated by Stripe based on the billing/shipping details entered at checkout.
              Shipping, if needed beyond this clock subtotal, may be handled separately after final address confirmation.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Payments are processed securely by Stripe. It&apos;s Lit Neon does not store full card numbers.
          </p>
        </aside>

        <div className="min-h-[620px] rounded-lg border border-white/10 bg-white p-2 text-black shadow-2xl">
          {isKnownInvoice ? (
            <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
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
