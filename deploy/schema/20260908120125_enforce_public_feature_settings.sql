-- Sanitized schema migration from managed Supabase migration history.
create or replace function public.public_setting_enabled(p_key text, p_default boolean default true)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select case
        when jsonb_typeof(value) = 'boolean' then (value #>> '{}')::boolean
        else p_default
      end
      from public.app_settings
      where key = p_key
      limit 1
    ),
    p_default
  );
$$;

revoke all on function public.public_setting_enabled(text, boolean) from public;
grant execute on function public.public_setting_enabled(text, boolean) to anon, authenticated;

create or replace function public.submit_registration(
  p_full_name text,
  p_phone text,
  p_province text,
  p_city text,
  p_route text,
  p_axis text,
  p_issue text,
  p_experience_solution text,
  p_file_path text,
  p_form_data jsonb
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_phone text;
  generated_code text;
begin
  if not public.public_setting_enabled('public.registration_enabled', true) then
    raise exception 'ثبت‌نام در حال حاضر غیرفعال است.';
  end if;

  normalized_phone := public.normalize_digits(p_phone);

  if length(trim(coalesce(p_full_name, ''))) < 2 then
    raise exception 'نام و نام خانوادگی معتبر نیست';
  end if;

  if normalized_phone !~ '^09[0-9]{9}$' then
    raise exception 'شماره تماس معتبر نیست';
  end if;

  if length(trim(coalesce(p_route, ''))) = 0
     or length(trim(coalesce(p_axis, ''))) = 0
     or length(trim(coalesce(p_issue, ''))) = 0 then
    raise exception 'اطلاعات مسیر و مسئله کامل نیست';
  end if;

  insert into public.registrations (
    full_name, phone, province, city, route, axis, issue,
    experience_solution, file_path, form_data
  ) values (
    trim(p_full_name),
    normalized_phone,
    nullif(trim(coalesce(p_province, '')), ''),
    nullif(trim(coalesce(p_city, '')), ''),
    trim(p_route),
    trim(p_axis),
    trim(p_issue),
    nullif(trim(coalesce(p_experience_solution, '')), ''),
    nullif(trim(coalesce(p_file_path, '')), ''),
    coalesce(p_form_data, '{}'::jsonb)
  )
  returning tracking_code into generated_code;

  return generated_code;
end;
$$;

create or replace function public.submit_contact_request(
  p_full_name text,
  p_phone text,
  p_province text,
  p_city text,
  p_preferred_time text,
  p_subject text,
  p_note text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_phone text;
  generated_code text;
begin
  if not public.public_setting_enabled('public.contact_enabled', true) then
    raise exception 'فرم تماس با دبیرخانه در حال حاضر غیرفعال است.';
  end if;

  normalized_phone := public.normalize_digits(p_phone);

  if length(trim(coalesce(p_full_name, ''))) < 2 then
    raise exception 'نام و نام خانوادگی معتبر نیست';
  end if;

  if normalized_phone !~ '^09[0-9]{9}$' then
    raise exception 'شماره تماس معتبر نیست';
  end if;

  if length(trim(coalesce(p_province, ''))) = 0
     or length(trim(coalesce(p_city, ''))) = 0
     or length(trim(coalesce(p_preferred_time, ''))) = 0
     or length(trim(coalesce(p_subject, ''))) = 0 then
    raise exception 'اطلاعات درخواست تماس کامل نیست';
  end if;

  insert into public.contact_requests (
    full_name, phone, province, city, preferred_time, subject, note
  ) values (
    trim(p_full_name),
    normalized_phone,
    trim(p_province),
    trim(p_city),
    trim(p_preferred_time),
    trim(p_subject),
    nullif(trim(coalesce(p_note, '')), '')
  )
  returning request_code into generated_code;

  return generated_code;
end;
$$;

create or replace function public.track_registration(
  p_tracking_code text,
  p_last4 text
)
returns table (
  tracking_code text,
  status text,
  admin_message text,
  updated_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.public_setting_enabled('public.tracking_enabled', true) then
    raise exception 'پیگیری ثبت‌نام در حال حاضر غیرفعال است.';
  end if;

  return query
  select
    r.tracking_code,
    r.status,
    case
      when public.public_setting_enabled('public.admin_message_enabled', true)
        then r.admin_message
      else ''::text
    end,
    r.updated_at
  from public.registrations r
  where r.tracking_code = trim(p_tracking_code)
    and right(public.normalize_digits(r.phone), 4) = right(public.normalize_digits(p_last4), 4)
  limit 1;
end;
$$;

revoke all on function public.submit_registration(text, text, text, text, text, text, text, text, text, jsonb) from public;
grant execute on function public.submit_registration(text, text, text, text, text, text, text, text, text, jsonb) to anon, authenticated;

revoke all on function public.submit_contact_request(text, text, text, text, text, text, text) from public;
grant execute on function public.submit_contact_request(text, text, text, text, text, text, text) to anon, authenticated;

revoke all on function public.track_registration(text, text) from public;
grant execute on function public.track_registration(text, text) to anon, authenticated;

drop policy if exists registration_files_public_upload on storage.objects;
create policy registration_files_public_upload
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'registration-files'
  and public.public_setting_enabled('public.registration_enabled', true)
);
