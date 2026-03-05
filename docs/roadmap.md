# 🏠 Homelab Build Roadmap

> **3–4 hours per day · 14 days · Full build from zero to complete.**

---

## 📋 Overview

| Days | Phase | Focus |
|---|---|---|
| Day 1 | Foundation | OS, Docker, ZFS |
| Day 2 | Networking | DNS, Proxy, SSL, [Homepage](apps/homepage.md) dashboard |
| Day 3 | VPN | [NetBird](apps/netbird.md) Mesh VPN |
| Day 4 | Security | [Vaultwarden](apps/vaultwarden.md), [Authelia](apps/authelia.md), [CrowdSec](apps/crowdsec.md) |
| Day 5 | Media Backend | NFS + Full *arr Stack |
| Day 6 | Media Frontend | [Plex](apps/plex.md) + [Overseerr](apps/overseerr.md) |
| Day 7 | Personal Cloud | [Nextcloud](apps/nextcloud.md), Files, Documents |
| Day 8 | Photos & Music | [Immich](apps/immich.md), [Navidrome](apps/navidrome.md), [Audiobookshelf](apps/audiobookshelf.md) |
| Day 9 | Monitoring | [Grafana](apps/grafana.md), [Prometheus](apps/prometheus.md), [Uptime Kuma](apps/uptime-kuma.md) |
| Day 10 | Home Automation | [Home Assistant](apps/home-assistant.md), IoT, MQTT |
| Day 11 | Dev & Productivity | [Forgejo](apps/forgejo.md), [code-server](apps/code-server.md), Wiki |
| Day 12 | AI | [llama.cpp](apps/llama-cpp.md), [Open WebUI](apps/open-webui.md), [Stable Diffusion](apps/stable-diffusion.md) |
| Day 13 | Cleanup | Remaining services, docs, repo |
| Day 14 | Hardening | Backups, testing, final checks |
| Day 15 | Game Hosting | Arctichost.no — panel, Wings, game servers |

---

## 🟦 Day 1 — OS, Docker & Storage
> Lay the foundation on all three machines.

**Goals:** All machines Docker-ready, IBM has a working ZFS pool, Proxmox VMs created.

### Proxmox VM Setup

Before installing anything, create the VMs that will host your services:

| VM | Name | OS | Resources (suggested) | Purpose |
|---|---|---|---|---|
| VM01 | `docker` | Ubuntu 22.04 LTS | 24 cores, 300GB RAM | All personal Docker services |
| VM02 | `haos` | Home Assistant OS | 4 cores, 8GB RAM | Home Assistant |
| VM03 | `gameservers` | Ubuntu 22.04 LTS | Remainder | Wings + game server containers |

