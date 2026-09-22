-- Sanitized schema migration from managed Supabase migration history.
create or replace function public.cms_change_password(
  p_token text,
  p_current_password text,
  p_new_password text
)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  session_username text;
  current_hash text;
begin
  select s.username
    into session_username
  from public.cms_admin_sessions s
  join public.cms_admin_credentials c on c.username = s.username
  where s.token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex')
    and s.expires_at > now()
    and c.disabled = false
  limit 1;

  if session_username is null then
    raise exception 'نشست مدیریت معتبر نیست. دوباره وارد شوید';
  end if;

  select replace(password_hash, '$2y$', '$2a$')
    into current_hash
  from public.cms_admin_credentials
  where username = session_username
    and disabled = false;

  if current_hash is null or crypt(coalesce(p_current_password, ''), current_hash) <> current_hash then
    raise exception 'رمز عبور فعلی نادرست است';
  end if;

  if length(coalesce(p_new_password, '')) < 10 then
    raise exception 'رمز عبور جدید باید حداقل ۱۰ کاراکتر باشد';
  end if;

  if p_new_password = p_current_password then
    raise exception 'رمز عبور جدید باید با رمز فعلی متفاوت باشد';
  end if;

  update public.cms_admin_credentials
  set password_hash = crypt(p_new_password, gen_salt('bf', 12)),
      updated_at = now()
  where username = session_username;

  delete from public.cms_admin_sessions
  where username = session_username;

  return true;
end;
$$;

revoke all on function public.cms_change_password(text, text, text) from public;
grant execute on function public.cms_change_password(text, text, text) to anon, authenticated;
