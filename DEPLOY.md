# Deploying Learn Anything on a DigitalOcean droplet

The app is a tiny Node + Express server with a SQLite database. No build step.

## 1. Install Node (once)

On Ubuntu 22.04/24.04:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential   # build-essential lets better-sqlite3 compile if no prebuilt binary
```

## 2. Get the code

```bash
sudo mkdir -p /opt/learn && sudo chown $USER /opt/learn
git clone <this-repo-url> /opt/learn
cd /opt/learn
npm install --omit=dev
```

> The Norton chapter PDFs are committed in `courses/mechanism-design/` and served as
> static files, so `git clone` brings them along — nothing extra to copy.

## 3. Run it as a service

```bash
sudo useradd -r -s /usr/sbin/nologin learn || true
sudo chown -R learn /opt/learn
sudo cp deploy/learn.service /etc/systemd/system/learn.service
sudo systemctl daemon-reload
sudo systemctl enable --now learn
sudo systemctl status learn        # should be "active (running)"
```

The app now listens on `http://127.0.0.1:3000`. Data (the SQLite DB and uploaded
photos) persists in `/opt/learn/data/` — back this folder up.

## 4. Expose it with nginx + HTTPS

```bash
sudo apt-get install -y nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/learn
# edit server_name in that file, then:
sudo ln -s /etc/nginx/sites-available/learn /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# optional but recommended — free TLS cert:
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d learn.example.com
```

Open the droplet's domain/IP in any phone or laptop browser — the checklist and
journal are stored server-side, so they're identical on every device.

## Updating later

```bash
cd /opt/learn && git pull && npm install --omit=dev && sudo systemctl restart learn
```

## Notes / future

- **Single user, no login** for now. To add accounts later: add a `users` table and a
  `user` column to `session_state`, gate the API behind a session cookie. The current
  schema is intentionally additive-friendly.
- **No firewall config here** — make sure DO's firewall / `ufw` allows ports 80/443.
