# Prowlarr

Indexer manager for Sonarr, Radarr, Lidarr, and Readarr.

## Overview

Prowlarr is an indexer manager/proxy that integrates with your various PVR apps. It supports management of both Torrent Trackers and Usenet Indexers.

## Deployment

- **Host:** IBM Server (Proxmox VM/LXC)
- **Access:** 🔒 VPN — Internal only
- **Port:** 9696

## Features

- Centralized indexer management
- Sync indexers to all *arr apps
- Built-in search functionality
- Statistics and history
- Flaresolverr integration for Cloudflare bypass

## Installation (Docker)

```yaml
version: '3.8'
services:
  prowlarr:
    image: linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=UTC
    volumes:
      - /path/to/prowlarr/config:/config
    ports:
      - 9696:9696
    restart: unless-stopped
```

## Configuration

1. **Add Indexers:**
   - Indexers → Add Indexer
   - Configure trackers and Usenet providers

2. **Add Apps:**
   - Settings → Apps → Add Application
   - Add Sonarr, Radarr, Lidarr, Readarr
   - Use Prowlarr Sync level

3. **Sync:**
   - Prowlarr will automatically push indexers to all connected apps

## Indexer Recommendations

- **Public Trackers:** 1337x, RARBG alternatives, YTS
- **Private Trackers:** (require invites)
- **Usenet:** (requires paid indexers)

## Related Services

- [Sonarr](../sonarr) - TV shows
- [Radarr](../radarr) - Movies
- [Lidarr](../lidarr) - Music
- [Readarr](../readarr) - Books
