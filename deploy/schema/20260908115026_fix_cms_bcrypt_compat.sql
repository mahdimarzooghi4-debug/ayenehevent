-- Sanitized schema migration from managed Supabase migration history.
create or replace function public.cms_admin_login(p_username text, p_password text)
returns table(token text, display_name text, expires_at timestamptz)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  cred public.cms_admin_credentials%rowtype;
  normalized_hash text;
  raw_token text;
  expiry timestamptz;
begin
  select * into cred
  from public.cms_admin_credentials
  where username = trim(lower(p_username))
    and disabled = false;

  normalized_hash := replace(coalesce(cred.password_hash, ''), '$2y$', '$2a$');

  if cred.username is null or normalized_hash <> crypt(p_password, normalized_hash) then
    raise exception 'نام کاربری یا رمز عبور نادرست است';
  end if;

  delete from public.cms_admin_sessions where expires_at <= now();
  raw_token := encode(gen_random_bytes(32), 'hex');
  expiry := now() + interval '12 hours';

  insert into public.cms_admin_sessions(token_hash, username, expires_at)
  values (encode(digest(raw_token, 'sha256'), 'hex'), cred.username, expiry);

  return query select raw_token, cred.display_name, expiry;
end;
$$;
