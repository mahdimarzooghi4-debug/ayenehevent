#!/usr/bin/env bash
# Run on fresh Iranian Supabase ONLY, after Auth and Storage initializations.
set -Eeuo pipefail
cd "$(dirname "$0")/.."
docker inspect supabase-db --format '{{.State.Running}}' | grep -qx true || { echo "Database container down" >&2; exit 1; }
ready=$(docker exec supabase-db psql -U postgres -d postgres -Atqc "select (to_regclass('auth.users') is not null and to_regclass('storage.objects') is not null)::text")
[[ "$ready" == true ]] || { echo "Wait for Auth and Storage foundation; db container alone is NOT enough." >&2; exit 1; }
existing=$(docker exec supabase-db psql -U postgres -d postgres -Atqc "select count(*) from pg_tables where schemaname='public'")
[[ "$existing" == 0 ]] || { echo "Public schema nonempty ($existing tables); refusing to overwrite." >&2; exit 1; }
shopt -s nullglob
scripts=(deploy/schema/*.sql)
[[ "${#scripts[@]}" == 16 ]] || { echo "Expected 16 migrations, found ${#scripts[@]}." >&2; exit 1; }
for f in "${scripts[@]}"; do
  echo "Applying: $(basename "$f")"
  docker exec -i supabase-db psql -X -U postgres -d postgres -v ON_ERROR_STOP=1 < "$f" >/dev/null || {
    echo "Error in $f; STOP. Do not blindly rerun on partially built database." >&2; exit 1;
  }
done
docker exec supabase-db psql -U postgres -d postgres -c "select count(*) as ayene_public_tables from pg_tables where schemaname='public';"
echo "Schema installed. Create a NEW local CMS admin."
