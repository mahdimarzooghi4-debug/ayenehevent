# Ayene backend setup

The frontend remains usable without Supabase configuration. When the two Vite environment values are present, the real backend layer is enabled.

## 1. Create a Supabase project

Create a project and run `supabase/migrations/001_initial_schema.sql` in the SQL editor (or through the Supabase CLI/plugin).

The migration creates:

- `admin_users`
- `registrations`
- `registration_status_history`
- `contact_requests`
- `contact_status_history`
- `app_settings`
- private `registration-files` storage bucket
- public submission/tracking RPCs
- Row Level Security policies

## 2. Create the first admin

Create an Auth user using this email convention:

`<username>@admin.ayene.local`

For example, username `admin` maps to `admin@admin.ayene.local`.

Then add that Auth user to `admin_users`:

```sql
insert into public.admin_users (user_id, username, display_name)
select id, 'admin', 'مدیر سامانه'
from auth.users
where email = 'admin@admin.ayene.local';
```

## 3. Configure local development

Copy `.env.example` to `.env.local` and fill in:

```text
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Never place the Supabase service-role key in the frontend or GitHub Pages build.

## 4. Configure GitHub Pages

Add repository Actions secrets named:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The Pages workflow passes only these public client values to Vite at build time.

## Security model

Anonymous visitors cannot directly read registration/contact tables. Public submissions use security-definer RPC functions with validation. Registration tracking requires the tracking code plus the last four digits of the phone number. Admin table reads/writes require an authenticated user present in `admin_users`. Uploaded registration files are private; only admins can create signed download URLs.
