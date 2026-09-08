begin;

insert into public.app_settings(key, value)
values (
  'public.max_upload_bytes',
  coalesce((select value from public.app_settings where key = 'admin.max_upload_bytes'), to_jsonb(10485760::bigint))
)
on conflict (key) do nothing;

create or replace function public.cms_save_site_presentation_settings(
  p_token text,
  p_max_upload_bytes bigint,
  p_hero_stats jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hero jsonb;
begin
  if not public.cms_admin_session_valid(p_token) then
    raise exception 'نشست مدیریت معتبر نیست';
  end if;

  if p_max_upload_bytes < 1048576 or p_max_upload_bytes > 52428800 then
    raise exception 'حجم فایل باید بین ۱ تا ۵۰ مگابایت باشد';
  end if;

  if jsonb_typeof(p_hero_stats) <> 'object' then
    raise exception 'آمار هیرو معتبر نیست';
  end if;

  if coalesce(btrim(p_hero_stats->>'registrations'), '') = ''
     or coalesce(btrim(p_hero_stats->>'solutions'), '') = ''
     or coalesce(btrim(p_hero_stats->>'provinces'), '') = ''
     or coalesce(btrim(p_hero_stats->>'axes'), '') = '' then
    raise exception 'همه مقادیر آمار هیرو باید تکمیل شوند';
  end if;

  v_hero := jsonb_build_object(
    'registrations', left(btrim(p_hero_stats->>'registrations'), 30),
    'solutions', left(btrim(p_hero_stats->>'solutions'), 30),
    'provinces', left(btrim(p_hero_stats->>'provinces'), 30),
    'axes', left(btrim(p_hero_stats->>'axes'), 30)
  );

  insert into public.app_settings(key, value)
  values
    ('public.hero_stats', v_hero),
    ('public.max_upload_bytes', to_jsonb(p_max_upload_bytes)),
    ('admin.max_upload_bytes', to_jsonb(p_max_upload_bytes))
  on conflict (key) do update set value = excluded.value;

  update storage.buckets
  set file_size_limit = p_max_upload_bytes
  where id = 'registration-files';
end;
$$;

revoke all on function public.cms_save_site_presentation_settings(text, bigint, jsonb) from public;
grant execute on function public.cms_save_site_presentation_settings(text, bigint, jsonb) to anon, authenticated;

commit;
