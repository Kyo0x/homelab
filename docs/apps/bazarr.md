# Bazarr

Bazarr automatically downloads subtitles for your Sonarr and Radarr libraries.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 6767 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/bazarr` (config), `/data/media/Movies`, `/data/media/TV` |

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

## Configuration

**Language profile setup** — go to **Settings → Languages**:

1. Add a language profile (e.g. "English + Norwegian").
2. Set primary language to English, add Norwegian as a secondary fallback.
3. Assign the profile to all series and movies.

**Subtitle providers** — enable under **Settings → Providers**:

| Provider | Best for |
|---|---|
| OpenSubtitles.com | Broad coverage, requires free account |
| Subscene | Good for non-English content |
| Embedded Subtitles | Extracts subs already inside MKV files |
| Supersubtitles | Nordic languages |

**Anti-captcha** — if OpenSubtitles shows captcha errors, enable the Anti-captcha plugin under **Settings → Anti-Captcha**.

**Synchronisation** — use the **Subtitle Edit** sync tool built into Bazarr to fix timing offsets on downloaded subtitles.

## Integration

- **Sonarr** — connect via **Settings → Sonarr**; API key from **Sonarr → Settings → General**.
- **Radarr** — connect via **Settings → Radarr**; API key from **Radarr → Settings → General**.
- Both arr apps trigger Bazarr to search immediately when a new file is imported.

## See Also

- [Sonarr](sonarr.md) — TV show manager that feeds Bazarr
- [Radarr](radarr.md) — movie manager that feeds Bazarr
- [Official Docs](https://wiki.bazarr.media)
