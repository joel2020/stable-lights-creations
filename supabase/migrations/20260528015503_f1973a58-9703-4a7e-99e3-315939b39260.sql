
-- 1. Customer order inquiries: explicit deny policies for clarity
CREATE POLICY "Block client selects on inquiries"
ON public.custom_order_inquiries FOR SELECT TO anon USING (false);

CREATE POLICY "Block client inserts on inquiries"
ON public.custom_order_inquiries FOR INSERT TO anon, authenticated WITH CHECK (false);

CREATE POLICY "Block client updates on inquiries"
ON public.custom_order_inquiries FOR UPDATE TO anon, authenticated USING (false);

CREATE POLICY "Block client deletes on inquiries"
ON public.custom_order_inquiries FOR DELETE TO anon, authenticated USING (false);

-- 2. Storage: require inquiries/ path prefix and block updates/deletes
DROP POLICY IF EXISTS "Public can upload custom order logos" ON storage.objects;

CREATE POLICY "Public can upload custom order logos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'custom-order-logos'
  AND name LIKE 'inquiries/%'
  AND lower(storage.extension(name)) IN ('png','jpg','jpeg','webp','gif','svg')
);

CREATE POLICY "Block updates to custom order logos"
ON storage.objects FOR UPDATE TO anon, authenticated
USING (bucket_id = 'custom-order-logos') WITH CHECK (false);

CREATE POLICY "Block deletes of custom order logos"
ON storage.objects FOR DELETE TO anon, authenticated
USING (bucket_id = 'custom-order-logos' AND false);

-- 3. Revoke EXECUTE on internal email queue functions from app roles.
-- These are only used by trusted server functions via service_role.
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
