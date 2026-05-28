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
  const fetchClientSecret = async (): Promise<string> => {
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
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
