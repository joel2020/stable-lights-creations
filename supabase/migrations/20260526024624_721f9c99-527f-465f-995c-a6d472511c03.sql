
-- Custom order inquiries table (manual review flow, no auto-charge)
CREATE TABLE public.custom_order_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  stable_name TEXT,
  logo_url TEXT,
  logo_filename TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_order_inquiries ENABLE ROW LEVEL SECURITY;

-- No public reads/writes. Inserts happen via service-role server function.
-- (No policies = deny-by-default for anon/authenticated.)

-- Storage bucket for customer logo uploads (publicly readable so ops can view from email)
INSERT INTO storage.buckets (id, name, public)
VALUES ('custom-order-logos', 'custom-order-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public (anon) uploads to this bucket only.
CREATE POLICY "Public can upload custom order logos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'custom-order-logos');

CREATE POLICY "Public can read custom order logos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'custom-order-logos');
