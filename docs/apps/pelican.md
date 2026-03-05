# Pelican Panel

Modern, actively maintained fork of Pterodactyl Panel. Drop-in replacement with a cleaner codebase, faster development cycle, and improved UI. Fully compatible with Pterodactyl Wings and community eggs.

> **Consider this if:** You want Pterodactyl functionality but with a more actively maintained project.

## Deployment

| Property | Value |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Access** | 🔒 VPN or 🌐 Public (`panel.arctichost.no`) |
| **Requires** | MySQL 8, Redis, [Wings](wings.md) on `gameservers` VM |

## Architecture

Same as Pterodactyl: Panel (control plane) lives in the `docker` VM, [Wings](wings.md) daemon lives in the `gameservers` VM.

## Docker Compose

```yaml
version: "3.8"
services:
  panel:
    image: ghcr.io/pelican-dev/panel:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /data/appdata/pelican/var:/app/var
      - /data/appdata/pelican/logs:/app/storage/logs
      - /data/appdata/pelican/nginx:/etc/nginx/http.d
      - /data/appdata/pelican/certs:/etc/letsencrypt
    environment:
      APP_URL: "https://panel.arctichost.no"
      APP_TIMEZONE: "Europe/Oslo"
      DB_HOST: "mysql"
      DB_PORT: "3306"
      DB_DATABASE: "panel"
      DB_USERNAME: "pelican"
      DB_PASSWORD: "${DB_PASSWORD}"
      REDIS_HOST: "redis"
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8
    restart: unless-stopped
    volumes:
      - /data/appdata/pelican/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: "${MYSQL_ROOT_PASSWORD}"
      MYSQL_DATABASE: "panel"
      MYSQL_USER: "pelican"
      MYSQL_PASSWORD: "${DB_PASSWORD}"

  redis:
    image: redis:alpine
    restart: unless-stopped
    volumes:
      - /data/appdata/pelican/redis:/data
```

## Ports

| Port | Protocol | Purpose |
|------|----------|---------|
| 80 | TCP | HTTP redirect |
| 443 | TCP | Panel HTTPS |

## Key Differences from Pterodactyl

| Feature | Pterodactyl | Pelican |
|---|---|---|
| Development | Slower, less active | Active, faster releases |
| UI | Older React UI | Modernized |
| Egg compatibility | Original | Compatible with Pterodactyl eggs |
| Database | MySQL/MariaDB | MySQL/MariaDB |
| Daemon | Wings | Wings (compatible) |
| License | MIT | MIT |

## Setup

1. Start the stack: `docker compose up -d`
2. Run first-time setup:
   ```bash
   docker exec -it pelican-panel-1 php artisan p:environment:setup
   docker exec -it pelican-panel-1 php artisan migrate --seed --force
   docker exec -it pelican-panel-1 php artisan p:user:make
   ```
3. Visit `https://panel.arctichost.no` and log in
4. Add a node pointing to the `gameservers` VM ([Wings setup](wings.md))
5. Import eggs for your supported games

## See Also

- [Pelican Panel](pelican.md) — the panel this node daemon connects to
- [Wings — Node Daemon](wings.md)
- [Game Hosting Overview](../services/gamehosting.md)
