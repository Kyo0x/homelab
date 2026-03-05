# Homepage

Homepage is a modern, highly customisable homelab dashboard with live service widgets and a clean, responsive design.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 3000 |
| **Access** | 🌐 Public — `dash.srng.no` |

## Docker Compose

```yaml
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/homepage:/app/config
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 3000:3000
    restart: unless-stopped
```

## Setup

1. Start the container and open Homepage at `http://IBM:3000`.
2. Edit `/data/appdata/homepage/services.yaml` to define your service groups and links.
3. Edit `widgets.yaml` to add system stats, weather, and other info widgets to the top bar.
4. Configure Docker integration in `docker.yaml` to show live container status on service cards.
5. Add API keys for services that support widgets (Sonarr, Radarr, Plex, etc.) in `services.yaml`.
6. Expose `dash.srng.no` via Nginx Proxy Manager with Authelia protection.

## Links

- [Official Docs](https://gethomepage.dev/latest/configs)
