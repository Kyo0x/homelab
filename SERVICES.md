# Homelab Services

Complete service list for the homelab, organized by machine.

## Hardware Roles

| Machine | Primary Role |
|---|---|
| **IBM Server** | Everything that doesn't need a GPU — compute, storage, services |
| **Ubuntu Server** | GPU-only workloads + Plex |
| **Raspberry Pi 4B** | Always-on lightweight network services |

---

## Domains

| Domain | Purpose |
|---|---|
| **srng.no** | Personal homelab services |
| **ITVaktmesteren.no** | Upcoming IT business |
| **Arctichost.no** | Commercial server/game hosting |

---

## IBM Server
> 2x Xeon E5-2650 · 384GB RAM · 25.6TB SAS SSD

### Media Management

| Service | What it does | Access |
|---|---|---|
| **Radarr** | Auto-manages and downloads movies | 🔒 VPN |
| **Sonarr** | Auto-manages and downloads TV shows | 🔒 VPN |
| **Lidarr** | Auto-manages and downloads music | 🔒 VPN |
| **Readarr** | Auto-manages and downloads ebooks | 🔒 VPN |
| **Prowlarr** | Indexer manager for all *arrs | 🔒 VPN |
| **qBittorrent** / **SABnzbd** | Download client, saves directly to local storage | 🔒 VPN |
| **Bazarr** | Auto-downloads subtitles | 🔒 VPN |
| **Overseerr** | Media request portal for movies/TV | 🌐 Public — `request.srng.no` |

### Music & Audio

| Service | What it does | Access |
|---|---|---|
| **Navidrome** | Self-hosted Spotify, streams your music library | 🌐 Public — `music.srng.no` |
| **Audiobookshelf** | Audiobooks + podcasts streamer | 🌐 Public — `books.srng.no` |
| **Beets** | Auto-tags and organizes music library | 🔒 VPN |

### Books & Reading

| Service | What it does | Access |
|---|---|---|
| **Calibre-Web** | eBook library + web reader | 🔒 VPN |
| **Kavita** | Manga, comics, and books in one UI | 🔒 VPN |

### Personal Cloud & Files

| Service | What it does | Access |
|---|---|---|
| **Nextcloud** | Private Google Drive — files, calendar, contacts | 🔒 VPN |
| **Syncthing** | Peer-to-peer file sync between devices | 🔒 VPN |
| **Paperless-ngx** | Document scanner & management | 🔒 VPN |
| **Filebrowser** | Web-based file manager | 🔒 VPN |

### Security & Passwords

| Service | What it does | Access |
|---|---|---|
| **Vaultwarden** | Self-hosted Bitwarden password manager | 🔒 VPN |
| **Authelia** | SSO + 2FA across all services | 🔒 VPN |
| **CrowdSec** | Collaborative IP banning & threat detection | 🔒 VPN |

### Networking & Proxy

| Service | What it does | Access |
|---|---|---|
| **Nginx Proxy Manager** | Reverse proxy + SSL for all services | 🔒 VPN |
| **NetBird** | Self-hosted mesh VPN — full control plane on IBM | 🔒 VPN |

### Monitoring & Observability

| Service | What it does | Access |
|---|---|---|
| **Grafana + Prometheus** | Metrics dashboards for all machines | 🔒 VPN |
| **Uptime Kuma** | Service status & uptime monitoring | 🔒 VPN |
| **Netdata** | Real-time per-node performance | 🔒 VPN |
| **Dozzle** | Live Docker log viewer | 🔒 VPN |
| **Watchtower** | Auto-updates Docker containers | 🔒 VPN |

### Home Automation

| Service | What it does | Access |
|---|---|---|
| **Home Assistant** | King of home automation | 🔒 VPN |
| **Node-RED** | Visual automation flows | 🔒 VPN |

### Dev & Productivity

| Service | What it does | Access |
|---|---|---|
| **Gitea / Forgejo** | Self-hosted GitHub | 🔒 VPN |
| **Portainer** | Docker container GUI manager | 🔒 VPN |
| **Homepage** | Clean homelab dashboard with widgets | 🔒 VPN |
| **Wiki.js / BookStack** | Personal knowledge base / wiki | 🔒 VPN |
| **Stirling-PDF** | All-in-one self-hosted PDF tools | 🔒 VPN |
| **IT-Tools** | 100+ developer utility tools in one app | 🔒 VPN |

---

## Ubuntu Server
> i7-9700K · 32GB RAM · 1TB NVMe · GTX 1070 Ti

### Media Server

| Service | What it does | Access |
|---|---|---|
| **Plex** | Media streaming — reads from IBM via NFS, transcodes via NVENC | 🌐 Public — `plex.srng.no` |

### Photos

| Service | What it does | Access |
|---|---|---|
| **Immich** | Self-hosted Google Photos with GPU-accelerated AI face detection | 🔒 VPN |

### AI & LLMs

| Service | What it does | Access |
|---|---|---|
| **llama.cpp + llama-server** | Raw LLM inference, max performance from 8GB VRAM | 🔒 VPN |
| **Open WebUI** | Beautiful ChatGPT-like UI for llama.cpp | 🔒 VPN |
| **Stable Diffusion (Automatic1111)** | Local AI image generation | 🔒 VPN |

### Dev

| Service | What it does | Access |
|---|---|---|
| **code-server** | VS Code in the browser | 🔒 VPN |

---

## Raspberry Pi 4B
> ARM Cortex-A72 · 4–8GB RAM · Always on, low power

| Service | What it does | Access |
|---|---|---|
| **Pi-hole / AdGuard Home** | Network-wide ad & tracker blocking | 🔒 VPN |
| **Unbound** | Recursive DNS resolver — pairs with Pi-hole | 🔒 VPN |
| **Mosquitto** | MQTT broker for IoT devices | 🔒 VPN |
| **Zigbee2MQTT** | Zigbee device controller | 🔒 VPN |

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
