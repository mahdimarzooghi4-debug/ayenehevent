begin;

-- Internal helpers must never be directly callable from the public API.
revoke all on function public.log_contact_created() from public, anon, authenticated;
revoke all on function public.log_registration_created() from public, anon, authenticated;
revoke all on function public.public_setting_enabled(text, boolean) from public, anon, authenticated;
revoke all on function public.registration_submission_allowed(text) from public, anon, authenticated;

-- Keep the explicitly intended API surface only.
grant execute on function public.get_public_settings() to anon, authenticated;
grant execute on function public.submit_registration(text,text,text,text,text,text,text,text,text,jsonb) to anon, authenticated;
grant execute on function public.submit_contact_request(text,text,text,text,text,text,text) to anon, authenticated;
grant execute on function public.track_registration(text,text) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;

-- RLS init-plan optimization.
drop policy if exists admin_users_self_read on public.admin_users;
create policy admin_users_self_read on public.admin_users
for select to authenticated
using (user_id = (select auth.uid()));

-- Cover foreign keys and common audit/session lookups.
create index if not exists app_settings_updated_by_idx on public.app_settings(updated_by);
create index if not exists cms_admin_sessions_username_idx on public.cms_admin_sessions(username);
create index if not exists contact_status_history_changed_by_idx on public.contact_status_history(changed_by);
create index if not exists contact_status_history_contact_request_idx on public.contact_status_history(contact_request_id, created_at desc);
create index if not exists registration_status_history_changed_by_idx on public.registration_status_history(changed_by);
create index if not exists registration_status_history_registration_idx on public.registration_status_history(registration_id, created_at desc);

commit;
