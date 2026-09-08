create or replace function public.cms_export_backup(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cms_admin_session_valid(p_token) then
    raise exception 'نشست مدیریت معتبر نیست';
  end if;

  return jsonb_build_object(
    'format_version', 1,
    'exported_at', now(),
    'registrations', coalesce((select jsonb_agg(to_jsonb(r) order by r.created_at desc) from public.registrations r), '[]'::jsonb),
    'registration_status_history', coalesce((select jsonb_agg(to_jsonb(h) order by h.created_at desc, h.id desc) from public.registration_status_history h), '[]'::jsonb),
    'contact_requests', coalesce((select jsonb_agg(to_jsonb(c) order by c.created_at desc) from public.contact_requests c), '[]'::jsonb),
    'contact_status_history', coalesce((select jsonb_agg(to_jsonb(h) order by h.created_at desc, h.id desc) from public.contact_status_history h), '[]'::jsonb),
    'settings', coalesce((select jsonb_agg(to_jsonb(s) order by s.key) from public.app_settings s), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.cms_export_backup(text) from public;
grant execute on function public.cms_export_backup(text) to anon, authenticated;
