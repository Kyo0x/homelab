# Lidarr

Lidarr automatically monitors, downloads, and manages your music collection.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 8686 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  lidarr:
    image: lscr.io/linuxserver/lidarr:latest
    container_name: lidarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/lidarr:/config
      - /data/music:/music
      - /data/downloads:/downloads
    ports:
      - 8686:8686
    restart: unless-stopped
```

## Setup

1. Open Lidarr at `http://IBM:8686` and complete the setup wizard.
2. Go to **Settings → Media Management** and set the music root folder to `/music`.
3. Go to **Settings → Download Clients** and add qBittorrent with your credentials.
4. Go to **Settings → Indexers** — connect Prowlarr via the Prowlarr integration.
5. Add an artist to trigger a test search and verify the full download pipeline.
6. Enable automatic quality upgrades under **Settings → Profiles** as desired.

## Links

- [Official Docs](https://wiki.servarr.com/lidarr)
