#!/usr/bin/env bash
# Run from a trusted machine with Docker + Supabase CLI and cloud connectivity.
# Files contain personal data and credentials. NEVER commit to a public repository.
set -Eeuo pipefail
umask 077
: "${SOURCE_DB_URL:?Set SOURCE_DB_URL to the managed Supabase database connection string}"
OUT="${1:-$PWD/private-exports/$(date +%Y%m%d-%H%M%S)}"
mkdir -p "$OUT"
command -v supabase >/dev/null || { echo "Supabase CLI required" >&2; exit 1; }
command -v docker >/dev/null || { echo "Docker required" >&2; exit 1; }
supabase db dump --db-url "$SOURCE_DB_URL" -f "$OUT/roles.sql" --role-only
supabase db dump --db-url "$SOURCE_DB_URL" -f "$OUT/schema.sql"
supabase db dump --db-url "$SOURCE_DB_URL" -f "$OUT/data.sql" --use-copy --data-only
chmod 600 "$OUT"/*.sql
echo "Export saved securely in $OUT. Copy outside repository to Iranian VPS. Storage objects must be copied separately with rclone S3."
