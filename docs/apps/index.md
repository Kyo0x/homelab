---
hide:
  - toc
---

# Apps

All 50+ apps with individual documentation pages. Browse by category or use the search bar above.

---

## Media

<div class="grid cards" markdown>

-   :simple-plex: **[Plex](plex.md)**

    ---
    Primary media streaming server. NVENC hardware transcoding via GTX 1070 Ti.

    **Host:** 🖧 Ubuntu Server · 🌐 `plex.srng.no`

-   :material-movie-open: **[Radarr](radarr.md)**

    ---
    Automated movie collection manager. Grabs, sorts, and renames movies automatically.

    **Host:** 🖥️ IBM/docker VM · **Port:** 7878 · 🔒 VPN

-   :material-television-play: **[Sonarr](sonarr.md)**

    ---
    Automated TV show manager. Monitors and downloads new episodes automatically.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8989 · 🔒 VPN

-   :material-music: **[Lidarr](lidarr.md)**

    ---
    Automated music album downloader. Integrates with Beets for tagging.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8686 · 🔒 VPN

-   :material-book-open-variant: **[Readarr](readarr.md)**

    ---
    Automated ebook and audiobook downloader. Integrates with Calibre-Web.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8787 · 🔒 VPN

-   :material-subtitles: **[Bazarr](bazarr.md)**

    ---
    Automatically downloads and manages subtitles for your Radarr/Sonarr library.

    **Host:** 🖥️ IBM/docker VM · **Port:** 6767 · 🔒 VPN

-   :material-cloud-search: **[Prowlarr](prowlarr.md)**

    ---
    Centralized indexer manager. Syncs trackers to all \*arr apps automatically.

    **Host:** 🖥️ IBM/docker VM · **Port:** 9696 · 🔒 VPN

-   :material-download: **[qBittorrent](qbittorrent.md)**

    ---
    BitTorrent client routing all traffic through ProtonVPN for privacy.

    **Host:** 🖧 Ubuntu Server · **Port:** 8081 · 🔒 VPN

-   :material-television-ambient-light: **[Overseerr](overseerr.md)**

    ---
    Media request portal. Users request movies/shows, which auto-route to Radarr/Sonarr.

    **Host:** 🖥️ IBM/docker VM · **Port:** 5055 · 🌐 `request.srng.no`

-   :material-music-note: **[Navidrome](navidrome.md)**

    ---
    Lightweight self-hosted music streaming server. Works with any Subsonic-compatible client.

    **Host:** 🖥️ IBM/docker VM · **Port:** 4533 · 🌐 `music.srng.no`

-   :material-headphones: **[Audiobookshelf](audiobookshelf.md)**

    ---
    Self-hosted audiobook and podcast server with mobile apps.

    **Host:** 🖥️ IBM/docker VM · **Port:** 13378 · 🌐 `books.srng.no`

-   :material-bookshelf: **[Calibre-Web](calibre-web.md)**

    ---
    Web-based ebook library reader backed by a Calibre database.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8089 · 🔒 VPN

-   :material-book-multiple: **[Kavita](kavita.md)**

    ---
    Self-hosted reading server for manga, comics, ebooks, and PDFs.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8090 · 🔒 VPN

-   :material-music-box: **[Beets](beets.md)**

    ---
    Music library manager and tagger. Post-processes Lidarr downloads with MusicBrainz metadata.

    **Host:** 🖥️ IBM/docker VM · CLI tool

</div>

---

## Monitoring & Management

<div class="grid cards" markdown>

-   :material-chart-line: **[Grafana](grafana.md)**

    ---
    Metrics dashboards. Pulls from Prometheus, displays system and service health.

    **Host:** 🖥️ IBM/docker VM · **Port:** 3000 · 🔒 VPN

-   :material-fire: **[Prometheus](prometheus.md)**

    ---
    Metrics scraping and storage. Collects data from all machines via Node Exporter.

    **Host:** 🖥️ IBM/docker VM · **Port:** 9090 · 🔒 VPN

-   :material-clock-check: **[Uptime Kuma](uptime-kuma.md)**

    ---
    Self-hosted uptime monitoring with status pages and multi-channel alerts.

    **Host:** 🖥️ IBM/docker VM · **Port:** 3001 · 🔒 VPN

