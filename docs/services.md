# Homelab Services

Complete service list for the homelab, organized by machine.

## Hardware Roles

| Machine | Primary Role |
|---|---|
| **IBM Server** | Everything that doesn't need a GPU — compute, storage, services |
| **Ubuntu Server** | GPU-only workloads + Plex |
| **Raspberry Pi 4B** | Always-on lightweight network services |

---

## IBM Server
> 2x Xeon E5-2650 · 384GB RAM · 25.6TB SAS SSD

### Media Management

| Service | What it does | Access |
|---|---|---|
| [**Radarr**](apps/radarr.md) | Auto-manages and downloads movies | 🔒 VPN |
| [**Sonarr**](apps/sonarr.md) | Auto-manages and downloads TV shows | 🔒 VPN |
| [**Lidarr**](apps/lidarr.md) | Auto-manages and downloads music | 🔒 VPN |
| [**Readarr**](apps/readarr.md) | Auto-manages and downloads ebooks | 🔒 VPN |
| [**Prowlarr**](apps/prowlarr.md) | Indexer manager for all *arrs | 🔒 VPN |
| [**qBittorrent**](apps/qbittorrent.md) / **SABnzbd** | Download client, saves directly to local storage | 🔒 VPN |
| [**Bazarr**](apps/bazarr.md) | Auto-downloads subtitles | 🔒 VPN |
| [**Overseerr**](apps/overseerr.md) | Media request portal for movies/TV | 🌐 [Cloudflare Tunnel](apps/cloudflare-tunnel.md) — `request.srng.no` |

### Music & Audio

| Service | What it does | Access |
|---|---|---|
| [**Navidrome**](apps/navidrome.md) | Self-hosted Spotify, streams your music library | 🌐 [Cloudflare Tunnel](apps/cloudflare-tunnel.md) — `music.srng.no` |
| [**Audiobookshelf**](apps/audiobookshelf.md) | Audiobooks + podcasts streamer | 🌐 [Cloudflare Tunnel](apps/cloudflare-tunnel.md) — `books.srng.no` |
| [**Beets**](apps/beets.md) | Auto-tags and organizes music library | 🔒 VPN |

### Books & Reading

| Service | What it does | Access |
|---|---|---|
| [**Calibre-Web**](apps/calibre-web.md) | eBook library + web reader | 🔒 VPN |
| [**Kavita**](apps/kavita.md) | Manga, comics, and books in one UI | 🔒 VPN |

### Personal Cloud & Files

| Service | What it does | Access |
|---|---|---|
| [**Nextcloud**](apps/nextcloud.md) | Private Google Drive — files, calendar, contacts | 🔒 VPN |
| [**Syncthing**](apps/syncthing.md) | Peer-to-peer file sync between devices | 🔒 VPN |
| [**Paperless-ngx**](apps/paperless-ngx.md) | Document scanner & management | 🔒 VPN |
| [**Filebrowser**](apps/filebrowser.md) | Web-based file manager | 🔒 VPN |

### Security & Passwords

| Service | What it does | Access |
|---|---|---|
| [**Vaultwarden**](apps/vaultwarden.md) | Self-hosted Bitwarden password manager | 🔒 VPN |
| [**Authelia**](apps/authelia.md) | SSO + 2FA across all services | 🔒 VPN |
| [**CrowdSec**](apps/crowdsec.md) | Collaborative IP banning & threat detection | 🔒 VPN |

### Networking & Proxy

| Service | What it does | Access |
|---|---|---|
| [**Nginx Proxy Manager**](apps/nginx-proxy-manager.md) | Reverse proxy + SSL for all services | 🔒 VPN |
| [**NetBird**](apps/netbird.md) | Self-hosted mesh VPN — full control plane on IBM | 🔒 VPN |

### Monitoring & Observability

| Service | What it does | Access |
|---|---|---|
| [**Grafana**](apps/grafana.md) + [**Prometheus**](apps/prometheus.md) | Metrics dashboards for all machines | 🔒 VPN |
| [**Uptime Kuma**](apps/uptime-kuma.md) | Service status & uptime monitoring | 🔒 VPN |
| [**Netdata**](apps/netdata.md) | Real-time per-node performance | 🔒 VPN |
| [**Dozzle**](apps/dozzle.md) | Live Docker log viewer | 🔒 VPN |
| [**Watchtower**](apps/watchtower.md) | Auto-updates Docker containers | 🔒 VPN |

### Home Automation

| Service | What it does | Access |
|---|---|---|
| [**Home Assistant**](apps/home-assistant.md) | King of home automation | 🔒 VPN |
| [**Node-RED**](apps/node-red.md) | Visual automation flows | 🔒 VPN |

### Dev & Productivity

