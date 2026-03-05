# 🏠 Homelab Build Roadmap

> **3–4 hours per day · 14 days · Full build from zero to complete.**

---

## 📋 Overview

| Days | Phase | Focus |
|---|---|---|
| Day 1 | Foundation | OS, Docker, ZFS |
| Day 2 | Networking | DNS, Proxy, SSL |
| Day 3 | VPN | NetBird Mesh VPN |
| Day 4 | Security | Vaultwarden, Authelia, CrowdSec |
| Day 5 | Media Backend | NFS + Full *arr Stack |
| Day 6 | Media Frontend | Plex + Overseerr |
| Day 7 | Personal Cloud | Nextcloud, Files, Documents |
| Day 8 | Photos & Music | Immich, Navidrome, Audiobookshelf |
| Day 9 | Monitoring | Grafana, Prometheus, Uptime Kuma |
| Day 10 | Home Automation | Home Assistant, IoT, MQTT |
| Day 11 | Dev & Productivity | Gitea, code-server, Wiki, Dashboard |
| Day 12 | AI | llama.cpp, Open WebUI, Stable Diffusion |
| Day 13 | Cleanup | Remaining services, docs, repo |
| Day 14 | Hardening | Backups, testing, final checks |

---

## 🟦 Day 1 — OS, Docker & Storage
> Lay the foundation on all three machines.

**Goals:** All machines Docker-ready, IBM has a working ZFS pool.

- [ ] Install Docker + Docker Compose on IBM Server
- [ ] Install Docker + Docker Compose on Ubuntu Server
- [ ] Install Docker on Raspberry Pi 4B
- [ ] Create folder structure on IBM
  ```
  /data/
  ├── media/
  ├── downloads/
  ├── music/
  ├── books/
  ├── photos/
  ├── config/
  └── appdata/
  ```
- [ ] Plan + set up ZFS pool on IBM (RAID-Z2 across 8x SSDs)

---

## 🟦 Day 2 — Networking, DNS & Proxy
> Get the network layer solid before anything else.

**Goals:** DNS is clean, SSL is working, Pi-hole is blocking ads network-wide.

- [ ] Deploy Pi-hole + Unbound on Pi 4B
- [ ] Point all local devices to Pi-hole as DNS
- [ ] Point `srng.no` to your public IP at your DNS registrar
- [ ] Create wildcard `*.srng.no` DNS record
- [ ] Deploy Nginx Proxy Manager on IBM
- [ ] Get wildcard SSL cert via Let's Encrypt in NPM
- [ ] Test a placeholder service behind NPM with a real subdomain

---

## 🟦 Day 3 — NetBird VPN
> Lock everything down before exposing any services.

**Goals:** Full mesh VPN running, all machines connected, VPN-only enforcement in place.

- [ ] Deploy NetBird management server on IBM
- [ ] Set up identity provider (Zitadel self-hosted or NetBird Cloud free tier to start)
- [ ] Enroll IBM into NetBird
- [ ] Enroll Ubuntu Server into NetBird
- [ ] Enroll Raspberry Pi 4B into NetBird
- [ ] Enroll personal devices (phone, laptop)
- [ ] Test connectivity between all nodes over VPN
- [ ] Configure NPM so VPN-only services are unreachable without NetBird

> 💡 **Tip:** If Zitadel is taking too long, start with NetBird Cloud free tier and migrate to self-hosted IBM later. Saves 1–2 hours.

---

## 🟦 Day 4 — Security Stack
> Passwords, auth, and threat protection before any personal data goes in.

**Goals:** Passwords safe, SSO working, brute force protection active.

- [ ] Deploy Vaultwarden on IBM → `vault.srng.no` 🔒
- [ ] Migrate all passwords into Vaultwarden
- [ ] Install Bitwarden app on all personal devices
- [ ] Deploy Authelia on IBM
- [ ] Integrate Authelia with Nginx Proxy Manager
- [ ] Deploy CrowdSec on IBM + configure NPM bouncer
- [ ] Test SSO login flow end to end

> 💡 **Tip:** If Authelia config is taking too long, use NPM's built-in basic auth as a temporary measure and come back to Authelia later.

---

