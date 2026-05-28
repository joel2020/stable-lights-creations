import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageShell } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Upload, Check, ShieldCheck, Phone, Mail, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { submitCustomOrderInquiry } from "@/lib/custom-order.functions";

export const Route = createFileRoute("/custom-order")({
  component: CustomOrderPage,
  head: () => ({
    meta: [
      { title: "Custom Order · No Charge Until Artwork Is Approved · It's Lit Neon" },
      { name: "description", content: "A simple, personal way to order a custom neon stable clock. Send us your details and logo — we'll send a proof, then an invoice. You only pay after you approve the artwork." },
      { property: "og:title", content: "Custom Stable Clock Order · It's Lit Neon" },
      { property: "og:description", content: "No accounts, no checkout, no charge until you approve the artwork. Built one at a time by Joe." },
      { property: "og:url", content: "https://itslitneon.com/custom-order" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/custom-order" }],
  }),
});

const STEPS = [
  { n: 1, t: "You submit your details", d: "Name, address, stable name, and your logo." },
  { n: 2, t: "We review your logo", d: "Joe checks the artwork personally — usually within 1 business day." },
  { n: 3, t: "We send a proof", d: "You see exactly how your clock will look before anything is built." },
  { n: 4, t: "We send an invoice", d: "Only after you approve the proof. Pay by card, check, or however works for you." },
  { n: 5, t: "We build & ship it", d: "Hand-built, packed carefully, and shipped to your door." },
];

function CustomOrderPage() {
  const navigate = useNavigate();
  const submitFn = useServerFn(submitCustomOrderInquiry);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    stableName: "",
    notes: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function pickLogo(file: File | null) {
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      toast.error("That file is over 15 MB. Please pick a smaller image.");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function uploadLogo(file: File): Promise<{ url: string; filename: string } | null> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
    const path = `inquiries/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage
      .from("custom-order-logos")
      .upload(path, file, { upsert: false, contentType: file.type || undefined });
    if (error) {
      console.error(error);
      return null;
    }
    const { data } = supabase.storage.from("custom-order-logos").getPublicUrl(path);
    return { url: data.publicUrl, filename: file.name };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.shippingAddress.trim()) {
      toast.error("Please fill in your name, email, phone, and shipping address.");
      return;
    }

    setSubmitting(true);
    try {
      let logoUrl = "";
      let logoFilename = "";
      if (logoFile) {
        toast.message("Uploading your logo…");
        const uploaded = await uploadLogo(logoFile);
        if (!uploaded) {
          toast.error("Logo upload failed. You can still submit — Joe will follow up by email.");
        } else {
          logoUrl = uploaded.url;
          logoFilename = uploaded.filename;
        }
      }

      await submitFn({
        data: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          shippingAddress: form.shippingAddress.trim(),
          stableName: form.stableName.trim(),
          notes: form.notes.trim(),
          logoUrl,
          logoFilename,
        },
      });

      toast.success("Order details received! Check your email for next steps.");
      navigate({ to: "/custom-order-confirmation" });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong. Please text Joe at 702-460-9190.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 md:px-6 pt-8 pb-6">
        <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)]">Custom Stable Clock Order</div>
        <h1 className="mt-2 font-display text-4xl md:text-6xl leading-tight">
          A simple, <span className="text-[var(--neon-orange)] text-glow-orange">personal</span> way to order your clock
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
          No accounts. No online checkout. No payment up front. Just fill in your details and Joe will personally handle the rest — start to finish.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[var(--neon-orange)]/50 bg-[var(--neon-orange)]/5 p-4 md:p-5">
          <ShieldCheck className="h-8 w-8 md:h-10 md:w-10 text-[var(--neon-orange)] shrink-0" />
          <div>
            <div className="font-display text-xl md:text-2xl">No charge until artwork is approved</div>
            <div className="text-sm md:text-base text-muted-foreground">You only pay after you see and approve your proof.</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-3xl px-4 md:px-6 py-6">
        <h2 className="font-display text-2xl md:text-3xl">How it works</h2>
        <ol className="mt-5 space-y-3">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4 rounded-xl border border-white/10 bg-card p-4 md:p-5">
              <div className="grid h-10 w-10 md:h-12 md:w-12 shrink-0 place-items-center rounded-full bg-[var(--neon-orange)] text-black font-display text-xl md:text-2xl">
                {s.n}
              </div>
              <div>
                <div className="font-semibold text-lg md:text-xl">{s.t}</div>
                <div className="text-sm md:text-base text-muted-foreground">{s.d}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-3xl px-4 md:px-6 py-6">
        <div className="rounded-2xl border border-white/10 bg-card p-5 md:p-8">
          <h2 className="font-display text-3xl md:text-4xl">Start Your Custom Clock Order</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Takes about 2 minutes. Everything marked <span className="text-[var(--neon-orange)]">*</span> is required.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
            <Field
              id="fullName"
              label="Your full name"
              required
              value={form.fullName}
              onChange={(v) => update("fullName", v)}
              autoComplete="name"
            />
            <Field
              id="email"
              label="Email address"
              type="email"
              required
              value={form.email}
              onChange={(v) => update("email", v)}
              autoComplete="email"
              hint="We'll send your proof and invoice here."
            />
            <Field
              id="phone"
              label="Phone number"
              type="tel"
              required
              value={form.phone}
              onChange={(v) => update("phone", v)}
              autoComplete="tel"
              hint="Joe may text you with quick questions."
            />
            <div className="grid gap-2">
              <Label htmlFor="shippingAddress" className="text-base md:text-lg">
                Shipping address <span className="text-[var(--neon-orange)]">*</span>
              </Label>
              <Textarea
                id="shippingAddress"
                required
                value={form.shippingAddress}
                onChange={(e) => update("shippingAddress", e.target.value)}
                autoComplete="street-address"
                rows={3}
                placeholder="Street, City, State, ZIP"
                className="text-base md:text-lg min-h-[88px]"
              />
            </div>
            <Field
              id="stableName"
              label="Stable name"
              value={form.stableName}
              onChange={(v) => update("stableName", v)}
              hint="What should appear on the clock face?"
            />

            {/* Logo upload */}
            <div className="grid gap-2">
              <Label className="text-base md:text-lg">Upload your logo or photo</Label>
              <div className="text-sm text-muted-foreground">
                A picture of your logo, silks, or any artwork. PNG or JPG works best. Optional — you can also email it to Joe after.
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => pickLogo(e.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/20 bg-background/40 px-4 py-6 md:py-8 hover:border-[var(--neon-orange)] hover:bg-[var(--neon-orange)]/5 transition"
              >
                {logoPreview ? (
                  <>
                    <img src={logoPreview} alt="Logo preview" className="h-16 w-16 rounded-md object-cover" />
                    <div className="text-left">
                      <div className="font-semibold text-base md:text-lg flex items-center gap-2">
                        <Check className="h-5 w-5 text-[var(--neon-orange)]" /> {logoFile?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">Tap to change</div>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="h-7 w-7 text-[var(--neon-orange)]" />
                    <div className="text-left">
                      <div className="font-semibold text-base md:text-lg">Tap to choose a file</div>
                      <div className="text-sm text-muted-foreground">From your phone, camera, or computer</div>
                    </div>
                  </>
                )}
              </button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes" className="text-base md:text-lg">Anything else? (optional)</Label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={4}
                placeholder="Colors, deadline, number of clocks, special instructions…"
                className="text-base md:text-lg min-h-[96px]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="mt-2 h-14 md:h-16 bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold text-lg md:text-xl"
            >
              {submitting ? "Sending…" : "Submit My Order Details"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <ShieldCheck className="inline h-4 w-4 mr-1 text-[var(--neon-orange)]" />
              You won't be charged anything today.
            </p>
          </form>
        </div>
      </section>

      {/* Shipping note */}
      <section className="mx-auto max-w-3xl px-4 md:px-6 py-6">
        <div className="rounded-2xl border border-white/10 bg-card p-5 md:p-7">
          <h2 className="font-display text-2xl md:text-3xl">Shipping</h2>
          <ul className="mt-3 space-y-2 text-base md:text-lg text-muted-foreground">
            <li>• A standard <strong className="text-foreground">$29 shipping fee</strong> is billed on your invoice.</li>
            <li>• If the actual shipping cost is more, you'll receive a <strong className="text-foreground">separate invoice for the difference</strong>.</li>
            <li>• It's Lit Neon only charges you the <strong className="text-foreground">exact shipping cost</strong> — not a penny more.</li>
            <li>• Ordering <strong className="text-foreground">multiple clocks together</strong> is more cost-effective — we combine shipping.</li>
            <li>• International and Canadian shipping is <strong className="text-foreground">quoted separately</strong> based on destination.</li>
          </ul>
        </div>
      </section>

      {/* Reassurance / contact */}
      <section className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-12">
        <div className="rounded-2xl border border-[var(--neon-orange)]/40 bg-[var(--neon-orange)]/5 p-5 md:p-7">
          <h2 className="font-display text-2xl md:text-3xl">Prefer to talk to a person?</h2>
          <p className="mt-2 text-base md:text-lg text-muted-foreground">
            Totally fine. Joe will walk you through the whole thing — design, pricing, and shipping. No tech, no checkout, no pressure.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg" className="h-14 text-base bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
              <a href="tel:+17024609190"><Phone className="mr-2 h-5 w-5" /> Call Joe · 702-460-9190</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 text-base border-[var(--neon-orange)]/60">
              <a href="mailto:support@itslitneon.com"><Mail className="mr-2 h-5 w-5" /> support@itslitneon.com</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Not ready yet? <Link to="/gallery" className="underline hover:text-[var(--neon-orange)]">Browse the gallery</Link> for ideas.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  value,
  onChange,
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-base md:text-lg">
        {label} {required && <span className="text-[var(--neon-orange)]">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="h-12 md:h-14 text-base md:text-lg"
      />
      {hint && <div className="text-sm text-muted-foreground">{hint}</div>}
    </div>
  );
}
