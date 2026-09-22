-- Sanitized schema migration from managed Supabase migration history.
alter table public.admin_users add column if not exists disabled boolean not null default false;

create index if not exists admin_users_enabled_idx on public.admin_users (disabled) where disabled = false;