## 🟦 Day 5 — NFS & Media Stack
> Get the *arr stack running locally next to the storage.

**Goals:** Full *arr stack running, NFS mounted on Ubuntu, downloads go straight to IBM storage.

- [ ] Configure NFS server on IBM, export `/data/media` and `/data/downloads`
- [ ] Mount NFS share on Ubuntu, test read/write speeds
- [ ] Deploy Prowlarr on IBM
- [ ] Deploy Radarr on IBM → connect to Prowlarr
- [ ] Deploy Sonarr on IBM → connect to Prowlarr
- [ ] Deploy Lidarr on IBM → connect to Prowlarr
- [ ] Deploy Readarr on IBM → connect to Prowlarr
- [ ] Deploy qBittorrent on IBM → connect to all *arrs
- [ ] Deploy Bazarr on IBM → connect to Radarr + Sonarr
- [ ] Configure all download paths to IBM local ZFS storage

---

## 🟦 Day 6 — Plex & Overseerr
> The payoff day — get media streaming working.

**Goals:** Plex streaming publicly, NVENC transcoding active, full media request pipeline working.

- [ ] Deploy Plex on Ubuntu → point library at NFS mount from IBM
- [ ] Install NVIDIA drivers on Ubuntu (if not already installed)
- [ ] Enable NVENC hardware transcoding in Plex
- [ ] Expose `plex.srng.no` publicly via NPM 🌐
- [ ] Test remote playback from phone, verify NVENC is active
- [ ] Deploy Overseerr on IBM → connect to Radarr + Sonarr
- [ ] Expose `request.srng.no` publicly via NPM 🌐
- [ ] Test full pipeline: request in Overseerr → Radarr downloads → Plex picks it up

---

## 🟦 Day 7 — Personal Cloud & Files
> Replace Google Drive and get documents under control.

**Goals:** Personal cloud live, documents managed, file sync running.

- [ ] Deploy Nextcloud on IBM → storage on ZFS pool
- [ ] Expose `cloud.srng.no` via NPM 🔒
- [ ] Configure Nextcloud email, calendar, and contacts apps
- [ ] Deploy Paperless-ngx on IBM
- [ ] Expose `paper.srng.no` via NPM 🔒
- [ ] Deploy Syncthing on IBM → set up sync on personal devices
- [ ] Deploy Filebrowser on IBM
- [ ] Expose `files.srng.no` via NPM 🔒
- [ ] Start migrating files from Google Drive into Nextcloud

---

## 🟦 Day 8 — Photos & Music
> Get your media out of Google Photos and Spotify.

**Goals:** Google Photos replaced, Spotify replaced, audiobooks streaming.

- [ ] Deploy Immich on Ubuntu (GPU-accelerated ML)
- [ ] Point Immich library at IBM NFS photo mount
- [ ] Expose `photos.srng.no` via NPM 🔒
- [ ] Start photo migration from Google Photos into Immich
- [ ] Deploy Navidrome on IBM → point at music library on ZFS
- [ ] Expose `music.srng.no` publicly via NPM 🌐
- [ ] Deploy Audiobookshelf on IBM
- [ ] Expose `books.srng.no` publicly via NPM 🌐
- [ ] Install Symfonium or Tempo on phone → connect to Navidrome

---

## 🟦 Day 9 — Monitoring & Observability
> Know exactly what every machine is doing at all times.

**Goals:** Full observability stack — dashboards, alerts, live logs, auto-updates.

- [ ] Deploy Prometheus on IBM
- [ ] Deploy Grafana on IBM → connect to Prometheus
- [ ] Expose `monitor.srng.no` via NPM 🔒
- [ ] Install Node Exporter on IBM, Ubuntu, and Pi
- [ ] Import Node Exporter Full dashboard in Grafana *(Dashboard ID: 1860)*
- [ ] Deploy Uptime Kuma on IBM → add all running services
- [ ] Expose `status.srng.no` via NPM 🔒
- [ ] Deploy Netdata on IBM + Ubuntu
- [ ] Deploy Dozzle on IBM
- [ ] Deploy Watchtower on IBM (auto-updates all containers)
- [ ] Configure alert notifications in Uptime Kuma (email or Telegram)

---

