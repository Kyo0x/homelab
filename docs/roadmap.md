# 🏠 Homelab Build Roadmap

> **3–4 hours per day · 14 days · Full build from zero to complete.**

---

## 📋 Overview

| Days | Phase | Focus |
|---|---|---|
| Day 1 | Foundation | OS, Docker, ZFS |
| Day 2 | Networking | DNS, Proxy, SSL |
| Day 3 | VPN | [NetBird](../apps/netbird.md) Mesh VPN |
| Day 4 | Security | [Vaultwarden](../apps/vaultwarden.md), [Authelia](../apps/authelia.md), [CrowdSec](../apps/crowdsec.md) |
| Day 5 | Media Backend | NFS + Full *arr Stack |
| Day 6 | Media Frontend | [Plex](../apps/plex.md) + [Overseerr](../apps/overseerr.md) |
| Day 7 | Personal Cloud | [Nextcloud](../apps/nextcloud.md), Files, Documents |
| Day 8 | Photos & Music | [Immich](../apps/immich.md), [Navidrome](../apps/navidrome.md), [Audiobookshelf](../apps/audiobookshelf.md) |
| Day 9 | Monitoring | [Grafana](../apps/grafana.md), [Prometheus](../apps/prometheus.md), [Uptime Kuma](../apps/uptime-kuma.md) |
| Day 10 | Home Automation | [Home Assistant](../apps/home-assistant.md), IoT, MQTT |
| Day 11 | Dev & Productivity | [Gitea](../apps/gitea.md), [code-server](../apps/code-server.md), Wiki, Dashboard |
| Day 12 | AI | [llama.cpp](../apps/llama-cpp.md), [Open WebUI](../apps/open-webui.md), [Stable Diffusion](../apps/stable-diffusion.md) |
| Day 13 | Cleanup | Remaining services, docs, repo |
| Day 14 | Hardening | Backups, testing, final checks |

---

## 🟦 Day 1 — OS, Docker & Storage
> Lay the foundation on all three machines.

**Goals:** All machines Docker-ready, IBM has a working ZFS pool.

- [ ] **[IBM]** Install Docker + Docker Compose on IBM Server
- [ ] **[Ubuntu]** Install Docker + Docker Compose on Ubuntu Server
- [ ] **[Pi]** Install Docker on Raspberry Pi 4B
- [ ] **[IBM]** Create folder structure on IBM
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
- [ ] **[IBM]** Plan + set up ZFS pool on IBM (RAID-Z2 across 8x SSDs)

---

## 🟦 Day 2 — Networking, DNS & Proxy
> Get the network layer solid before anything else.

**Goals:** DNS is clean, SSL is working, [Pi-hole](../apps/pi-hole.md) is blocking ads network-wide, public services are behind Cloudflare Tunnel.

- [ ] **[Pi]** Deploy [Pi-hole](../apps/pi-hole.md) + [Unbound](../apps/unbound.md) on Pi 4B
- [ ] Point all local devices to Pi-hole as DNS
- [ ] Add your domain to Cloudflare (set nameservers at your registrar)
- [ ] Create wildcard `*.srng.no` DNS record in Cloudflare
- [ ] **[IBM]** Deploy [Nginx Proxy Manager](../apps/nginx-proxy-manager.md) on IBM
- [ ] Get wildcard SSL cert via Let's Encrypt in NPM
- [ ] Test a placeholder service behind NPM with a real subdomain
- [ ] **[IBM]** Deploy [Cloudflare Tunnel](../apps/cloudflare-tunnel.md) on IBM
- [ ] Add public hostnames in tunnel dashboard for Overseerr, Navidrome, Audiobookshelf

---

## 🟦 Day 3 — [NetBird](../apps/netbird.md) VPN
> Lock everything down before exposing any services.

**Goals:** Full mesh VPN running, all machines connected, VPN-only enforcement in place.