| Service | What it does | Access |
|---|---|---|
| [**Gitea / Forgejo**](apps/gitea.md) | Self-hosted GitHub | 🔒 VPN |
| [**Portainer**](apps/portainer.md) | Docker container GUI manager | 🔒 VPN |
| [**Homepage**](apps/homepage.md) | Clean homelab dashboard with widgets | 🔒 VPN |
| [**Wiki.js / BookStack**](apps/wiki-js.md) | Personal knowledge base / wiki | 🔒 VPN |
| [**Stirling-PDF**](apps/stirling-pdf.md) | All-in-one self-hosted PDF tools | 🔒 VPN |
| [**IT-Tools**](apps/it-tools.md) | 100+ developer utility tools in one app | 🔒 VPN |

---

## Ubuntu Server
> i7-9700K · 32GB RAM · 1TB NVMe · GTX 1070 Ti

### Media Server

| Service | What it does | Access |
|---|---|---|
| [**Plex**](apps/plex.md) | Media streaming — reads from IBM via NFS, transcodes via NVENC | 🌐 Public — `plex.srng.no` |

### Photos

| Service | What it does | Access |
|---|---|---|
| [**Immich**](apps/immich.md) | Self-hosted Google Photos with GPU-accelerated AI face detection | 🔒 VPN |

### AI & LLMs

| Service | What it does | Access |
|---|---|---|
| [**llama.cpp + llama-server**](apps/llama-cpp.md) | Raw LLM inference, max performance from 8GB VRAM | 🔒 VPN |
| [**Open WebUI**](apps/open-webui.md) | Beautiful ChatGPT-like UI for llama.cpp | 🔒 VPN |
| [**Stable Diffusion (Automatic1111)**](apps/stable-diffusion.md) | Local AI image generation | 🔒 VPN |

### Dev

| Service | What it does | Access |
|---|---|---|
| [**code-server**](apps/code-server.md) | VS Code in the browser | 🔒 VPN |

---

## Raspberry Pi 4B
> ARM Cortex-A72 · 4–8GB RAM · Always on, low power

| Service | What it does | Access |
|---|---|---|
| [**Pi-hole / AdGuard Home**](apps/pi-hole.md) | Network-wide ad & tracker blocking | 🔒 VPN |
| [**Unbound**](apps/unbound.md) | Recursive DNS resolver — pairs with Pi-hole | 🔒 VPN |
| [**Mosquitto**](apps/mosquitto.md) | MQTT broker for IoT devices | 🔒 VPN |
| [**Zigbee2MQTT**](apps/zigbee2mqtt.md) | Zigbee device controller | 🔒 VPN |

---

## Subdomain Structure

### srng.no

| Subdomain | Service | Access |
|---|---|---|
| `plex.srng.no` | Plex | 🌐 Public |
| `request.srng.no` | Overseerr | 🌐 Public |
| `music.srng.no` | Navidrome | 🌐 Public |
| `books.srng.no` | Audiobookshelf | 🌐 Public |
| `vault.srng.no` | Vaultwarden | 🔒 VPN |
| `photos.srng.no` | Immich | 🔒 VPN |
| `cloud.srng.no` | Nextcloud | 🔒 VPN |
| `home.srng.no` | Home Assistant | 🔒 VPN |
| `monitor.srng.no` | Grafana | 🔒 VPN |
| `status.srng.no` | Uptime Kuma | 🔒 VPN |
| `docker.srng.no` | Portainer | 🔒 VPN |
| `proxy.srng.no` | Nginx Proxy Manager | 🔒 VPN |
| `git.srng.no` | Gitea / Forgejo | 🔒 VPN |
| `code.srng.no` | code-server | 🔒 VPN |
| `ai.srng.no` | Open WebUI | 🔒 VPN |
| `draw.srng.no` | Stable Diffusion | 🔒 VPN |
| `docs.srng.no` | Wiki.js / BookStack | 🔒 VPN |
| `files.srng.no` | Filebrowser | 🔒 VPN |
| `paper.srng.no` | Paperless-ngx | 🔒 VPN |
| `dash.srng.no` | Homepage | 🔒 VPN |

---

## Data Flow

```
Internet
   │
   ▼
Nginx Proxy Manager (IBM) ── SSL ──► All services
   │
   ├── *Arrs + qBittorrent ──► IBM Local Storage (25.6TB)
   │                                      │
   │                               NFS Mount
   │                                      │
   └──────────────────────────────► Plex (Ubuntu) ──NVENC──► Your devices
                                    Immich (Ubuntu)
                                    llama.cpp (Ubuntu)

Pi 4B ── DNS (Pi-hole + Unbound) ──► All devices on network
      └── MQTT (Mosquitto) ──► IoT/Zigbee devices

NetBird (IBM) ── Mesh VPN ──► All nodes (IBM + Ubuntu + Pi + your devices)
```

---

## Access Legend

| Icon | Meaning |
|---|---|
| 🌐 Public | Accessible from anywhere via srng.no |
| 🔒 VPN | Requires NetBird connection |

---

## Resource Utilization

| Machine | Est. RAM Usage | Headroom |
|---|---|---|
| **IBM** (384GB) | ~20–40GB for all services | 340GB+ free for game hosting |
| **Ubuntu** (32GB) | ~16–24GB for GPU services | Comfortable |
| **Pi 4B** (4–8GB) | ~1–2GB | Plenty |
