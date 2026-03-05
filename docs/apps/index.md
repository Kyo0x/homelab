# Apps

All apps with individual documentation pages. Additional services are listed below without dedicated pages yet.

---

## Media Management

<div class="grid cards" markdown>

-   :material-movie-open: **[Radarr](radarr.md)**

    ---
    Automated movie collection manager. Monitors RSS feeds, grabs, sorts, and renames movies automatically.

    **Host:** IBM Server · **Port:** 7878 · 🔒 VPN

-   :material-television-play: **[Sonarr](sonarr.md)**

    ---
    Automated TV show collection manager. Monitors and downloads new episodes automatically.

    **Host:** IBM Server · **Port:** 8989 · 🔒 VPN

-   :material-cloud-search: **[Prowlarr](prowlarr.md)**

    ---
    Centralized indexer manager that syncs trackers to all \*arr apps automatically.

    **Host:** IBM Server · **Port:** 9696 · 🔒 VPN

-   :material-download: **[qBittorrent](qbittorrent.md)**

    ---
    BitTorrent download client routing all traffic through ProtonVPN for privacy.

    **Host:** Ubuntu Server · **Port:** 8080 · 🔒 VPN

-   :material-television-ambient-light: **[Overseerr](overseerr.md)**

    ---
    Media request portal. Users can request movies and TV shows, which auto-route to Radarr/Sonarr.

    **Host:** IBM Server · **Port:** 5055 · 🌐 `request.srng.no`

</div>

---

## Media Servers

<div class="grid cards" markdown>

-   :simple-plex: **[Plex](plex.md)**

    ---
    Primary media streaming platform. NVENC hardware transcoding via GTX 1070 Ti.

    **Host:** Ubuntu Server · 🌐 `plex.srng.no`

</div>

---

## Security

<div class="grid cards" markdown>

-   :material-shield-key: **[Vaultwarden](vaultwarden.md)**

    ---
    Self-hosted Bitwarden-compatible password manager. Lightweight Rust implementation.

    **Host:** IBM Server · **Port:** 8080 · 🔒 `vault.srng.no`

</div>

---

## Infrastructure

<div class="grid cards" markdown>

-   :material-docker: **[Portainer](portainer.md)**

    ---
    Web-based Docker container management across all homelab machines.

    **Host:** IBM Server · **Port:** 9000 · 🔒 `docker.srng.no`

</div>

---

## All Services (no dedicated page yet)

| Service | What it does | Host | Access |
|---|---|---|---|
| **Lidarr** | Auto-manages music downloads | IBM | 🔒 VPN |
| **Readarr** | Auto-manages ebook downloads | IBM | 🔒 VPN |
| **Bazarr** | Auto-downloads subtitles | IBM | 🔒 VPN |
| **Navidrome** | Self-hosted music streaming | IBM | 🌐 `music.srng.no` |
| **Audiobookshelf** | Audiobooks & podcasts | IBM | 🌐 `books.srng.no` |
| **Calibre-Web** | eBook library & web reader | IBM | 🔒 VPN |
| **Kavita** | Manga, comics & books | IBM | 🔒 VPN |
| **Nextcloud** | Private cloud storage | IBM | 🔒 VPN |
| **Syncthing** | Peer-to-peer file sync | IBM | 🔒 VPN |
| **Paperless-ngx** | Document scanner & management | IBM | 🔒 VPN |
| **Filebrowser** | Web-based file manager | IBM | 🔒 VPN |
| **Authelia** | SSO + 2FA | IBM | 🔒 VPN |
| **CrowdSec** | Collaborative threat detection | IBM | 🔒 VPN |
| **Nginx Proxy Manager** | Reverse proxy + SSL | IBM | 🔒 VPN |
| **NetBird** | Self-hosted mesh VPN | IBM | 🔒 VPN |
| **Grafana + Prometheus** | Metrics dashboards | IBM | 🔒 VPN |
| **Uptime Kuma** | Uptime monitoring | IBM | 🔒 VPN |
| **Netdata** | Real-time performance | IBM | 🔒 VPN |
| **Dozzle** | Live Docker log viewer | IBM | 🔒 VPN |
| **Watchtower** | Auto-updates containers | IBM | 🔒 VPN |
| **Home Assistant** | Home automation | IBM | 🔒 VPN |
| **Node-RED** | Visual automation flows | IBM | 🔒 VPN |
| **Gitea / Forgejo** | Self-hosted Git | IBM | 🔒 VPN |
| **Wiki.js / BookStack** | Personal knowledge base | IBM | 🔒 VPN |
| **Stirling-PDF** | PDF tools | IBM | 🔒 VPN |
| **IT-Tools** | Developer utilities | IBM | 🔒 VPN |
| **Homepage** | Homelab dashboard | IBM | 🔒 VPN |
| **Immich** | Self-hosted Google Photos | Ubuntu | 🔒 VPN |
| **llama.cpp** | Local LLM inference | Ubuntu | 🔒 VPN |
| **Open WebUI** | ChatGPT-like UI for llama.cpp | Ubuntu | 🔒 VPN |
| **Stable Diffusion** | Local AI image generation | Ubuntu | 🔒 VPN |
| **code-server** | VS Code in the browser | Ubuntu | 🔒 VPN |
| **Pi-hole / AdGuard** | Network-wide ad blocking | Pi 4B | 🔒 VPN |
| **Unbound** | Recursive DNS resolver | Pi 4B | 🔒 VPN |
| **Mosquitto** | MQTT broker | Pi 4B | 🔒 VPN |
| **Zigbee2MQTT** | Zigbee device controller | Pi 4B | 🔒 VPN |