- [ ] **[IBM]** Deploy [NetBird](../apps/netbird.md) management server on IBM
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

- [ ] **[IBM]** Deploy [Vaultwarden](../apps/vaultwarden.md) on IBM → `vault.srng.no` 🔒
- [ ] Migrate all passwords into Vaultwarden
- [ ] Install Bitwarden app on all personal devices
- [ ] **[IBM]** Deploy [Authelia](../apps/authelia.md) on IBM
- [ ] **[IBM]** Integrate Authelia with [Nginx Proxy Manager](../apps/nginx-proxy-manager.md)
- [ ] **[IBM]** Deploy [CrowdSec](../apps/crowdsec.md) on IBM + configure NPM bouncer
- [ ] Test SSO login flow end to end

> 💡 **Tip:** If Authelia config is taking too long, use NPM's built-in basic auth as a temporary measure and come back to Authelia later.

---

## 🟦 Day 5 — NFS & Media Stack
> Get the *arr stack running locally next to the storage.

**Goals:** Full *arr stack running, NFS mounted on Ubuntu, downloads go straight to IBM storage.

- [ ] **[IBM]** Configure NFS server on IBM, export `/data/media` and `/data/downloads`
- [ ] **[Ubuntu]** Mount NFS share on Ubuntu, test read/write speeds
- [ ] **[IBM]** Deploy [Prowlarr](../apps/prowlarr.md) on IBM
- [ ] **[IBM]** Deploy [Radarr](../apps/radarr.md) on IBM → connect to Prowlarr
- [ ] **[IBM]** Deploy [Sonarr](../apps/sonarr.md) on IBM → connect to Prowlarr
- [ ] **[IBM]** Deploy [Lidarr](../apps/lidarr.md) on IBM → connect to Prowlarr
- [ ] **[IBM]** Deploy [Readarr](../apps/readarr.md) on IBM → connect to Prowlarr
- [ ] **[IBM]** Deploy [qBittorrent](../apps/qbittorrent.md) on IBM → connect to all *arrs
- [ ] **[IBM]** Deploy [Bazarr](../apps/bazarr.md) on IBM → connect to Radarr + Sonarr
- [ ] **[IBM]** Configure all download paths to IBM local ZFS storage

---

## 🟦 Day 6 — [Plex](../apps/plex.md) & [Overseerr](../apps/overseerr.md)
> The payoff day — get media streaming working.

**Goals:** Plex streaming publicly, NVENC transcoding active, full media request pipeline working.

- [ ] **[Ubuntu]** Deploy [Plex](../apps/plex.md) on Ubuntu → point library at NFS mount from IBM
- [ ] **[Ubuntu]** Install NVIDIA drivers on Ubuntu (if not already installed)
- [ ] Enable NVENC hardware transcoding in Plex
- [ ] Expose `plex.srng.no` publicly via NPM 🌐
- [ ] Test remote playback from phone, verify NVENC is active
- [ ] **[IBM]** Deploy [Overseerr](../apps/overseerr.md) on IBM → connect to [Radarr](../apps/radarr.md) + [Sonarr](../apps/sonarr.md)
- [ ] Expose `request.srng.no` publicly via NPM 🌐
- [ ] Test full pipeline: request in Overseerr → Radarr downloads → Plex picks it up

---

## 🟦 Day 7 — Personal Cloud & Files
> Replace Google Drive and get documents under control.

**Goals:** Personal cloud live, documents managed, file sync running.

- [ ] **[IBM]** Deploy [Nextcloud](../apps/nextcloud.md) on IBM → storage on ZFS pool
- [ ] Expose `cloud.srng.no` via NPM 🔒
- [ ] Configure Nextcloud email, calendar, and contacts apps
- [ ] **[IBM]** Deploy [Paperless-ngx](../apps/paperless-ngx.md) on IBM
- [ ] Expose `paper.srng.no` via NPM 🔒
- [ ] **[IBM]** Deploy [Syncthing](../apps/syncthing.md) on IBM → set up sync on personal devices
- [ ] **[IBM]** Deploy [Filebrowser](../apps/filebrowser.md) on IBM
- [ ] Expose `files.srng.no` via NPM 🔒
- [ ] Start migrating files from Google Drive into Nextcloud

