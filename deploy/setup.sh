#!/usr/bin/env bash
# One-shot deploy for Learn Anything on a fresh Ubuntu droplet (22.04 / 24.04).
# Idempotent: safe to re-run to update. Run as root (or with sudo):
#
#   curl -fsSL <raw-url>/deploy/setup.sh | sudo REPO_URL=https://github.com/ajitq/learn.git DOMAIN=learn.example.com bash
#
# or clone first and run:  sudo ./deploy/setup.sh
#
# Configurable via environment variables:
#   REPO_URL   git URL to clone/pull          (required on first run)
#   BRANCH     branch to deploy               (default: main)
#   APP_DIR    install location               (default: /opt/learn)
#   APP_USER   service user                   (default: learn)
#   PORT       app port behind nginx          (default: 3000)
#   DOMAIN     server_name for nginx          (default: _  i.e. catch-all / use IP)
#   EMAIL      email for certbot TLS          (optional; enables HTTPS if set with a real DOMAIN)
set -euo pipefail

BRANCH="${BRANCH:-main}"
APP_DIR="${APP_DIR:-/opt/learn}"
APP_USER="${APP_USER:-learn}"
PORT="${PORT:-3000}"
DOMAIN="${DOMAIN:-_}"
EMAIL="${EMAIL:-}"

if [[ $EUID -ne 0 ]]; then echo "Please run as root (sudo)." >&2; exit 1; fi
log() { echo -e "\n\033[1;33m==>\033[0m $*"; }

# --- 1. system packages ----------------------------------------------------
log "Installing system packages (git, nginx, build tools)…"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git nginx ca-certificates curl build-essential >/dev/null

# --- 2. Node.js 20 (if missing) --------------------------------------------
if ! command -v node >/dev/null || [[ "$(node -v | cut -dv -f2 | cut -d. -f1)" -lt 18 ]]; then
  log "Installing Node.js 20…"
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null
  apt-get install -y -qq nodejs >/dev/null
fi
log "Node $(node -v), npm $(npm -v)"

# --- 3. service user + code ------------------------------------------------
id -u "$APP_USER" >/dev/null 2>&1 || { log "Creating service user '$APP_USER'…"; useradd -r -m -d "$APP_DIR" -s /usr/sbin/nologin "$APP_USER"; }

if [[ -d "$APP_DIR/.git" ]]; then
  log "Updating existing checkout in $APP_DIR (branch $BRANCH)…"
  git -C "$APP_DIR" fetch --depth 1 origin "$BRANCH"
  git -C "$APP_DIR" checkout -B "$BRANCH" "origin/$BRANCH"
else
  : "${REPO_URL:?REPO_URL is required on first run (e.g. https://github.com/ajitq/learn.git)}"
  log "Cloning $REPO_URL (branch $BRANCH) into $APP_DIR…"
  rm -rf "$APP_DIR"
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
fi

log "Installing npm dependencies…"
( cd "$APP_DIR" && npm install --omit=dev --no-audit --no-fund )

mkdir -p "$APP_DIR/data"
chown -R "$APP_USER":"$APP_USER" "$APP_DIR"

# --- 4. systemd service ----------------------------------------------------
log "Writing systemd unit…"
cat > /etc/systemd/system/learn.service <<UNIT
[Unit]
Description=Learn Anything
After=network.target

[Service]
Type=simple
User=$APP_USER
WorkingDirectory=$APP_DIR
ExecStart=$(command -v node) server.js
Environment=NODE_ENV=production
Environment=PORT=$PORT
Environment=DATA_DIR=$APP_DIR/data
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable --now learn
systemctl restart learn

# --- 5. nginx reverse proxy ------------------------------------------------
# Set SKIP_NGINX=1 to leave nginx alone (e.g. when an existing reverse proxy /
# TLS setup such as Cloudflare origin certs is already in place — configure the
# learn.<domain> vhost by hand to match your other sites).
if [[ -n "${SKIP_NGINX:-}" ]]; then
  log "SKIP_NGINX set — leaving nginx untouched. App is on 127.0.0.1:$PORT."
else
log "Configuring nginx (server_name $DOMAIN)…"
cat > /etc/nginx/sites-available/learn <<NGINX
server {
    listen 80;
    server_name $DOMAIN;
    client_max_body_size 16m;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/learn /etc/nginx/sites-enabled/learn
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# --- 6. optional HTTPS via certbot -----------------------------------------
if [[ -n "$EMAIL" && "$DOMAIN" != "_" ]]; then
  log "Obtaining TLS certificate for $DOMAIN…"
  apt-get install -y -qq certbot python3-certbot-nginx >/dev/null
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect || \
    log "certbot failed (DNS not pointing here yet?) — site still works over HTTP."
fi
fi  # end of nginx / TLS block (skipped when SKIP_NGINX is set)

log "Done. Service status:"
systemctl --no-pager --lines=0 status learn || true
IP=$(curl -fsSL -4 ifconfig.me 2>/dev/null || echo "<droplet-ip>")
echo
echo "Open:  http://${DOMAIN/_/$IP}/"
echo "Logs:  journalctl -u learn -f"
echo "Data:  $APP_DIR/data  (sqlite db + uploaded photos — back this up)"
