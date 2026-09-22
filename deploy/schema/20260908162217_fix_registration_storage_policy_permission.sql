-- Sanitized schema migration from managed Supabase migration history.
begin;

-- Allow public clients to read only the single registration-enabled flag.
drop policy if exists settings_public_registration_read on public.app_settings;
create policy settings_public_registration_read
on public.app_settings
for select
to anon, authenticated
using (key = 'public.registration_enabled');

-- Avoid calling the internal SECURITY DEFINER helper from the public upload policy.
-- This keeps public_setting_enabled non-executable by anon/authenticated while
-- still letting Storage enforce the registration switch through RLS.
drop policy if exists registration_files_public_upload on storage.objects;
create policy registration_files_public_upload
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'registration-files'
  and coalesce(
    (
      select case
        when jsonb_typeof(s.value) = 'boolean' then (s.value #>> '{}')::boolean
        else true
      end
      from public.app_settings as s
      where s.key = 'public.registration_enabled'
      limit 1
    ),
    true
  )
);

commit;
