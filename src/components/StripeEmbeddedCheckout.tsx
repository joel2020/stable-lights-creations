import { useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createNeonCheckoutSession } from "@/utils/payments.functions";

interface Props {
  priceId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  designDetails: {
    productType: string;
    stable?: string;
    horse?: string;
    trainer?: string;
    colors?: string;
    neonColor?: string;
    photoName?: string;
    photoUrl?: string;
    notes?: string;
  };
  returnUrl?: string;
}

export function StripeEmbeddedCheckout(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const fetchClientSecret = async (): Promise<string> => {
    try {
      const cs = await createNeonCheckoutSession({
        data: {
          priceId: props.priceId,
          customerEmail: props.customerEmail,
          customerName: props.customerName,
          customerPhone: props.customerPhone,
          designDetails: props.designDetails,
          returnUrl: props.returnUrl || `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
          environment: getStripeEnvironment(),
        },
      });
      if (!cs) throw new Error("Failed to start checkout");
      return cs;
    } catch (e) {
      console.error("Checkout session failed:", e);
      setError(e instanceof Error ? e.message : "Failed to start checkout");
      throw e;
    }
  };

  if (error) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-950">We couldn't start the secure checkout.</p>
        <p className="mt-2 text-sm text-red-900/80">
          Your card was not charged. Please try again — or email{" "}
          <a href="mailto:support@itslitneon.com" className="underline font-semibold">support@itslitneon.com</a>{" "}
          and we'll send you a secure payment link directly.
        </p>
        <button
          onClick={() => { setError(null); setRetryKey((k) => k + 1); }}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider key={retryKey} stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
