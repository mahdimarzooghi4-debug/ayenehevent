-- Sanitized schema migration from managed Supabase migration history.
begin;

alter function public.normalize_digits(text) set search_path = public, pg_temp;
alter function public.set_updated_at() set search_path = public, pg_temp;
alter function public.set_setting_audit_fields() set search_path = public, pg_temp;

revoke all on function public.normalize_digits(text) from public, anon, authenticated;
revoke all on function public.next_registration_tracking_code() from public, anon, authenticated;
revoke all on function public.next_contact_request_code() from public, anon, authenticated;
revoke all on function public.log_registration_status_change() from public, anon, authenticated;
revoke all on function public.log_contact_status_change() from public, anon, authenticated;
revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.set_setting_audit_fields() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

commit;
