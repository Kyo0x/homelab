# Homepage

Homepage is a modern, highly customisable homelab dashboard with live service widgets and a clean, responsive design. Deploy this on **Day 2** right after NPM — then add widgets as each new service comes online.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM |
| **Port** | 3002 |
| **Access** | 🔒 VPN — `dash.srng.no` |

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
      - 3002:3002
    restart: unless-stopped
```

## Setup

1. Start the container: `docker compose up -d`
2. Open `http://<docker-vm-ip>:3002` — you'll see a default dashboard
3. Config files live in `/data/appdata/homepage/` — edit them to customise
4. Expose `dash.srng.no` via NPM 🔒 (VPN only — this is your personal hub)

## Day 2 Starter Config

Add this to `/data/appdata/homepage/services.yaml` right after Day 2 is done:

```yaml
- Infrastructure:
    - Nginx Proxy Manager:
        href: http://{{HOSTNAME}}:81
        description: Reverse proxy + SSL
        icon: nginx-proxy-manager.png

    - Pi-hole:
        href: http://{{PI_IP}}/admin
        description: Network-wide ad blocking
        icon: pi-hole.png
        widget:
          type: pihole
          url: http://{{PI_IP}}
          key: {{PIHOLE_API_KEY}}

    - Portainer:
        href: http://{{HOSTNAME}}:9000
        description: Docker container management
        icon: portainer.png
        widget:
          type: portainer
          url: http://{{HOSTNAME}}:9000
          env: 1
          key: {{PORTAINER_API_KEY}}
```

Replace `{{HOSTNAME}}` with your docker VM's LAN IP, `{{PI_IP}}` with the Pi's IP, and fill in API keys once services are running.

## Adding Widgets Per Day

As each day's services come online, drop the relevant block into `services.yaml`:

| Day | Services to add |
|-----|----------------|
| Day 3 | NetBird |
| Day 4 | Vaultwarden, Authelia |
| Day 5 | qBittorrent, Radarr, Sonarr, Prowlarr |
| Day 6 | Plex, Overseerr, Tautulli |
| Day 7 | Nextcloud |
| Day 8 | Navidrome, Audiobookshelf, Immich |
| Day 9 | Grafana, Uptime Kuma |
| Day 10 | Home Assistant |
| Day 11 | Gitea, Wiki.js, code-server |
| Day 12 | Open WebUI, Stable Diffusion |
| Day 15 | Pelican Panel |

Homepage automatically picks up API data for supported services (Plex, Sonarr, Radarr, qBittorrent, Uptime Kuma, Pi-hole, Grafana, etc.) — check [gethomepage.dev/widgets](https://gethomepage.dev/latest/widgets/) for the full list and required API keys.

## Top Bar Widgets (`widgets.yaml`)

```yaml
- resources:
    cpu: true
    memory: true
    disk: /

- datetime:
    text_size: xl
    format:
      timeStyle: short
      dateStyle: short

- search:
    provider: google
    target: _blank
```

## Docker Integration (`docker.yaml`)

Shows live container status on each service card:

```yaml
my-docker:
  socket: /var/run/docker.sock
```

Then add `server: my-docker` and `container: <container_name>` to any service in `services.yaml`.

## Links

- [Official Docs](https://gethomepage.dev/latest/configs)
- [Widget List](https://gethomepage.dev/latest/widgets/)
- [Community Configs](https://github.com/gethomepage/homepage/discussions)
