# Bazarr

Bazarr automatically downloads subtitles for your Sonarr and Radarr libraries.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 6767 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  bazarr:
    image: lscr.io/linuxserver/bazarr:latest
    container_name: bazarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/bazarr:/config
      - /data/media/Movies:/movies
      - /data/media/TV:/tv
    ports:
      - 6767:6767
    restart: unless-stopped
```

## Setup

1. Open Bazarr at `http://IBM:6767` and go to **Settings → Sonarr**.
2. Enter your Sonarr host, port, and API key — click **Test** then **Save**.
3. Repeat for **Settings → Radarr** with Radarr's API key.
4. Go to **Settings → Subtitles** and configure preferred languages (e.g. English, Norwegian).
5. Enable at least one subtitle provider (OpenSubtitles, Subscene, etc.) under **Settings → Providers**.
6. Trigger a manual search on any title to verify subtitles download correctly.

## Links

- [Official Docs](https://wiki.bazarr.media)
