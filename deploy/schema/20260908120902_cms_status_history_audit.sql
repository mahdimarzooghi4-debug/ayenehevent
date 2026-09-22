-- Sanitized schema migration from managed Supabase migration history.
create or replace function public.log_registration_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.registration_status_history (
    registration_id, previous_status, new_status, message, changed_by, created_at
  ) values (
    new.id, null, new.status, new.admin_message, null, new.created_at
  );
  return new;
end;
$$;

drop trigger if exists registrations_log_created on public.registrations;
create trigger registrations_log_created
after insert on public.registrations
for each row execute function public.log_registration_created();

create or replace function public.log_contact_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.contact_status_history (
    contact_request_id, previous_status, new_status, internal_note, changed_by, created_at
  ) values (
    new.id, null, new.status, new.internal_note, null, new.created_at
  );
  return new;
end;
$$;

drop trigger if exists contacts_log_created on public.contact_requests;
create trigger contacts_log_created
after insert on public.contact_requests
for each row execute function public.log_contact_created();

insert into public.registration_status_history (
  registration_id, previous_status, new_status, message, changed_by, created_at
)
select r.id, null, 'ثبت‌شده', 'پرونده با موفقیت دریافت شده است.', null, r.created_at
from public.registrations r
where not exists (
  select 1 from public.registration_status_history h
  where h.registration_id = r.id and h.previous_status is null
);

insert into public.contact_status_history (
  contact_request_id, previous_status, new_status, internal_note, changed_by, created_at
)
select c.id, null, 'جدید', '', null, c.created_at
from public.contact_requests c
where not exists (
  select 1 from public.contact_status_history h
  where h.contact_request_id = c.id and h.previous_status is null
);

create or replace function public.cms_registration_history(p_token text, p_tracking_code text)
returns table (
  id bigint,
  previous_status text,
  new_status text,
  message text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cms_admin_session_valid(p_token) then
    raise exception 'نشست مدیریت معتبر نیست';
  end if;

  return query
  select h.id, h.previous_status, h.new_status, h.message, h.created_at
  from public.registration_status_history h
  join public.registrations r on r.id = h.registration_id
  where r.tracking_code = trim(p_tracking_code)
  order by h.created_at desc, h.id desc;
end;
$$;

create or replace function public.cms_contact_history(p_token text, p_request_code text)
returns table (
  id bigint,
  previous_status text,
  new_status text,
  internal_note text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cms_admin_session_valid(p_token) then
    raise exception 'نشست مدیریت معتبر نیست';
  end if;

  return query
  select h.id, h.previous_status, h.new_status, h.internal_note, h.created_at
  from public.contact_status_history h
  join public.contact_requests c on c.id = h.contact_request_id
  where c.request_code = trim(p_request_code)
  order by h.created_at desc, h.id desc;
end;
$$;

revoke all on function public.cms_registration_history(text, text) from public;
grant execute on function public.cms_registration_history(text, text) to anon, authenticated;
revoke all on function public.cms_contact_history(text, text) from public;
grant execute on function public.cms_contact_history(text, text) to anon, authenticated;
