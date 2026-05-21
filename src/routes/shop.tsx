import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { NEON_COLORS } from "@/lib/clocks";
import { LiveClockPreview } from "@/components/LiveClockPreview";
import { Upload, Phone, Mail, Check } from "lucide-react";

type Search = { type?: "regular" | "custom" };

export const Route = createFileRoute("/shop")({
  component: Shop,
  validateSearch: (s: Record<string, unknown>): Search => ({
    type: s.type === "custom" ? "custom" : s.type === "regular" ? "regular" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Design Your Custom Neon Clock · It's Lit Neon" },
      { name: "description", content: "Build your custom neon clock — upload your logo or photo, pick your colors and neon glow, and see a live preview. For homes, businesses, garages, bars, race teams, stables, and gifts." },
      { property: "og:title", content: "Design Your Custom Neon Clock · It's Lit Neon" },
      { property: "og:description", content: "Customize a one-of-a-kind neon wall clock with your name, logo, photo, or design." },
      { property: "og:url", content: "https://itslitneon.com/shop" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/shop" }],
  }),
});

function Shop() {
  const { type } = Route.useSearch();
  const [productType, setProductType] = useState<"regular" | "custom">(type ?? "custom");
  const [neonColor, setNeonColor] = useState<string>("orange");
  const [photoName, setPhotoName] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [stable, setStable] = useState("");
  const [horse, setHorse] = useState("");
  const [trainer, setTrainer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => () => { if (photoUrl) URL.revokeObjectURL(photoUrl); }, [photoUrl]);

  const price = productType === "regular" ? 99 : 125;

  const summary = useMemo(() => ({
    product: productType === "regular" ? "Regular Neon Clock" : "Custom Neon Clock",
    price,
  }), [productType, price]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get("ownership") || !fd.get("refund")) {
      toast.error("Please confirm both checkboxes to continue.");
      return;
    }
    setSubmitting(true);
    // Build a mailto fallback that captures all order details until checkout backend is wired.
    const lines: string[] = [
      `NEW ORDER — ${summary.product} ($${summary.price} + shipping)`,
      "",
      `Customer: ${fd.get("name")}`,
      `Email: ${fd.get("email")}`,
      `Phone: ${fd.get("phone")}`,
      `Shipping: ${fd.get("address")}`,
      "",
      `Name / Business / Stable: ${fd.get("stable")}`,
      `Subtitle: ${fd.get("horse")}`,
      `Tagline: ${fd.get("trainer")}`,
      `Colors: ${fd.get("colors")}`,
      `Neon Color: ${neonColor}`,
      `Photo: ${photoName || "(none attached — will email separately)"}`,
      "",
      `Notes: ${fd.get("notes")}`,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(`New ${summary.product} order from ${fd.get("name")}`);
    window.location.href = `mailto:lightmeupvegas@yahoo.com?cc=josephdakuras@aol.com&subject=${subject}&body=${body}`;
    toast.success("Opening your email to send the order details to Joe.");
    setTimeout(() => setSubmitting(false), 1500);
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 md:px-6 pt-10 pb-6">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Design Your Custom Clock</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Build It. <span className="text-[var(--neon-orange)] text-glow-orange">Light It Up.</span></h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Tell us what you want — name, logo, photo, business, team, or memorial — and watch your one-of-a-kind clock come together. Joe confirms the final design before production begins.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-20 grid lg:grid-cols-[1fr,360px] gap-8 items-start">
        {/* Mobile-only preview shown above the form so customers see the clock as they fill it in */}
        <div className="lg:hidden rounded-2xl border border-white/10 bg-card p-6 sticky top-2 z-10 backdrop-blur">
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)] mb-3 text-center">Live Preview</div>
          <LiveClockPreview stable={stable} horse={horse} trainer={trainer} neonColor={neonColor} photoUrl={photoUrl} size={240} />
          <p className="mt-3 text-center text-[11px] text-muted-foreground">Updates as you type & upload</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Product type */}
          <Card title="1. Choose Your Clock">
            <RadioGroup value={productType} onValueChange={(v) => setProductType(v as "regular" | "custom")} className="grid sm:grid-cols-2 gap-3">
              {[
                { v: "regular", t: "Regular Neon Clock", p: 99, d: "Pre-designed face, chrome border, your choice of neon glow color." },
                { v: "custom", t: "Custom Neon Clock", p: 125, d: "Fully personalized face — name, logo, photo, business, team, or memorial design." },
              ].map((o) => (
                <label
                  key={o.v}
                  className={`relative cursor-pointer rounded-xl border p-4 transition ${productType === o.v ? "border-[var(--neon-orange)] ring-glow-orange bg-[var(--neon-orange)]/5" : "border-white/10 hover:border-white/30"}`}
                >
                  <RadioGroupItem value={o.v} className="sr-only" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-2xl">{o.t}</div>
                      <div className="text-sm text-muted-foreground mt-1">{o.d}</div>
                    </div>
                    <div className="font-display text-2xl chrome-text">${o.p}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </Card>

          {/* Customer */}
          <Card title="2. Your Info">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Shipping Address" name="address" required placeholder="Street, City, State, ZIP" />
            </div>
          </Card>

          {/* Design */}
          <Card title="3. Design Details">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name, Business, Stable or Logo Text" name="stable" required value={stable} onChange={setStable} placeholder="e.g. Miller's Garage, Beckwith Racing, The Smiths" />
              <Field label="Subtitle (optional)" name="horse" value={horse} onChange={setHorse} placeholder="e.g. Est. 1987, horse name, location" />
              <Field label="Tagline (optional)" name="trainer" value={trainer} onChange={setTrainer} placeholder="e.g. owner name, driver, slogan" />
              <Field label="Your Colors" name="colors" placeholder="e.g. brand colors, racing colors, team colors" />
            </div>

            <div className="mt-5">
              <Label className="text-sm font-semibold uppercase tracking-wider">Neon Glow Color</Label>
              <div className="mt-2 grid grid-cols-4 sm:grid-cols-7 gap-2">
                {NEON_COLORS.map((c) => (
                  <button
                    type="button"
                    key={c.value}
                    onClick={() => setNeonColor(c.value)}
                    className={`group rounded-lg border p-3 text-center transition ${neonColor === c.value ? `border-[var(--neon-${c.value})] ring-glow-${c.value}` : "border-white/10 hover:border-white/30"}`}
                  >
                    <div className={`mx-auto h-6 w-6 rounded-full ring-glow-${c.value}`} style={{ backgroundColor: c.hex }} />
                    <div className="mt-1 text-[10px] font-bold uppercase">{c.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="photo" className="text-sm font-semibold uppercase tracking-wider">Upload Photo or Logo</Label>
              <label htmlFor="photo" className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-black/30 p-6 text-sm text-muted-foreground hover:border-[var(--neon-orange)] hover:text-foreground">
                <Upload className="h-5 w-5" />
                {photoName || "Tap to upload your logo, photo, or artwork (JPG, PNG)"}
              </label>
              <input id="photo" name="photo" type="file" accept="image/*" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0];
                setPhotoName(f?.name ?? "");
                if (photoUrl) URL.revokeObjectURL(photoUrl);
                setPhotoUrl(f ? URL.createObjectURL(f) : null);
              }} />
            </div>

            <div className="mt-5">
              <Label htmlFor="notes" className="text-sm font-semibold uppercase tracking-wider">Custom Design Notes</Label>
              <Textarea id="notes" name="notes" rows={4} placeholder="Tell us anything special — memorial wording, logo placement, font preference, etc." className="mt-2 bg-black/30 border-white/15" />
            </div>
          </Card>

          {/* Confirm */}
          <Card title="4. Confirm">
            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm">
                <Checkbox name="ownership" id="ownership" className="mt-0.5" />
                <span>I confirm I own or have permission to use the uploaded image.</span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <Checkbox name="refund" id="refund" className="mt-0.5" />
                <span>I understand that <strong>all sales are final</strong> — clocks are handmade to order and are <strong>non-refundable, non-returnable, and non-cancellable</strong>. See our <Link to="/terms" className="text-[var(--neon-orange)] underline">Terms &amp; No-Refund Policy</Link>.</span>
              </label>
            </div>
            <Button type="submit" disabled={submitting} size="lg" className="mt-6 w-full bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold text-base h-12">
              {submitting ? "Sending..." : `Submit Order Request · $${price} + shipping`}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Prefer to talk? <a className="text-[var(--neon-orange)] hover:underline" href="sms:+17024609190">Text Joe at 702-460-9190</a>
            </p>
          </Card>
        </form>

        {/* Sticky live preview + summary */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)] mb-4 text-center">Live Preview</div>
            <LiveClockPreview stable={stable} horse={horse} trainer={trainer} neonColor={neonColor} photoUrl={photoUrl} size={300} />
            <p className="mt-6 text-center text-xs text-muted-foreground">Type your details — the clock updates as you go. Final design is hand-built and may vary.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Order Summary</div>
            <div className="mt-2 font-display text-2xl">{summary.product}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-4xl chrome-text">${summary.price}</span>
              <span className="text-sm text-muted-foreground">+ shipping</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--neon-green)]" /> Chrome-style border</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--neon-green)]" /> Quartz movement</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--neon-green)]" /> Neon on/off switch</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--neon-green)]" /> Joe confirms design before build</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Need Help?</div>
            <div className="mt-3 space-y-2 text-sm">
              <a href="sms:+17024609190" className="flex items-center gap-2 hover:text-[var(--neon-orange)]"><Phone className="h-4 w-4" />Text 702-460-9190</a>
              <a href="mailto:lightmeupvegas@yahoo.com" className="flex items-center gap-2 hover:text-[var(--neon-orange)]"><Mail className="h-4 w-4" />lightmeupvegas@yahoo.com</a>
            </div>
            <Link to="/gallery" className="mt-4 block text-sm font-semibold text-[var(--neon-orange)] hover:underline">See more builds →</Link>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-5 md:p-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", required, placeholder, value, onChange }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm">{label}{required && <span className="text-[var(--neon-orange)]"> *</span>}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="mt-1.5 bg-black/30 border-white/15"
      />
    </div>
  );
}
