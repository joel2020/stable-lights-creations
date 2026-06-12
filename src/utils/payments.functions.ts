import { createServerFn } from "@tanstack/react-start";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";

async function resolveOrCreateCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  options: { email?: string; name?: string; phone?: string },
): Promise<string> {
  if (options.email) {
    const existing = await stripe.customers.list({ email: options.email, limit: 1 });
    if (existing.data.length) return existing.data[0].id;
  }
  const created = await stripe.customers.create({
    ...(options.email && { email: options.email }),
    ...(options.name && { name: options.name }),
    ...(options.phone && { phone: options.phone }),
  });
  return created.id;
}

const ALLOWED_RETURN_ORIGINS = [
  "https://itslitneon.com",
  "https://www.itslitneon.com",
  "https://stable-lights-creations.lovable.app",
  "https://id-preview--48fd46fb-3e05-4769-9f20-2432cd8a35c7.lovable.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:8080",
];

function assertSafeReturnUrl(url: string) {
  let parsed: URL;
  try { parsed = new URL(url); } catch { throw new Error("Invalid returnUrl"); }
  if (!ALLOWED_RETURN_ORIGINS.includes(parsed.origin)) {
    throw new Error("Invalid returnUrl origin");
  }
}

export const createNeonCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: {
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
    returnUrl: string;
    environment: StripeEnv;
  }) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(data.priceId)) throw new Error("Invalid priceId");
    if (!data.customerEmail || !data.customerName) throw new Error("Customer email & name required");
    assertSafeReturnUrl(data.returnUrl);
    return data;
  })
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.environment);

    const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
    if (!prices.data.length) throw new Error("Price not found");
    const stripePrice = prices.data[0];

    const productId = typeof stripePrice.product === "string"
      ? stripePrice.product
      : stripePrice.product.id;
    const product = await stripe.products.retrieve(productId);

    const customerId = await resolveOrCreateCustomer(stripe, {
      email: data.customerEmail,
      name: data.customerName,
      phone: data.customerPhone,
    });

    // Stripe metadata values are limited to 500 chars; truncate just in case.
    const trunc = (s: string | undefined, n = 480) =>
      s ? (s.length > n ? s.slice(0, n) : s) : "";

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      customer: customerId,
      customer_update: { name: "auto", address: "auto", shipping: "auto" },
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [{
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 2900, currency: "usd" },
          display_name: "Flat-rate shipping",
          tax_behavior: "exclusive",
        },
      }],
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: true },
      payment_intent_data: { description: product.name },
      metadata: {
        productType: trunc(data.designDetails.productType, 50),
        stable: trunc(data.designDetails.stable),
        horse: trunc(data.designDetails.horse),
        trainer: trunc(data.designDetails.trainer),
        colors: trunc(data.designDetails.colors),
        neonColor: trunc(data.designDetails.neonColor, 50),
        photoName: trunc(data.designDetails.photoName, 200),
        photoUrl: trunc(data.designDetails.photoUrl, 480),
        notes: trunc(data.designDetails.notes),
      },
    });

    return session.client_secret;
  });

export const createManualInvoiceCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: {
    invoiceCode: string;
    returnUrl: string;
    environment: StripeEnv;
  }) => {
    if (data.invoiceCode !== "ILN-2026-0611-12") throw new Error("Invalid invoice code");
    assertSafeReturnUrl(data.returnUrl);
    return data;
  })
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.environment);

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "usd",
          unit_amount: 14900,
          product_data: {
            name: "It's Lit Neon Custom Neon Clock",
            description: "12-clock custom order invoice ILN-2026-0611-12. Shipping, if needed, may be billed separately after final address confirmation.",
          },
        },
        quantity: 12,
      }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      customer_creation: "always",
      customer_update: { name: "auto", address: "auto", shipping: "auto" },
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: true },
      payment_intent_data: {
        description: "Invoice ILN-2026-0611-12 · 12 custom neon clocks",
      },
      metadata: {
        invoiceCode: "ILN-2026-0611-12",
        source: "manual_stripe_invoice",
        productType: "Custom Neon Clock",
        quantity: "12",
        unitPrice: "149.00",
      },
    });

    return session.client_secret;
  });

export const getCheckoutSessionSummary = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string; environment: StripeEnv }) => {
    if (!/^cs_(test|live)_[a-zA-Z0-9]+$/.test(data.sessionId)) {
      throw new Error("Invalid sessionId");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.environment);
    const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ["line_items", "total_details.breakdown", "shipping_cost"],
    });
    const toMajor = (n: number | null | undefined) => (n ?? 0) / 100;
    const currency = (session.currency ?? "usd").toUpperCase();
    const items = (session.line_items?.data ?? []).map((li) => ({
      description: li.description ?? "Item",
      quantity: li.quantity ?? 1,
      amount: toMajor(li.amount_subtotal),
    }));
    return {
      currency,
      email: session.customer_details?.email ?? null,
      name: session.customer_details?.name ?? null,
      items,
      subtotal: toMajor(session.amount_subtotal),
      shipping: toMajor(session.shipping_cost?.amount_total ?? 0),
      tax: toMajor(session.total_details?.amount_tax ?? 0),
      discount: toMajor(session.total_details?.amount_discount ?? 0),
      total: toMajor(session.amount_total),
      status: session.status,
      paymentStatus: session.payment_status,
    };
  });
