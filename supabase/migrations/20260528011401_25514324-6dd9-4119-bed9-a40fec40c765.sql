
-- Restrict storage bucket: 5MB max, images only
UPDATE storage.buckets
SET file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png','image/jpeg','image/jpg','image/webp','image/gif','image/svg+xml']
WHERE id = 'custom-order-logos';

-- Replace permissive INSERT policy with one that enforces type + path
DROP POLICY IF EXISTS "Public can upload custom order logos" ON storage.objects;

CREATE POLICY "Public can upload custom order logos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'custom-order-logos'
  AND lower(storage.extension(name)) IN ('png','jpg','jpeg','webp','gif','svg')
);

-- Lock down user_roles writes — only service_role may modify
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;

CREATE POLICY "Block client inserts to user_roles"
ON public.user_roles FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "Block client updates to user_roles"
ON public.user_roles FOR UPDATE TO authenticated USING (false);

CREATE POLICY "Block client deletes from user_roles"
ON public.user_roles FOR DELETE TO authenticated USING (false);
