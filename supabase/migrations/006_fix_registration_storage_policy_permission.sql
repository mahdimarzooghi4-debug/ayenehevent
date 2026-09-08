begin;

-- Public registration uploads need to read only the registration-enabled flag.
-- Keep the broader internal helper public_setting_enabled() non-executable.
drop policy if exists settings_public_registration_read on public.app_settings;
create policy settings_public_registration_read
on public.app_settings
for select
to anon, authenticated
using (key = 'public.registration_enabled');

-- Enforce the registration switch directly through RLS instead of calling
-- public.public_setting_enabled(), whose EXECUTE privilege is intentionally revoked.
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
