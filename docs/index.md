---
hide:
  - navigation
  - toc
---

<div class="hero" markdown>

# Kyo0x Homelab

Personal homelab and commercial game hosting (Arctichost.no) — documentation for building, running, and rebuilding everything from scratch.

<div class="hero-buttons" markdown>
[🗺️ Build Roadmap](roadmap.md){ .btn-primary }
[🚀 Getting Started](getting-started.md){ .btn-secondary }
[📋 All Services](services.md){ .btn-secondary }
</div>

<div class="stats-bar">
  <div class="stat">
    <span class="stat-number">3</span>
    <span class="stat-label">Machines</span>
  </div>
  <div class="stat">
    <span class="stat-number">55+</span>
    <span class="stat-label">Services</span>
  </div>
  <div class="stat">
    <span class="stat-number">416 GB</span>
    <span class="stat-label">Total RAM</span>
  </div>
  <div class="stat">
    <span class="stat-number">25.6 TB</span>
    <span class="stat-label">Storage</span>
  </div>
  <div class="stat">
    <span class="stat-number">15</span>
    <span class="stat-label">Day Roadmap</span>
  </div>
</div>

</div>

<p class="section-heading">Navigate</p>

<div class="grid cards" markdown>

-   :material-map-outline: **Build Roadmap**

    ---

    15-day plan: from bare metal to a fully running homelab + game hosting infrastructure.

    [:octicons-arrow-right-24: Go to roadmap](roadmap.md)

-   :material-rocket-launch: **Getting Started**

    ---

    OS installation, Docker setup, ZFS, and first-boot configuration for all three machines.

    [:octicons-arrow-right-24: Getting started](getting-started.md)

-   :material-format-list-bulleted: **All Services**

    ---

    Every service by machine, with port, access method, and subdomain.

    [:octicons-arrow-right-24: Services](services.md)

-   :material-chip: **Hardware**

    ---

    Full specs: IBM Server, Ubuntu Server (GPU), Raspberry Pi 4B, and network gear.

    [:octicons-arrow-right-24: Hardware](hardware.md)

</div>

<p class="section-heading">Infrastructure</p>

<div class="grid cards" markdown>

