-- Sanitized schema migration from managed Supabase migration history.
create table if not exists public.cms_admin_credentials (
  username text primary key,
  password_hash text not null,
  display_name text not null default 'مدیر سامانه',
  disabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_admin_sessions (
  token_hash text primary key,
  username text not null references public.cms_admin_credentials(username) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.cms_admin_credentials enable row level security;
alter table public.cms_admin_sessions enable row level security;

create or replace function public.cms_admin_login(p_username text, p_password text)
returns table(token text, display_name text, expires_at timestamptz)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  cred public.cms_admin_credentials%rowtype;
  raw_token text;
  expiry timestamptz;
begin
  select * into cred
  from public.cms_admin_credentials
  where username = trim(lower(p_username))
    and disabled = false;

  if cred.username is null or cred.password_hash <> crypt(p_password, cred.password_hash) then
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

create or replace function public.cms_admin_session_valid(p_token text)
returns boolean
language sql
stable
security definer
set search_path = public, extensions
as $$
  select exists (
    select 1
    from public.cms_admin_sessions s
    join public.cms_admin_credentials c on c.username = s.username
    where s.token_hash = encode(digest(coalesce(p_token,''), 'sha256'), 'hex')
      and s.expires_at > now()
      and c.disabled = false
  );
$$;

create or replace function public.cms_admin_logout(p_token text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  delete from public.cms_admin_sessions
  where token_hash = encode(digest(coalesce(p_token,''), 'sha256'), 'hex');
$$;

create or replace function public.cms_list_registrations(p_token text)
returns setof public.registrations
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cms_admin_session_valid(p_token) then raise exception 'نشست مدیریت معتبر نیست'; end if;
  return query select * from public.registrations order by created_at desc;
end;
$$;

create or replace function public.cms_list_contacts(p_token text)
returns setof public.contact_requests
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cms_admin_session_valid(p_token) then raise exception 'نشست مدیریت معتبر نیست'; end if;
  return query select * from public.contact_requests order by created_at desc;
end;
$$;

create or replace function public.cms_update_registration(p_token text, p_tracking_code text, p_status text, p_message text)
returns public.registrations
language plpgsql
security definer
set search_path = public
as $$
declare r public.registrations;
begin
  if not public.cms_admin_session_valid(p_token) then raise exception 'نشست مدیریت معتبر نیست'; end if;
  update public.registrations
  set status = p_status, admin_message = coalesce(p_message,'')
  where tracking_code = p_tracking_code
  returning * into r;
  if r.id is null then raise exception 'پرونده پیدا نشد'; end if;
  return r;
end;
$$;

create or replace function public.cms_update_contact(p_token text, p_request_code text, p_status text, p_internal_note text)
returns public.contact_requests
language plpgsql
security definer
set search_path = public
as $$
declare r public.contact_requests;
begin
  if not public.cms_admin_session_valid(p_token) then raise exception 'نشست مدیریت معتبر نیست'; end if;
  update public.contact_requests
  set status = p_status, internal_note = coalesce(p_internal_note,'')
  where request_code = p_request_code
  returning * into r;
  if r.id is null then raise exception 'درخواست پیدا نشد'; end if;
  return r;
end;
$$;

create or replace function public.cms_get_settings(p_token text)
returns table(key text, value jsonb)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cms_admin_session_valid(p_token) then raise exception 'نشست مدیریت معتبر نیست'; end if;
  return query select s.key, s.value from public.app_settings s order by s.key;
end;
$$;

create or replace function public.cms_save_public_settings(
  p_token text,
  p_registration_enabled boolean,
  p_tracking_enabled boolean,
  p_admin_message_enabled boolean,
  p_contact_enabled boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cms_admin_session_valid(p_token) then raise exception 'نشست مدیریت معتبر نیست'; end if;
  insert into public.app_settings(key,value) values
    ('public.registration_enabled', to_jsonb(p_registration_enabled)),
    ('public.tracking_enabled', to_jsonb(p_tracking_enabled)),
    ('public.admin_message_enabled', to_jsonb(p_admin_message_enabled)),
    ('public.contact_enabled', to_jsonb(p_contact_enabled))
  on conflict (key) do update set value = excluded.value;
end;
$$;

revoke all on function public.cms_admin_login(text,text) from public;
revoke all on function public.cms_admin_session_valid(text) from public;
revoke all on function public.cms_admin_logout(text) from public;
revoke all on function public.cms_list_registrations(text) from public;
revoke all on function public.cms_list_contacts(text) from public;
revoke all on function public.cms_update_registration(text,text,text,text) from public;
revoke all on function public.cms_update_contact(text,text,text,text) from public;
revoke all on function public.cms_get_settings(text) from public;
revoke all on function public.cms_save_public_settings(text,boolean,boolean,boolean,boolean) from public;

grant execute on function public.cms_admin_login(text,text) to anon, authenticated;
grant execute on function public.cms_admin_session_valid(text) to anon, authenticated;
grant execute on function public.cms_admin_logout(text) to anon, authenticated;
grant execute on function public.cms_list_registrations(text) to anon, authenticated;
grant execute on function public.cms_list_contacts(text) to anon, authenticated;
grant execute on function public.cms_update_registration(text,text,text,text) to anon, authenticated;
grant execute on function public.cms_update_contact(text,text,text,text) to anon, authenticated;
grant execute on function public.cms_get_settings(text) to anon, authenticated;
grant execute on function public.cms_save_public_settings(text,boolean,boolean,boolean,boolean) to anon, authenticated;

-- Existing cloud admin password hash intentionally excluded. Create NEW admin locally.
