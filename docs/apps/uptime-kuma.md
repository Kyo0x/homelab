# Uptime Kuma

Uptime Kuma monitors the availability of all homelab services and public endpoints with a clean status page.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 3001 |
| **Access** | 🌐 Public — `status.srng.no` |
| **Storage** | `/data/appdata/uptime-kuma` (data) |

## Docker Compose

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    container_name: uptime-kuma
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/uptime-kuma:/app/data
    ports:
      - 3001:3001
    restart: unless-stopped
```

## Setup

1. Open Uptime Kuma at `http://IBM:3001` and create the admin account on first launch.
2. Add a monitor for each public-facing service (HTTP/HTTPS keyword checks recommended).
3. Add internal monitors for VPN-only services using their local IP or VPN address.
4. Go to **Settings → Notifications** and add an alert channel (email, Telegram, or Discord).
5. Create a **Status Page** and add all monitors to it — expose it at `status.srng.no`.
6. Set appropriate check intervals — 60 seconds for critical services, 5 minutes for others.

## Configuration

**Monitor types and when to use them:**

| Type | Use case |
|---|---|
| HTTP(s) | Public websites and APIs — checks status code |
| HTTP(s) – Keyword | Verify a specific string appears in the response body |
| TCP Port | Check a raw port is reachable (databases, game servers) |
| DNS | Resolve a hostname and optionally check the returned IP |
| Ping | Simple ICMP reachability for hosts on the VPN |
| Docker Container | Check a container is running via Docker socket |

**Setting up Telegram notifications:**

1. Create a bot via `@BotFather` and note the token.
2. Send a message to the bot, then fetch `https://api.telegram.org/bot<TOKEN>/getUpdates` to get your chat ID.
3. In Uptime Kuma go to **Settings → Notifications → Add**, choose Telegram, enter token + chat ID.
4. Assign the notification to each monitor.

**Status Page** — configure at `/manage-status-page`:

- Group monitors by category (e.g. *Media*, *Smart Home*, *Infra*).
- Set a custom domain (`status.srng.no`) in Nginx Proxy Manager.
- Enable the incident timeline so outage history is visible publicly.

## Integration

- **Nginx Proxy Manager** — create a proxy host for `status.srng.no` → `uptime-kuma:3001`; enable **Force SSL** with the wildcard cert.
- **Authelia** — the public status page should be accessible without auth; admin UI access from VPN only.
- **Ntfy / Telegram** — notification channel for instant alerts when monitors go down.

## See Also

- [Nginx Proxy Manager](nginx-proxy-manager.md) — exposes the public status page
- [Official Docs](https://github.com/louislam/uptime-kuma/wiki)
