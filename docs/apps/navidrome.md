# Navidrome

Navidrome is a self-hosted music streaming server compatible with all Subsonic/Airsonic clients.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 4533 |
| **Access** | 🌐 Public — `music.srng.no` |

## Docker Compose

```yaml
services:
  navidrome:
    image: deluan/navidrome:latest
    container_name: navidrome
    environment:
      - ND_SCANSCHEDULE=1h
      - ND_LOGLEVEL=info
      - ND_SESSIONTIMEOUT=24h
      - ND_BASEURL=
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/navidrome:/data
      - /data/music:/music:ro
    ports:
      - 4533:4533
    restart: unless-stopped
```

## Setup

1. Start the container and open Navidrome at `http://IBM:4533`.
2. Create the first admin account on the initial setup screen.
3. The music library at `/music` will be scanned automatically — monitor progress in the UI.
4. Install Symfonium, Tempo, or Substreamer on your phone and point it to `music.srng.no`.
5. Create additional user accounts under **Settings → Users** for family or friends.
6. Adjust `ND_SCANSCHEDULE` to control how often the library is rescanned for new music.

## Links

- [Official Docs](https://www.navidrome.org/docs)
