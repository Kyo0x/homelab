# Radarr

Automated movie collection manager.

## Overview

Radarr monitors multiple RSS feeds for new movies and will automatically grab, sort, and rename them. It can also be configured to automatically upgrade the quality of files already downloaded when a better quality format becomes available.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 7878 |
| **Access** | 🔒 VPN |
| **Storage** | `/tank/media/Movies` |

## Features

- Automatic movie monitoring
- Quality profiles
- Integration with Prowlarr for indexers
- qBittorrent integration
- Calendar view of upcoming releases

## Installation (Docker)

```yaml
version: '3.8'
services:
  radarr:
    image: linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=UTC
    volumes:
      - /path/to/radarr/config:/config
      - /tank/media/Movies:/movies
      - /tank/media/Downloads:/downloads
    ports:
      - 7878:7878
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
   - `/tank/media/Movies`

4. **Quality Profile:**
   - Set minimum and preferred quality standards

## Maintenance

- Monitor failed downloads
- Update via Watchtower or manually
- Clean up orphaned files periodically

## Related Services

- [Prowlarr](../prowlarr) - Indexer management
- [qBittorrent](../qbittorrent) - Download client
- [Plex](../plex) - Media server
