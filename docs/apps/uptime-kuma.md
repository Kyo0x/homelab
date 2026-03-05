# Uptime Kuma

Uptime Kuma monitors the availability of all homelab services and public endpoints with a clean status page.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 3001 |
| **Access** | 🌐 Public — `status.srng.no` |

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

## Links

- [Official Docs](https://github.com/louislam/uptime-kuma/wiki)