-   :material-speedometer: **[Netdata](netdata.md)**

    ---
    Real-time performance monitoring with per-process granularity.

    **Host:** 🖥️ IBM/docker VM · **Port:** 19999 · 🔒 VPN

-   :material-docker: **[Dozzle](dozzle.md)**

    ---
    Live Docker log viewer in the browser. Multi-host agent mode.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8083 · 🔒 VPN

-   :material-docker: **[Portainer](portainer.md)**

    ---
    Web UI for managing Docker containers across all machines.

    **Host:** 🖥️ IBM/docker VM · **Port:** 9000 · 🔒 `docker.srng.no`

-   :material-update: **[Watchtower](watchtower.md)**

    ---
    Automatically pulls and restarts containers when new images are available.

    **Host:** 🖥️ IBM/docker VM · Background service

-   :material-home-analytics: **[Homepage](homepage.md)**

    ---
    Clean, highly customizable homelab dashboard with live service widgets.

    **Host:** 🖥️ IBM/docker VM · **Port:** 3002 · 🔒 VPN

</div>

---

## Security & Access

<div class="grid cards" markdown>

-   :material-shield-key: **[Vaultwarden](vaultwarden.md)**

    ---
    Self-hosted Bitwarden-compatible password manager. Lightweight Rust implementation.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8082 · 🔒 `vault.srng.no`

-   :material-two-factor-authentication: **[Authelia](authelia.md)**

    ---
    SSO + 2FA portal protecting all internal services behind Nginx Proxy Manager.

    **Host:** 🖥️ IBM/docker VM · **Port:** 9091 · 🔒 VPN

-   :material-shield-bug: **[CrowdSec](crowdsec.md)**

    ---
    Collaborative intrusion detection and prevention. Shares threat intel across the community.

    **Host:** 🖥️ IBM/docker VM · Agent + bouncer

-   :material-vpn: **[NetBird](netbird.md)**

    ---
    Self-hosted WireGuard mesh VPN. Zero-config, works through NAT and firewalls.

    **Host:** 🖥️ IBM/docker VM · **Port:** 80/443/3478 · 🌐 `vpn.srng.no`

-   :material-web: **[Nginx Proxy Manager](nginx-proxy-manager.md)**

    ---
    Reverse proxy with a web UI for SSL certs, proxy hosts, and Authelia integration.

    **Host:** 🖥️ IBM/docker VM · **Port:** 80/443/81 · 🔒 VPN

-   :simple-cloudflare: **[Cloudflare Tunnel](cloudflare-tunnel.md)**

    ---
    Zero-trust tunnel exposing Overseerr, Navidrome, and Audiobookshelf without opening ports.

    **Host:** 🖥️ IBM/docker VM · No inbound ports needed

-   :material-dns: **[Pi-hole](pi-hole.md)**

    ---
    Network-wide ad blocker acting as the primary DNS resolver.

    **Host:** 🍓 Raspberry Pi 4B · **Port:** 53/80 · 🔒 VPN

-   :material-dns-outline: **[Unbound](unbound.md)**

    ---
    Recursive DNS resolver. Pi-hole forwards uncached queries here instead of to upstream.

    **Host:** 🍓 Raspberry Pi 4B · **Port:** 5335 · Internal only

</div>

---

## Home Automation

<div class="grid cards" markdown>

-   :material-home-automation: **[Home Assistant](home-assistant.md)**

    ---
    Central home automation hub. Runs as HAOS in a dedicated Proxmox VM.

    **Host:** 🖥️ IBM/haos VM · **Port:** 8123 · 🔒 VPN

-   :material-transit-connection-variant: **[Node-RED](node-red.md)**

    ---
    Visual flow-based automation. Connects Home Assistant, MQTT, and external APIs.

    **Host:** 🖥️ IBM/docker VM · **Port:** 1880 · 🔒 VPN

-   :material-message-fast: **[Mosquitto](mosquitto.md)**

    ---
    Lightweight MQTT broker. Hub for all IoT device communication.

    **Host:** 🍓 Raspberry Pi 4B · **Port:** 1883/8883 · 🔒 VPN