## 🟦 Day 10 — Home Automation & IoT
> Make the house smart.

**Goals:** Home Assistant live, IoT devices connected, first automations running.

- [ ] Deploy Home Assistant on IBM
- [ ] Expose `home.srng.no` via NPM 🔒
- [ ] Deploy Mosquitto MQTT broker on Pi 4B
- [ ] Deploy Zigbee2MQTT on Pi 4B *(if you have Zigbee devices)*
- [ ] Connect Zigbee2MQTT to Home Assistant via MQTT
- [ ] Deploy Node-RED on IBM → connect to Home Assistant
- [ ] Add first smart devices to Home Assistant
- [ ] Build first automation in Node-RED or HA automations

---

## 🟦 Day 11 — Dev Tools & Productivity
> Your personal GitHub, IDE, wiki, and dashboard.

**Goals:** Full dev environment, self-hosted GitHub, knowledge base, and dashboard live.

- [ ] Deploy Portainer on IBM
- [ ] Expose `docker.srng.no` via NPM 🔒
- [ ] Deploy Gitea / Forgejo on IBM
- [ ] Expose `git.srng.no` via NPM 🔒
- [ ] Push your homelab repo to self-hosted Gitea
- [ ] Deploy Wiki.js or BookStack on IBM
- [ ] Expose `docs.srng.no` via NPM 🔒
- [ ] Deploy Stirling-PDF on IBM
- [ ] Deploy IT-Tools on IBM
- [ ] Deploy Homepage dashboard on IBM → add widgets for all services
- [ ] Expose `dash.srng.no` via NPM 🔒
- [ ] Deploy code-server on Ubuntu
- [ ] Expose `code.srng.no` via NPM 🔒

---

## 🟦 Day 12 — AI Stack
> Put that GTX 1070 Ti to work.

**Goals:** Local AI chat and image generation running on your own GPU.

- [ ] Install CUDA toolkit on Ubuntu *(if not done on Day 6)*
- [ ] Build llama.cpp from source with CUDA support
  > 💡 **Shortcut:** Use `ghcr.io/ggerganov/llama.cpp:server-cuda` Docker image to skip the build entirely.
- [ ] Download first model — Mistral 7B Q4_K_M *(fits perfectly in 8GB VRAM, ~4–5GB download)*
- [ ] Start llama-server, test inference via curl
- [ ] Tune GPU layer offloading (`-ngl` flag) for max VRAM usage
- [ ] Deploy Open WebUI → connect to llama-server
- [ ] Expose `ai.srng.no` via NPM 🔒
- [ ] Install Automatic1111 Stable Diffusion on Ubuntu
- [ ] Expose `draw.srng.no` via NPM 🔒
- [ ] Test image generation, confirm GPU is being used

---

## 🟦 Day 13 — Remaining Services & Cleanup
> Fill in the last services and tidy everything up.

**Goals:** Every service deployed, repo up to date, everything documented.

- [ ] Deploy Calibre-Web on IBM → point at ebook library
- [ ] Deploy Kavita on IBM → point at comics/manga library
- [ ] Deploy Beets on IBM → run auto-tagger on music library
- [ ] Review all running containers in Portainer — remove anything unused
- [ ] Review all NPM proxy hosts — confirm VPN-only services are locked
- [ ] Update all Docker Compose files in your homelab repo
- [ ] Commit and push everything to Gitea
- [ ] Document any quirks or config notes in Wiki.js

---

## 🟦 Day 14 — Hardening, Backups & Final Testing
> Make sure everything is bulletproof before calling it done.

**Goals:** Homelab fully built, hardened, backed up, and battle-tested.

- [ ] Set up ZFS snapshot schedule on IBM
- [ ] Configure off-site backup (Backblaze B2 + Restic or Duplicati)
- [ ] Reboot IBM → verify all containers come back up cleanly
- [ ] Reboot Ubuntu → verify Plex + GPU services recover
- [ ] Test NetBird from outside your network (phone on 4G)
- [ ] Test Plex remote playback from outside network
- [ ] Go through every subdomain — verify public ones load, VPN-only ones are blocked
- [ ] Final commit — update `ROADMAP.md` with notes from the build

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
- [Individual Service Docs](./apps/)