-   🖥️ **IBM Server** (Proxmox)

    ---

    **RAM:** 384 GB · **CPU:** Xeon E5-2680 v4 · **Storage:** 25.6 TB ZFS

    | VM | Role |
    |---|---|
    | `docker` | All personal Docker services |
    | `haos` | Home Assistant OS |
    | `gameservers` | Wings + game server containers |

    [:octicons-arrow-right-24: IBM apps](services.md#ibm-server)

-   🖧 **Ubuntu Server**

    ---

    **RAM:** 32 GB · **GPU:** GTX 1070 Ti (NVENC) · **Role:** GPU workloads

    - Plex (NVENC transcoding)
    - Immich (photo library)
    - llama.cpp + Open WebUI (LLM)
    - Stable Diffusion (AI image gen)
    - code-server (browser IDE)
    - qBittorrent (behind ProtonVPN)

    [:octicons-arrow-right-24: Ubuntu apps](services.md#ubuntu-server)

-   🍓 **Raspberry Pi 4B**

    ---

    **RAM:** 8 GB · **Role:** Always-on lightweight services

    - Pi-hole (network ad blocking)
    - Unbound (recursive DNS)
    - Mosquitto (MQTT broker)
    - Zigbee2MQTT (Zigbee gateway)

    [:octicons-arrow-right-24: Pi apps](services.md#raspberry-pi-4b)

</div>

<p class="section-heading">Apps by category</p>

<div class="grid cards" markdown>

-   :material-movie-open: **Media**

    ---

    [Plex](apps/plex.md) · [Radarr](apps/radarr.md) · [Sonarr](apps/sonarr.md) · [Lidarr](apps/lidarr.md) · [Readarr](apps/readarr.md) · [Bazarr](apps/bazarr.md) · [Prowlarr](apps/prowlarr.md) · [qBittorrent](apps/qbittorrent.md) · [Overseerr](apps/overseerr.md) · [Navidrome](apps/navidrome.md) · [Audiobookshelf](apps/audiobookshelf.md) · [Calibre-Web](apps/calibre-web.md) · [Kavita](apps/kavita.md) · [Beets](apps/beets.md)

    [:octicons-arrow-right-24: All media apps](apps/index.md#media)

-   :material-chart-line: **Monitoring & Management**

    ---

    [Grafana](apps/grafana.md) · [Prometheus](apps/prometheus.md) · [Uptime Kuma](apps/uptime-kuma.md) · [Netdata](apps/netdata.md) · [Dozzle](apps/dozzle.md) · [Portainer](apps/portainer.md) · [Watchtower](apps/watchtower.md) · [Homepage](apps/homepage.md)

    [:octicons-arrow-right-24: All monitoring apps](apps/index.md#monitoring--management)

-   :material-shield-lock: **Security & Access**

    ---

    [Vaultwarden](apps/vaultwarden.md) · [Authelia](apps/authelia.md) · [CrowdSec](apps/crowdsec.md) · [NetBird](apps/netbird.md) · [Nginx Proxy Manager](apps/nginx-proxy-manager.md) · [Cloudflare Tunnel](apps/cloudflare-tunnel.md) · [Pi-hole](apps/pi-hole.md) · [Unbound](apps/unbound.md)

    [:octicons-arrow-right-24: All security apps](apps/index.md#security--access)

-   :material-home-automation: **Home Automation**

    ---

    [Home Assistant](apps/home-assistant.md) · [Node-RED](apps/node-red.md) · [Mosquitto](apps/mosquitto.md) · [Zigbee2MQTT](apps/zigbee2mqtt.md)

    [:octicons-arrow-right-24: All automation apps](apps/index.md#home-automation)

-   :material-cloud: **Cloud & Storage**

    ---

    [Nextcloud](apps/nextcloud.md) · [Immich](apps/immich.md) · [Syncthing](apps/syncthing.md) · [Paperless-ngx](apps/paperless-ngx.md) · [Filebrowser](apps/filebrowser.md)

    [:octicons-arrow-right-24: All storage apps](apps/index.md#cloud--storage)

-   :material-code-braces: **Dev & Productivity**

    ---

    [Forgejo](apps/forgejo.md) · [Wiki.js](apps/wiki-js.md) · [code-server](apps/code-server.md) · [Stirling-PDF](apps/stirling-pdf.md) · [IT-Tools](apps/it-tools.md)

    [:octicons-arrow-right-24: All dev apps](apps/index.md#dev--productivity)

-   :material-robot: **AI / Machine Learning**

    ---

    [llama.cpp](apps/llama-cpp.md) · [Open WebUI](apps/open-webui.md) · [Stable Diffusion](apps/stable-diffusion.md)

    All GPU-accelerated on Ubuntu Server (GTX 1070 Ti).

    [:octicons-arrow-right-24: All AI apps](apps/index.md#ai--machine-learning)

-   :material-controller-classic: **Game Hosting (Arctichost.no)**

    ---

    [Pelican Panel](apps/pelican.md) · [Wings](apps/wings.md)

    Commercial game server hosting. Panel in `docker` VM, game servers in isolated `gameservers` VM.

    [:octicons-arrow-right-24: Game hosting overview](services/gamehosting.md)

</div>

<p class="section-heading">Setup guides</p>

<div class="grid cards" markdown>

-   :material-database: **ZFS Pool Setup**

    ---

    Create the RAID-Z2 pool, datasets, and snapshot schedule. Do this on Day 1 before anything else.

    [:octicons-arrow-right-24: ZFS guide](guides/zfs.md)

-   :material-folder-network: **NFS Setup**

    ---

    Share ZFS datasets from IBM to Ubuntu Server. Required before Plex and Immich can access media.

    [:octicons-arrow-right-24: NFS guide](guides/nfs.md)

-   :simple-nvidia: **NVIDIA & CUDA**

    ---

    Install drivers, CUDA, and NVIDIA Container Toolkit on Ubuntu Server for GPU workloads.

    [:octicons-arrow-right-24: NVIDIA guide](guides/nvidia.md)

</div>