---

## 🟦 Day 8 — Photos & Music
> Get your media out of Google Photos and Spotify.

**Goals:** Google Photos replaced, Spotify replaced, audiobooks streaming.

- [ ] **[Ubuntu]** Deploy [Immich](../apps/immich.md) on Ubuntu (GPU-accelerated ML)
- [ ] **[Ubuntu]** Point Immich library at IBM NFS photo mount
- [ ] Expose `photos.srng.no` via NPM 🔒
- [ ] Start photo migration from Google Photos into Immich
- [ ] **[IBM]** Deploy [Navidrome](../apps/navidrome.md) on IBM → point at music library on ZFS
- [ ] Expose `music.srng.no` publicly via NPM 🌐
- [ ] **[IBM]** Deploy [Audiobookshelf](../apps/audiobookshelf.md) on IBM
- [ ] Expose `books.srng.no` publicly via NPM 🌐
- [ ] Install Symfonium or Tempo on phone → connect to Navidrome

---

## 🟦 Day 9 — Monitoring & Observability
> Know exactly what every machine is doing at all times.

**Goals:** Full observability stack — dashboards, alerts, live logs, auto-updates.

- [ ] **[IBM]** Deploy [Prometheus](../apps/prometheus.md) on IBM
- [ ] **[IBM]** Deploy [Grafana](../apps/grafana.md) on IBM → connect to Prometheus
- [ ] Expose `monitor.srng.no` via NPM 🔒
- [ ] Install Node Exporter on IBM, Ubuntu, and Pi
- [ ] Import Node Exporter Full dashboard in Grafana *(Dashboard ID: 1860)*
- [ ] **[IBM]** Deploy [Uptime Kuma](../apps/uptime-kuma.md) on IBM → add all running services
- [ ] Expose `status.srng.no` via NPM 🔒
- [ ] Deploy [Netdata](../apps/netdata.md) on IBM + Ubuntu
- [ ] **[IBM]** Deploy [Dozzle](../apps/dozzle.md) on IBM
- [ ] **[IBM]** Deploy [Watchtower](../apps/watchtower.md) on IBM (auto-updates all containers)
- [ ] Configure alert notifications in Uptime Kuma (email or Telegram)

---

## 🟦 Day 10 — Home Automation & IoT
> Make the house smart.

**Goals:** [Home Assistant](../apps/home-assistant.md) live, IoT devices connected, first automations running.

- [ ] **[IBM]** Deploy [Home Assistant](../apps/home-assistant.md) on IBM
- [ ] Expose `home.srng.no` via NPM 🔒
- [ ] **[Pi]** Deploy [Mosquitto](../apps/mosquitto.md) MQTT broker on Pi 4B
- [ ] **[Pi]** Deploy [Zigbee2MQTT](../apps/zigbee2mqtt.md) on Pi 4B *(if you have Zigbee devices)*
- [ ] Connect Zigbee2MQTT to Home Assistant via MQTT
- [ ] **[IBM]** Deploy [Node-RED](../apps/node-red.md) on IBM → connect to Home Assistant
- [ ] Add first smart devices to Home Assistant
- [ ] Build first automation in Node-RED or HA automations

---

## 🟦 Day 11 — Dev Tools & Productivity
> Your personal GitHub, IDE, wiki, and dashboard.

**Goals:** Full dev environment, self-hosted GitHub, knowledge base, and dashboard live.

