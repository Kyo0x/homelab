# Plex Media Server

Media streaming server with hardware-accelerated transcoding.

## Overview

Plex is the primary media streaming platform for the homelab, serving movies, TV shows, music, and more to all devices.

## Deployment

| | |
|---|---|
| **Machine** | 🖧 Ubuntu Server |
| **Port** | 32400 |
| **Access** | 🌐 Public — `plex.srng.no` |
| **Storage** | `/tank/media` (NFS from IBM Server) |

## Features

- Hardware-accelerated transcoding (NVENC)
- Remote access for streaming anywhere
- Auto-organization via Sonarr/Radarr integration
- Multiple user profiles
- Mobile apps, TV apps, web interface

## Installation

```bash
# On Ubuntu Server
curl https://downloads.plex.tv/plex-keys/PlexSign.key | sudo apt-key add -
echo deb https://downloads.plex.tv/repo/deb public main | sudo tee /etc/apt/sources.list.d/plexmediaserver.list
sudo apt update
sudo apt install plexmediaserver
```

## Configuration

1. Mount IBM storage via NFS:
   ```bash
   sudo mkdir -p /mnt/media
   sudo mount -t nfs 192.168.1.100:/tank/media /mnt/media
   ```

2. Add to `/etc/fstab` for persistence:
   ```
   192.168.1.100:/tank/media /mnt/media nfs defaults,_netdev 0 0
   ```

3. Access Plex setup: `http://localhost:32400/web`

4. Add libraries:
   - Movies: `/mnt/media/Movies`
   - TV Shows: `/mnt/media/TV`
   - Music: `/mnt/media/Music`

5. Enable hardware transcoding:
   - Settings → Transcoder → Use hardware acceleration when available

## Maintenance

- Update regularly via apt
- Monitor transcoding performance
- Check disk space on NFS mount

## Related Services

- [Sonarr](../sonarr) - TV show management
- [Radarr](../radarr) - Movie management
- [Overseerr](../overseerr) - Media requests
