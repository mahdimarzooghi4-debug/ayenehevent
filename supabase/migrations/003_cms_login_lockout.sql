begin;

create table if not exists public.cms_admin_login_guards (
  username_hash text primary key,
  failed_attempts integer not null default 0 check (failed_attempts >= 0),
  window_started_at timestamptz not null default now(),
  locked_until timestamptz,
  updated_at timestamptz not null default now(),
  constraint cms_admin_login_guards_hash_length check (length(username_hash) = 64)
);

alter table public.cms_admin_login_guards enable row level security;
revoke all on table public.cms_admin_login_guards from public, anon, authenticated;

create index if not exists cms_admin_login_guards_updated_at_idx
  on public.cms_admin_login_guards(updated_at);

create or replace function public.cms_admin_login(p_username text, p_password text)
returns table(token text, display_name text, expires_at timestamptz)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  cred public.cms_admin_credentials%rowtype;
  normalized_username text;
  username_key text;
  normalized_hash text;
  raw_token text;
  expiry timestamptz;
  guard_row public.cms_admin_login_guards%rowtype;
  next_failures integer;
  password_ok boolean := false;
begin
  normalized_username := trim(lower(coalesce(p_username, '')));
  username_key := encode(digest(normalized_username, 'sha256'), 'hex');

  delete from public.cms_admin_login_guards
  where updated_at < now() - interval '2 days'
    and (locked_until is null or locked_until < now());

  select * into guard_row
  from public.cms_admin_login_guards
  where username_hash = username_key;

  if guard_row.username_hash is not null
     and guard_row.locked_until is not null
     and guard_row.locked_until > now() then
    return query select null::text, null::text, guard_row.locked_until;
    return;
  end if;

  select * into cred
  from public.cms_admin_credentials
  where username = normalized_username
    and disabled = false;

  normalized_hash := replace(coalesce(cred.password_hash, ''), '$2y$', '$2a$');

  if cred.username is not null and normalized_hash <> '' then
    password_ok := normalized_hash = crypt(coalesce(p_password, ''), normalized_hash);
  else
    perform crypt(coalesce(p_password, ''), gen_salt('bf', 12));
    password_ok := false;
  end if;

  if not password_ok then
    insert into public.cms_admin_login_guards (
      username_hash, failed_attempts, window_started_at, locked_until, updated_at
    ) values (
      username_key, 0, now(), null, now()
    )
    on conflict (username_hash) do nothing;

    select * into guard_row
    from public.cms_admin_login_guards
    where username_hash = username_key
    for update;

    if guard_row.window_started_at < now() - interval '15 minutes' then
      next_failures := 1;
      update public.cms_admin_login_guards
      set failed_attempts = 1,
          window_started_at = now(),
          locked_until = null,
          updated_at = now()
      where username_hash = username_key;
    else
      next_failures := guard_row.failed_attempts + 1;
      update public.cms_admin_login_guards
      set failed_attempts = next_failures,
          locked_until = case when next_failures >= 5 then now() + interval '15 minutes' else null end,
          updated_at = now()
      where username_hash = username_key;
    end if;

    select * into guard_row
    from public.cms_admin_login_guards
    where username_hash = username_key;

    return query select null::text, null::text, guard_row.locked_until;
    return;
  end if;

  delete from public.cms_admin_login_guards
  where username_hash = username_key;

  delete from public.cms_admin_sessions s
  where s.expires_at <= now();

  raw_token := encode(gen_random_bytes(32), 'hex');
  expiry := now() + interval '12 hours';

  insert into public.cms_admin_sessions(token_hash, username, expires_at)
  values (encode(digest(raw_token, 'sha256'), 'hex'), cred.username, expiry);

  return query select raw_token, cred.display_name, expiry;
end;
$$;

revoke all on function public.cms_admin_login(text, text) from public;
grant execute on function public.cms_admin_login(text, text) to anon, authenticated;

create or replace function public.cms_change_password(p_token text, p_current_password text, p_new_password text)
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

  delete from public.cms_admin_login_guards
  where username_hash = encode(digest(lower(trim(session_username)), 'sha256'), 'hex');

  delete from public.cms_admin_sessions
  where username = session_username;

  return true;
end;
$$;

commit;