- [ ] **[IBM]** Deploy [Portainer](../apps/portainer.md) on IBM
- [ ] Expose `docker.srng.no` via NPM 🔒
- [ ] **[IBM]** Deploy [Gitea](../apps/gitea.md) / Forgejo on IBM
- [ ] Expose `git.srng.no` via NPM 🔒
- [ ] Push your homelab repo to self-hosted Gitea
- [ ] **[IBM]** Deploy [Wiki.js](../apps/wiki-js.md) or BookStack on IBM
- [ ] Expose `docs.srng.no` via NPM 🔒
- [ ] **[IBM]** Deploy [Stirling-PDF](../apps/stirling-pdf.md) on IBM
- [ ] **[IBM]** Deploy [IT-Tools](../apps/it-tools.md) on IBM
- [ ] **[IBM]** Deploy [Homepage](../apps/homepage.md) dashboard on IBM → add widgets for all services
- [ ] Expose `dash.srng.no` via NPM 🔒
- [ ] **[Ubuntu]** Deploy [code-server](../apps/code-server.md) on Ubuntu
- [ ] Expose `code.srng.no` via NPM 🔒

---

## 🟦 Day 12 — AI Stack
> Put that GTX 1070 Ti to work.

**Goals:** Local AI chat and image generation running on your own GPU.

- [ ] **[Ubuntu]** Install CUDA toolkit on Ubuntu *(if not done on Day 6)*
- [ ] **[Ubuntu]** Build [llama.cpp](../apps/llama-cpp.md) from source with CUDA support
  > 💡 **Shortcut:** Use `ghcr.io/ggerganov/llama.cpp:server-cuda` Docker image to skip the build entirely.
- [ ] **[Ubuntu]** Download first model — Mistral 7B Q4_K_M *(fits perfectly in 8GB VRAM, ~4–5GB download)*
- [ ] **[Ubuntu]** Start llama-server, test inference via curl
- [ ] **[Ubuntu]** Tune GPU layer offloading (`-ngl` flag) for max VRAM usage
- [ ] **[Ubuntu]** Deploy [Open WebUI](../apps/open-webui.md) → connect to llama-server
- [ ] Expose `ai.srng.no` via NPM 🔒
- [ ] **[Ubuntu]** Install Automatic1111 [Stable Diffusion](../apps/stable-diffusion.md) on Ubuntu
- [ ] Expose `draw.srng.no` via NPM 🔒
- [ ] Test image generation, confirm GPU is being used

---

## 🟦 Day 13 — Remaining Services & Cleanup
> Fill in the last services and tidy everything up.

**Goals:** Every service deployed, repo up to date, everything documented.

- [ ] **[IBM]** Deploy [Calibre-Web](../apps/calibre-web.md) on IBM → point at ebook library
- [ ] **[IBM]** Deploy [Kavita](../apps/kavita.md) on IBM → point at comics/manga library
- [ ] **[IBM]** Deploy [Beets](../apps/beets.md) on IBM → run auto-tagger on music library
- [ ] Review all running containers in [Portainer](../apps/portainer.md) — remove anything unused
- [ ] Review all NPM proxy hosts — confirm VPN-only services are locked
- [ ] Update all Docker Compose files in your homelab repo
- [ ] Commit and push everything to [Gitea](../apps/gitea.md)
- [ ] Document any quirks or config notes in [Wiki.js](../apps/wiki-js.md)

---

## 🟦 Day 14 — Hardening, Backups & Final Testing
> Make sure everything is bulletproof before calling it done.

**Goals:** Homelab fully built, hardened, backed up, and battle-tested.

- [ ] **[IBM]** Set up ZFS snapshot schedule on IBM
- [ ] **[IBM]** Configure off-site backup (Backblaze B2 + Restic or Duplicati)
- [ ] **[IBM]** Reboot IBM → verify all containers come back up cleanly
- [ ] **[Ubuntu]** Reboot Ubuntu → verify [Plex](../apps/plex.md) + GPU services recover
- [ ] Test [NetBird](../apps/netbird.md) from outside your network (phone on 4G)
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
