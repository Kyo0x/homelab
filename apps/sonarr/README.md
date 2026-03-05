# Sonarr

Automated TV show collection manager.

## Overview

Sonarr is a PVR for Usenet and BitTorrent users. It can monitor multiple RSS feeds for new episodes of your favorite shows and will grab, sort, and rename them. It can also be configured to automatically upgrade the quality of files already downloaded when a better quality format becomes available.

## Deployment

- **Host:** IBM Server (Proxmox VM/LXC)
- **Storage:** `/tank/media/TV`
- **Access:** 🔒 VPN — Internal only
- **Port:** 8989

## Features

- Automatic episode monitoring
- Season pack support
- Quality profiles and upgrades
- Integration with Prowlarr
- Calendar for upcoming episodes
- Missing episode search

## Installation (Docker)

```yaml
version: '3.8'
services:
  sonarr:
    image: linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=UTC
    volumes:
      - /path/to/sonarr/config:/config
      - /tank/media/TV:/tv
      - /tank/media/Downloads:/downloads
    ports:
      - 8989:8989
    restart: unless-stopped
```

## Configuration

1. **Download Client:**
   - Settings → Download Clients → Add qBittorrent
   - Host: Ubuntu Server IP (192.168.1.50)
   - Port: 8080

2. **Indexers:**
   - Managed via Prowlarr (auto-syncs)

3. **Root Folder:**
   - `/tank/media/TV`

4. **Series Monitoring:**
   - All episodes
   - Future episodes only
   - Latest season

## Maintenance

- Check for failed imports
- Monitor disk space
- Update regularly

## Related Services

- [Prowlarr](../prowlarr) - Indexer management
- [qBittorrent](../qbittorrent) - Download client
- [Bazarr](../bazarr) - Subtitle management
- [Plex](../plex) - Media server