-   :material-zigbee: **[Zigbee2MQTT](zigbee2mqtt.md)**

    ---
    Bridges Zigbee devices to MQTT. No proprietary hub required.

    **Host:** 🍓 Raspberry Pi 4B · **Port:** 8092 · 🔒 VPN

</div>

---

## Cloud & Storage

<div class="grid cards" markdown>

-   :material-cloud: **[Nextcloud](nextcloud.md)**

    ---
    Private cloud: files, calendar, contacts, notes. Self-hosted Google Drive alternative.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8088 · 🔒 VPN

-   :material-image-multiple: **[Immich](immich.md)**

    ---
    Self-hosted Google Photos alternative with ML face/object recognition.

    **Host:** 🖧 Ubuntu Server · **Port:** 2283 · 🔒 VPN

-   :material-sync: **[Syncthing](syncthing.md)**

    ---
    Decentralized peer-to-peer file sync between machines and devices.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8384 · 🔒 VPN

-   :material-file-document-multiple: **[Paperless-ngx](paperless-ngx.md)**

    ---
    Document scanner and manager with OCR, tagging, and full-text search.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8000 · 🔒 VPN

-   :material-folder-open: **[Filebrowser](filebrowser.md)**

    ---
    Web-based file manager for browsing and managing files on the server.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8087 · 🔒 VPN

</div>

---

## Dev & Productivity

<div class="grid cards" markdown>

-   :material-source-branch: **[Forgejo](forgejo.md)**

    ---
    Self-hosted Git service (community Gitea fork). Issues, pull requests, CI/CD actions.

    **Host:** 🖥️ IBM/docker VM · **Port:** 3003 · 🌐 `git.srng.no`

-   :material-book-edit: **[Wiki.js](wiki-js.md)**

    ---
    Powerful self-hosted knowledge base with Markdown editing and full-text search.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8084 · 🔒 VPN

-   :material-microsoft-visual-studio-code: **[code-server](code-server.md)**

    ---
    VS Code running in the browser. Full IDE accessible from any device.

    **Host:** 🖧 Ubuntu Server · **Port:** 8443 · 🔒 VPN

-   :material-file-pdf-box: **[Stirling-PDF](stirling-pdf.md)**

    ---
    All-in-one self-hosted PDF tool: merge, split, compress, OCR, watermark, and more.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8085 · 🔒 VPN

-   :material-tools: **[IT-Tools](it-tools.md)**

    ---
    100+ developer utility tools: encoders, generators, converters, formatters.

    **Host:** 🖥️ IBM/docker VM · **Port:** 8086 · 🔒 VPN

</div>

---

## AI / Machine Learning

<div class="grid cards" markdown>

-   :material-brain: **[llama.cpp](llama-cpp.md)**

    ---
    Local LLM inference server. Runs GGUF models efficiently on CPU and GPU.

    **Host:** 🖧 Ubuntu Server · **Port:** 8091 · 🔒 VPN

-   :material-chat: **[Open WebUI](open-webui.md)**

    ---
    ChatGPT-style web interface for llama.cpp. Model selection, history, RAG.

    **Host:** 🖧 Ubuntu Server · **Port:** 3004 · 🔒 VPN

-   :material-image: **[Stable Diffusion](stable-diffusion.md)**

    ---
    Local AI image generation via Automatic1111 WebUI. GPU-accelerated.

    **Host:** 🖧 Ubuntu Server · **Port:** 7860 · 🔒 VPN

</div>

---

## 🎮 Game Hosting (Arctichost.no)

Commercial game server hosting. Panel lives in the `docker` VM; game servers run in the fully isolated `gameservers` VM.

> 📖 [Full Arctichost.no infrastructure overview →](../services/gamehosting.md)

<div class="grid cards" markdown>

-   :material-bird: **[Pelican Panel](pelican.md)**

    ---
    Open-source game server management panel (modern Pterodactyl fork). Web UI, API, and billing-ready.

    **Host:** 🖥️ IBM/docker VM · **Port:** 80/443 · 🌐 `panel.arctichost.no`

-   :material-server-network: **[Wings](wings.md)**

    ---
    Node daemon for Pelican. Manages and runs all game server Docker containers.

    **Host:** 🖥️ IBM/gameservers VM · **Port:** 8091/2022 · Internal only

</div>
