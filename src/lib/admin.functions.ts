import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createStripeClient, type StripeEnv } from "@/lib/stripe.server";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data, userId };
  });

export interface AdminOrder {
  source: "stripe" | "inquiry";
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  amount?: string | null;
  status: string;
  product?: string | null;
  shippingAddress?: string | null;
  designSummary?: string | null;
  photoUrl?: string | null;
  notes?: string | null;
  stripeUrl?: string | null;
}

function formatMoney(amount: number | null | undefined, currency: string | null | undefined): string {
  if (amount == null) return "";
  return `$${(amount / 100).toFixed(2)} ${(currency || "usd").toUpperCase()}`;
}

function formatAddress(a?: any): string {
  if (!a) return "";
  return [a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(", "), a.country]
    .filter(Boolean).join(", ");
}

export const getAdminOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ orders: AdminOrder[] } | { error: string }> => {
    try {
      const { supabase, userId } = context;
      await assertAdmin(supabase, userId);

      // Fetch custom order inquiries via admin client
      const { data: inquiries, error: inqError } = await supabaseAdmin
        .from("custom_order_inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (inqError) throw new Error(inqError.message);

      const inquiryOrders: AdminOrder[] = (inquiries || []).map((i: any) => ({
        source: "inquiry",
        id: i.id,
        createdAt: i.created_at,
        customerName: i.full_name,
        customerEmail: i.email,
        customerPhone: i.phone,
        status: i.status || "new",
        product: "Custom Inquiry (quote)",
        shippingAddress: i.shipping_address,
        designSummary: i.stable_name || null,
        photoUrl: i.logo_url,
        notes: i.notes,
        amount: null,
      }));

      // Fetch Stripe checkout sessions (live + sandbox)
      const envs: StripeEnv[] = ["live", "sandbox"];
      const stripeOrders: AdminOrder[] = [];
      for (const env of envs) {
        try {
          const stripe = createStripeClient(env);
          const list = await stripe.checkout.sessions.list({ limit: 100 });
          for (const s of list.data) {
            if (s.payment_status !== "paid") continue;
            const meta: any = s.metadata || {};
            const shipping: any = (s as any).collected_information?.shipping_details
              || (s as any).shipping_details
              || s.customer_details;
            const designSummary = [
              meta.stable && `Name: ${meta.stable}`,
              meta.horse && `Subtitle: ${meta.horse}`,
              meta.trainer && `Tagline: ${meta.trainer}`,
              meta.neonColor && `Neon: ${meta.neonColor}`,
              meta.colors && `Colors: ${meta.colors}`,
            ].filter(Boolean).join(" · ");
            stripeOrders.push({
              source: "stripe",
              id: s.id,
              createdAt: new Date((s.created || 0) * 1000).toISOString(),
              customerName: s.customer_details?.name || "",
              customerEmail: s.customer_details?.email || s.customer_email || "",
              customerPhone: s.customer_details?.phone || "",
              amount: formatMoney(s.amount_total, s.currency),
              status: env === "live" ? "paid" : "paid (sandbox)",
              product: meta.productType === "regular" ? "Regular Neon Clock" : "Custom Neon Clock",
              shippingAddress: formatAddress(shipping?.address),
              designSummary: designSummary || null,
              photoUrl: meta.photoUrl || null,
              notes: meta.notes || null,
              stripeUrl: `https://dashboard.stripe.com/${env === "sandbox" ? "test/" : ""}payments/${s.payment_intent}`,
            });
          }
        } catch (e) {
          console.error(`Stripe fetch failed for ${env}`, e);
        }
      }

      const all = [...stripeOrders, ...inquiryOrders].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      return { orders: all };
    } catch (e: any) {
      return { error: e?.message || "Failed to load orders" };
    }
  });