- [ ] **[IBM/Proxmox]** Plan + set up ZFS pool (RAID-Z2 across 8x SSDs) → [ZFS Setup Guide](guides/zfs.md)
- [ ] **[IBM/Proxmox]** Create `docker` VM in Proxmox (Ubuntu 22.04, static IP)
- [ ] **[IBM/Proxmox]** Create `haos` VM in Proxmox ([HAOS image](https://www.home-assistant.io/installation/alternative))
- [ ] **[IBM/Proxmox]** Create `gameservers` VM in Proxmox (Ubuntu 22.04, static IP)
- [ ] **[IBM/Proxmox]** Add ZFS dataset bind mounts to `docker` and `gameservers` VMs

### Docker & Storage

- [ ] **[IBM/docker VM]** Install Docker + Docker Compose on docker VM
- [ ] **[Ubuntu]** Install Docker + Docker Compose on Ubuntu Server
- [ ] **[Pi]** Install Docker on Raspberry Pi 4B
- [ ] **[Ubuntu]** Install NVIDIA drivers on Ubuntu Server *(dependency for Day 6 Plex + Day 12 AI)* → [NVIDIA Setup Guide](guides/nvidia.md)
  ```bash
  sudo apt install -y nvidia-driver-535
  sudo reboot
  nvidia-smi  # verify
  ```
- [ ] **[IBM/docker VM]** Create folder structure on docker VM
  ```
  /data/
  ├── media/
  ├── downloads/
  ├── music/
  ├── books/
  ├── photos/
  ├── config/
  ├── appdata/
  └── gameservers/   ← ZFS dataset for game server data
  ```

---

## 🟦 Day 2 — Networking, DNS & Proxy
> Get the network layer solid before anything else.

**Goals:** DNS is clean, SSL is working, [Pi-hole](apps/pi-hole.md) is blocking ads network-wide, public services are behind Cloudflare Tunnel.

- [ ] **[Pi]** Deploy [Pi-hole](apps/pi-hole.md) + [Unbound](apps/unbound.md) on Pi 4B
- [ ] Point all local devices to Pi-hole as DNS
- [ ] Add your domain to Cloudflare (set nameservers at your registrar)
- [ ] Create wildcard `*.srng.no` DNS record in Cloudflare
- [ ] **[IBM/docker VM]** Deploy [Nginx Proxy Manager](apps/nginx-proxy-manager.md) on IBM
- [ ] Get wildcard SSL cert via Let's Encrypt in NPM
- [ ] Test a placeholder service behind NPM with a real subdomain
- [ ] **[IBM/docker VM]** Deploy [Cloudflare Tunnel](apps/cloudflare-tunnel.md) on IBM
- [ ] Add public hostnames in tunnel dashboard for Overseerr, Navidrome, Audiobookshelf

### Dashboard & Container Management

- [ ] **[IBM/docker VM]** Deploy [Portainer](apps/portainer.md) → expose `docker.srng.no` via NPM 🔒
- [ ] **[IBM/docker VM]** Deploy [Homepage](apps/homepage.md) dashboard → expose `dash.srng.no` via NPM 🔒
  - Add widgets for Pi-hole, NPM, and any other services already running
  - Add new widgets each day as services come online

---

## 🟦 Day 3 — [NetBird](apps/netbird.md) VPN
> Lock everything down before exposing any services.

**Goals:** Full mesh VPN running, all machines connected, VPN-only enforcement in place.

- [ ] **[IBM/docker VM]** Deploy [NetBird](apps/netbird.md) management server on IBM
- [ ] Set up identity provider (Zitadel self-hosted or NetBird Cloud free tier to start)
- [ ] **[IBM]** Enroll IBM into NetBird
- [ ] **[Ubuntu]** Enroll Ubuntu Server into NetBird
- [ ] **[Pi]** Enroll Raspberry Pi 4B into NetBird
- [ ] Enroll personal devices (phone, laptop)
- [ ] Test connectivity between all nodes over VPN
- [ ] Configure NPM so VPN-only services are unreachable without NetBird

> 💡 **Tip:** If Zitadel is taking too long, start with NetBird Cloud free tier and migrate to self-hosted IBM later. Saves 1–2 hours.

---

## 🟦 Day 4 — Security Stack
> Passwords, auth, and threat protection before any personal data goes in.

**Goals:** Passwords safe, SSO working, brute force protection active.

- [ ] **[IBM/docker VM]** Deploy [Vaultwarden](apps/vaultwarden.md) on IBM → `vault.srng.no` 🔒
- [ ] Migrate all passwords into Vaultwarden
- [ ] Install Bitwarden app on all personal devices
- [ ] **[IBM/docker VM]** Deploy [Authelia](apps/authelia.md) on IBM
- [ ] **[IBM/docker VM]** Integrate Authelia with [Nginx Proxy Manager](apps/nginx-proxy-manager.md)
- [ ] **[IBM/docker VM]** Deploy [CrowdSec](apps/crowdsec.md) on IBM + configure NPM bouncer
- [ ] Test SSO login flow end to end

> 💡 **Tip:** If Authelia config is taking too long, use NPM's built-in basic auth as a temporary measure and come back to Authelia later.

---

## 🟦 Day 5 — NFS & Media Stack
> Get the *arr stack running locally next to the storage.

**Goals:** Full *arr stack running, NFS mounted on Ubuntu, downloads go straight to IBM storage.

- [ ] **[IBM/Proxmox]** Configure NFS server on Proxmox host, export `/data/media` and `/data/downloads` → [NFS Setup Guide](guides/nfs.md)
- [ ] **[Ubuntu]** Mount NFS share on Ubuntu, test read/write speeds → [NFS Client Setup](guides/nfs.md#client-side-ubuntu-server)
- [ ] **[IBM/docker VM]** Deploy [Prowlarr](apps/prowlarr.md) on IBM
- [ ] **[IBM/docker VM]** Deploy [Radarr](apps/radarr.md) on IBM → connect to Prowlarr
- [ ] **[IBM/docker VM]** Deploy [Sonarr](apps/sonarr.md) on IBM → connect to Prowlarr
- [ ] **[IBM/docker VM]** Deploy [Lidarr](apps/lidarr.md) on IBM → connect to Prowlarr
- [ ] **[IBM/docker VM]** Deploy [Readarr](apps/readarr.md) on IBM → connect to Prowlarr
- [ ] **[IBM/docker VM]** Deploy [qBittorrent](apps/qbittorrent.md) on IBM → connect to all *arrs
- [ ] **[IBM/docker VM]** Deploy [Bazarr](apps/bazarr.md) on IBM → connect to Radarr + Sonarr
- [ ] **[IBM]** Configure all download paths to IBM local ZFS storage

---

## 🟦 Day 6 — [Plex](apps/plex.md) & [Overseerr](apps/overseerr.md)
> The payoff day — get media streaming working.

**Goals:** Plex streaming publicly, NVENC transcoding active, full media request pipeline working.

- [ ] **[Ubuntu]** Deploy [Plex](apps/plex.md) on Ubuntu → point library at NFS mount from IBM
- [ ] **[Ubuntu]** Install NVIDIA drivers on Ubuntu (if not already installed)
- [ ] Enable NVENC hardware transcoding in Plex
- [ ] Expose `plex.srng.no` publicly via NPM 🌐
- [ ] Test remote playback from phone, verify NVENC is active
- [ ] **[IBM/docker VM]** Deploy [Overseerr](apps/overseerr.md) on IBM → connect to [Radarr](apps/radarr.md) + [Sonarr](apps/sonarr.md)
- [ ] Expose `request.srng.no` via Cloudflare Tunnel 🌐 *(already configured on Day 2)*
- [ ] Test full pipeline: request in Overseerr → Radarr downloads → Plex picks it up

---

## 🟦 Day 7 — Personal Cloud & Files
> Replace Google Drive and get documents under control.

**Goals:** Personal cloud live, documents managed, file sync running.

- [ ] **[IBM/docker VM]** Deploy [Nextcloud](apps/nextcloud.md) on IBM → storage on ZFS pool
- [ ] Expose `cloud.srng.no` via NPM 🔒
- [ ] Configure Nextcloud email, calendar, and contacts apps
- [ ] **[IBM]** Deploy [Paperless-ngx](apps/paperless-ngx.md) on IBM
- [ ] Expose `paper.srng.no` via NPM 🔒
- [ ] **[IBM]** Deploy [Syncthing](apps/syncthing.md) on IBM → set up sync on personal devices
- [ ] **[IBM]** Deploy [Filebrowser](apps/filebrowser.md) on IBM
- [ ] Expose `files.srng.no` via NPM 🔒
- [ ] Start migrating files from Google Drive into Nextcloud

---

## 🟦 Day 8 — Photos & Music
> Get your media out of Google Photos and Spotify.

**Goals:** Google Photos replaced, Spotify replaced, audiobooks streaming.

- [ ] **[Ubuntu]** Deploy [Immich](apps/immich.md) on Ubuntu (GPU-accelerated ML)
- [ ] **[Ubuntu]** Point Immich library at IBM NFS photo mount
- [ ] Expose `photos.srng.no` via NPM 🔒
- [ ] Start photo migration from Google Photos into Immich
- [ ] **[IBM/docker VM]** Deploy [Navidrome](apps/navidrome.md) on IBM → point at music library on ZFS
- [ ] Expose `music.srng.no` via Cloudflare Tunnel 🌐 *(already configured on Day 2)*
- [ ] **[IBM/docker VM]** Deploy [Audiobookshelf](apps/audiobookshelf.md) on IBM
- [ ] Expose `books.srng.no` via Cloudflare Tunnel 🌐 *(already configured on Day 2)*
- [ ] Install Symfonium or Tempo on phone → connect to Navidrome

---

## 🟦 Day 9 — Monitoring & Observability
> Know exactly what every machine is doing at all times.

**Goals:** Full observability stack — dashboards, alerts, live logs, auto-updates.

- [ ] **[IBM/docker VM]** Deploy [Prometheus](apps/prometheus.md) on IBM
- [ ] **[IBM/docker VM]** Deploy [Grafana](apps/grafana.md) on IBM → connect to Prometheus
- [ ] Expose `monitor.srng.no` via NPM 🔒
- [ ] Install Node Exporter on IBM, Ubuntu, and Pi
- [ ] Import Node Exporter Full dashboard in Grafana *(Dashboard ID: 1860)*
- [ ] **[IBM/docker VM]** Deploy [Uptime Kuma](apps/uptime-kuma.md) on IBM → add all running services
- [ ] Expose `status.srng.no` via NPM 🔒
- [ ] Deploy [Netdata](apps/netdata.md) on IBM + Ubuntu
- [ ] **[IBM]** Deploy [Dozzle](apps/dozzle.md) on IBM
- [ ] **[IBM]** Deploy [Watchtower](apps/watchtower.md) on IBM (auto-updates all containers)
- [ ] Configure alert notifications in Uptime Kuma (email or Telegram)

---

## 🟦 Day 10 — Home Automation & IoT
> Make the house smart.

**Goals:** [Home Assistant](apps/home-assistant.md) live, IoT devices connected, first automations running.

- [ ] **[IBM/haos VM]** Deploy [Home Assistant](apps/home-assistant.md) (HAOS VM)
- [ ] Expose `home.srng.no` via NPM 🔒
- [ ] **[Pi]** Deploy [Mosquitto](apps/mosquitto.md) MQTT broker on Pi 4B
- [ ] **[Pi]** Deploy [Zigbee2MQTT](apps/zigbee2mqtt.md) on Pi 4B *(if you have Zigbee devices)*
- [ ] Connect Zigbee2MQTT to Home Assistant via MQTT
- [ ] **[IBM/docker VM]** Deploy [Node-RED](apps/node-red.md) on IBM → connect to Home Assistant
- [ ] Add first smart devices to Home Assistant
- [ ] Build first automation in Node-RED or HA automations

---

## 🟦 Day 11 — Dev Tools & Productivity
> Your personal GitHub, IDE, and wiki.

**Goals:** Full dev environment, self-hosted GitHub, and knowledge base live.

- [ ] **[IBM/docker VM]** Deploy [Forgejo](apps/forgejo.md) on IBM
- [ ] Expose `git.srng.no` via NPM 🔒
- [ ] Push your homelab repo to self-hosted Forgejo
- [ ] **[IBM/docker VM]** Deploy [Wiki.js](apps/wiki-js.md) on IBM
- [ ] Expose `docs.srng.no` via NPM 🔒
- [ ] **[IBM/docker VM]** Deploy [Stirling-PDF](apps/stirling-pdf.md) on IBM
- [ ] **[IBM/docker VM]** Deploy [IT-Tools](apps/it-tools.md) on IBM
- [ ] **[Ubuntu]** Deploy [code-server](apps/code-server.md) on Ubuntu
- [ ] Expose `code.srng.no` via NPM 🔒
- [ ] Add new widgets to [Homepage](apps/homepage.md) for all Day 11 services

---

## 🟦 Day 12 — AI Stack
> Put that GTX 1070 Ti to work.

**Goals:** Local AI chat and image generation running on your own GPU.

- [ ] **[Ubuntu]** Install CUDA toolkit on Ubuntu *(if not done on Day 6)*
- [ ] **[Ubuntu]** Build [llama.cpp](apps/llama-cpp.md) from source with CUDA support
  > 💡 **Shortcut:** Use `ghcr.io/ggerganov/llama.cpp:server-cuda` Docker image to skip the build entirely.
- [ ] **[Ubuntu]** Download first model — Mistral 7B Q4_K_M *(fits perfectly in 8GB VRAM, ~4–5GB download)*
- [ ] **[Ubuntu]** Start llama-server, test inference via curl
- [ ] **[Ubuntu]** Tune GPU layer offloading (`-ngl` flag) for max VRAM usage
- [ ] **[Ubuntu]** Deploy [Open WebUI](apps/open-webui.md) → connect to llama-server
- [ ] Expose `ai.srng.no` via NPM 🔒
- [ ] **[Ubuntu]** Install Automatic1111 [Stable Diffusion](apps/stable-diffusion.md) on Ubuntu
- [ ] Expose `draw.srng.no` via NPM 🔒
- [ ] Test image generation, confirm GPU is being used

---

## 🟦 Day 13 — Remaining Services & Cleanup
> Fill in the last services and tidy everything up.

**Goals:** Every service deployed, repo up to date, everything documented.

- [ ] **[IBM/docker VM]** Deploy [Calibre-Web](apps/calibre-web.md) on IBM → point at ebook library
- [ ] **[IBM/docker VM]** Deploy [Kavita](apps/kavita.md) on IBM → point at comics/manga library
- [ ] **[IBM/docker VM]** Deploy [Beets](apps/beets.md) on IBM → run auto-tagger on music library
- [ ] Review all running containers in [Portainer](apps/portainer.md) — remove anything unused
- [ ] Review all NPM proxy hosts — confirm VPN-only services are locked
- [ ] Update all Docker Compose files in your homelab repo
- [ ] Commit and push everything to [Forgejo](apps/forgejo.md)
- [ ] Document any quirks or config notes in [Wiki.js](apps/wiki-js.md)

---

## 🟦 Day 14 — Hardening, Backups & Final Testing
> Make sure everything is bulletproof before calling it done.

**Goals:** Homelab fully built, hardened, backed up, and battle-tested.

- [ ] **[IBM/Proxmox]** Set up ZFS snapshot schedule
- [ ] **[IBM/docker VM]** Configure off-site backup (Backblaze B2 + [Restic](apps/restic.md))
- [ ] **[IBM/docker VM]** Reboot IBM → verify all containers come back up cleanly
- [ ] **[Ubuntu]** Reboot Ubuntu → verify [Plex](apps/plex.md) + GPU services recover
- [ ] Test [NetBird](apps/netbird.md) from outside your network (phone on 4G)
- [ ] Test Plex remote playback from outside network
- [ ] Go through every subdomain — verify public ones load, VPN-only ones are blocked
- [ ] Final commit — update `ROADMAP.md` with notes from the build

---

## 🟩 Day 15 — Game Hosting (Arctichost.no)
> Stand up the commercial game hosting infrastructure. Fully isolated from personal services.

**Goals:** Game panel live, Wings node connected, first game server deployed and reachable by players.

**Prerequisites:** Day 1 (ZFS, Docker), Day 2 (NPM for panel web UI), Day 3 (NetBird for internal node communication).

### Proxmox VM Setup

- [ ] **[IBM/Proxmox]** Create `gameservers` VM in Proxmox
  - Ubuntu 22.04 LTS, static LAN IP
  - Allocate resources based on expected slots (e.g. 24 cores, 200GB RAM to start)
  - Keep separate from `docker` VM — no shared networks with personal services
- [ ] **[IBM/Proxmox]** Create ZFS dataset for game server data
  ```bash
  zfs create data/gameservers
  zfs create data/gameservers/volumes
  zfs create data/gameservers/backups
  ```
- [ ] **[IBM/Proxmox]** Add ZFS bind mounts to `gameservers` VM config in Proxmox

### Panel Installation

- [ ] **[IBM/docker VM]** Deploy [Pelican Panel](apps/pelican.md)
- [ ] **[IBM/docker VM]** Expose `panel.arctichost.no` via NPM 🌐

### Wings / Node Setup

- [ ] **[IBM/gameservers VM]** Install Docker on `gameservers` VM
  ```bash
  curl -sSL https://get.docker.com/ | CHANNEL=stable bash
  sudo systemctl enable --now docker
  ```
- [ ] **[IBM/gameservers VM]** Install and configure [Wings](apps/wings.md) daemon
- [ ] **[IBM/gameservers VM]** Add `gameservers` VM as a Node in the Panel
- [ ] **[IBM/gameservers VM]** Verify Panel ↔ Wings connection (green heartbeat in admin)

### Network Configuration

- [ ] Configure port forwarding on router — forward game port ranges to `gameservers` VM LAN IP:
  - `25565–25600` TCP/UDP → Minecraft Java
  - `19132–19160` UDP → Minecraft Bedrock
  - `27015–27060` TCP/UDP → Steam games (CS2, Rust, etc.)
  - `2456–2480` UDP → Valheim
  - `7777–7810` UDP → Palworld, ARK, Conan
  - `25444–25460` UDP → Satisfactory
- [ ] Add all port ranges as **Allocations** in the Panel (Admin → Nodes → Allocations)
- [ ] Test that a game port is reachable from outside the network

### Game Eggs / Templates

- [ ] Import community game eggs into the Panel from [github.com/parkervcp/eggs](https://github.com/parkervcp/eggs)
- [ ] Import eggs for your initial supported game list
- [ ] Test egg install (create a test server, run through install wizard)

### First Test Server

- [ ] **[IBM/gameservers VM]** Create first game server in the Panel (e.g. Minecraft Java)
- [ ] Start the server, check Wings console for errors
- [ ] Connect from an external network (phone on 4G) — verify it works
- [ ] Test player connectivity, check latency from Norway

### Backups

- [ ] **[IBM/Proxmox]** Set up ZFS snapshot schedule for `data/gameservers`
  ```bash
  # Example: daily snapshots, keep 7 days
  zfs snapshot data/gameservers@$(date +%Y%m%d)
  ```
- [ ] Configure Wings backup driver (local or Backblaze B2 — see [Wings docs](apps/wings.md#backups))
- [ ] Test a manual backup from the Panel, then restore it

### DDoS & Security

- [ ] Confirm `gameservers` VM has no access to personal service network (firewall rules)
- [ ] Ask ISP about upstream DDoS filtering options
- [ ] *(Optional)* Route game traffic through a DDoS-protected relay or proxy if needed
- [ ] Set per-server resource limits (CPU, RAM, disk) so one customer can't starve others

### Billing *(Future)*

- [ ] *(Planned)* Set up billing panel (WHMCS / Blesta / Stripe) — see [Game Hosting overview](services/gamehosting.md#billing--customer-portal)

---

## 🔑 Access Legend

| Icon | Meaning |
|---|---|
| 🌐 | Public — accessible from anywhere |
| 🔒 | VPN only — requires NetBird connection |

---

## 📚 Related Documentation

- [Hardware Specifications](./HARDWARE.md)
- [Services Overview](./SERVICES.md)
- [Getting Started Guides](./GETTING-STARTED.md)
- [Individual Service Docs](apps/)
