# Overseerr

Media request and discovery portal.

## Overview

Overseerr is a request management and media discovery tool for Plex. Users can request movies and TV shows, which are automatically sent to Sonarr/Radarr.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 5055 |
| **Access** | 🌐 Cloudflare Tunnel — `request.srng.no` |

## Features

- Beautiful, modern interface
- Plex integration
- User request system
- Request quotas and limits
- Email/Discord/Telegram notifications
- Mobile-responsive

## Installation (Docker)

```yaml
version: '3.8'
services:
  overseerr:
    image: linuxserver/overseerr:latest
    container_name: overseerr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=UTC
    volumes:
      - /path/to/overseerr/config:/config
    ports:
      - 5055:5055
    restart: unless-stopped
```

## Configuration

1. **Plex Integration:**
   - Settings → Plex → Add Server
   - Sign in with Plex account
   - Import libraries

2. **Sonarr Integration:**
   - Settings → Services → Sonarr
   - Add server details and API key
   - Enable automatic approval (optional)

3. **Radarr Integration:**
   - Settings → Services → Radarr
   - Add server details and API key
   - Set quality profiles

4. **User Permissions:**
   - Settings → Users
   - Set quotas per user
   - Approve/deny permissions

## Public Access

Since this is public-facing:
- Enable strong authentication
- Consider rate limiting
- Use Cloudflare proxy for DDoS protection
- Monitor for abuse

## Notifications

Configure notifications for:
- New requests
- Request approvals/denials
- Media available
- Issues

## Related Services

- [Plex](../plex) - Media server
- [Sonarr](../sonarr) - TV requests
- [Radarr](../radarr) - Movie requests
