# Cloudflare Tunnel

Expose public-facing services without opening ports on your router.

## Overview

Cloudflare Tunnel runs a lightweight daemon (`cloudflared`) on your IBM server that creates an outbound connection to Cloudflare. Traffic for your public services is routed through Cloudflare's network to that tunnel — no open ports, no static IP required.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | — (no UI) |
| **Access** | 🔒 VPN |

## Services Behind Tunnel

| Service | URL |
|---|---|
| [Overseerr](overseerr.md) | `request.srng.no` |
| [Navidrome](navidrome.md) | `music.srng.no` |
| [Audiobookshelf](audiobookshelf.md) | `books.srng.no` |

Plex uses its own relay — no tunnel needed.
Everything else stays VPN-only via [NetBird](netbird.md).

## Docker Compose

```yaml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    restart: unless-stopped
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
```

Store your token in a `.env` file next to the compose file:
```
TUNNEL_TOKEN=your-token-here
```

## Setup

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com) and make sure your domain is added
2. Go to **Zero Trust → Networks → Tunnels → Create a tunnel**
3. Name it (e.g. `homelab`) and select **Docker** as the connector
4. Copy the token shown — add it to your `.env` file as `TUNNEL_TOKEN`
5. Start the container: `docker compose up -d`
6. Back in the dashboard, add a **Public Hostname** for each service:

| Subdomain | Domain | Service | Port |
|---|---|---|---|
| `request` | `srng.no` | `http://localhost` | `5055` |
| `music` | `srng.no` | `http://localhost` | `4533` |
| `books` | `srng.no` | `http://localhost` | `13378` |

7. Verify each URL loads from outside your network

## Links

- [Official Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)
