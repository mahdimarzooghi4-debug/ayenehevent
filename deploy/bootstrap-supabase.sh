#!/usr/bin/env bash
# Prepares a fresh Supabase self-hosted stack without touching the live cloud project.
# Run on the new Iranian VPS; requires git, python3, docker and compose.
set -Eeuo pipefail
umask 077
: "${PUBLIC_API_URL:=https://api.event.ayenehouse.ir}"
: "${PUBLIC_SITE_URL:=https://event.ayenehouse.ir}"
: "${INSTALL_DIR:=/opt/ayene/supabase-project}"
: "${SUPABASE_RELEASE:=self-hosted/v0.7.2}"
for cmd in git python3 docker; do command -v "$cmd" >/dev/null || { echo "Missing $cmd" >&2; exit 1; }; done
docker compose version >/dev/null
if [[ -e "$INSTALL_DIR/.env" ]]; then
  echo "Refusing to overwrite existing Supabase installation: $INSTALL_DIR" >&2; exit 1
fi
mkdir -p "$INSTALL_DIR"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
git clone --depth 1 --branch "$SUPABASE_RELEASE" https://github.com/supabase/supabase.git "$tmp/supabase"
cp -a "$tmp/supabase/docker/." "$INSTALL_DIR/"
cd "$INSTALL_DIR"
cp .env.example .env
# Generate *new* self-hosted secrets. Do not copy cloud service_role secrets.
sh utils/generate-keys.sh --update-env >/dev/null
sh utils/add-new-auth-keys.sh --update-env >/dev/null
PUBLIC_API_URL="$PUBLIC_API_URL" PUBLIC_SITE_URL="$PUBLIC_SITE_URL" python3 - <<'PY'
from pathlib import Path
import os,re
p=Path('.env')
s=p.read_text()
values={
 'SUPABASE_PUBLIC_URL':os.environ['PUBLIC_API_URL'],
 'API_EXTERNAL_URL':os.environ['PUBLIC_API_URL'].rstrip('/')+'/auth/v1',
 'SITE_URL':os.environ['PUBLIC_SITE_URL'],
 'KONG_HTTP_PORT':'8000',
 'KONG_HTTPS_PORT':'8443'
}
for key,val in values.items():
    pat=r'(?m)^'+re.escape(key)+r'=.*$'
    assert len(re.findall(pat,s))==1, f'Expected one {key} in official .env'
    s=re.sub(pat,lambda _:key+'='+val,s)
p.write_text(s)
p.chmod(0o600)
# On the pinned release, restrict Docker published ports to localhost.
# Firewall rules alone are not enough for Docker published ports.
p=Path('docker-compose.yml')
s=p.read_text()
for old,new in (
 ('- ${KONG_HTTP_PORT}:8000/tcp','- 127.0.0.1:${KONG_HTTP_PORT}:8000/tcp'),
 ('- ${KONG_HTTPS_PORT}:8443/tcp','- 127.0.0.1:${KONG_HTTPS_PORT}:8443/tcp'),
 ('- ${POSTGRES_PORT}:5432','- 127.0.0.1:${POSTGRES_PORT}:5432'),
 ('- ${POOLER_PROXY_PORT_TRANSACTION}:6543','- 127.0.0.1:${POOLER_PROXY_PORT_TRANSACTION}:6543')
):
    assert s.count(old)==1, 'Upstream compose changed; inspect before proceeding: '+old
    s=s.replace(old,new)
p.write_text(s)
PY
docker compose config -q
echo "Prepared $INSTALL_DIR. Next: copy edge function, start stack, restore cloud database & files; see deploy/README.fa.md."
