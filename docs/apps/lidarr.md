# Lidarr

Lidarr automatically monitors, downloads, and manages your music collection.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 8686 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/lidarr` (config), `/data/music` (library), `/data/downloads` (inbox) |

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

## Configuration

**Quality Profiles** — go to **Settings → Profiles** and configure:

- Rename the default profile to "Standard Lossless" targeting FLAC.
- Create a second "Lossy" profile for MP3 320kbps as a fallback.
- Set preferred word scores to promote FLAC and penalise low-bitrate sources.

**Metadata profiles** — under **Settings → Metadata Profiles**, set the minimum popularity threshold to avoid obscure releases flooding the wanted list.

**Post-processing with Beets** — add a custom script under **Settings → Connect → Custom Script**:

```bash
#!/bin/bash
# Called by Lidarr after import — trigger Beets re-tag pass
docker exec beets beet import -q /music
```

**Naming format** (Settings → Media Management → Track Naming):

```
{Artist Name}/{Album Title} ({Release Year})/{track:00} - {Track Title}
```

## Integration

- **qBittorrent** — download client; configure at **Settings → Download Clients**.
- **Prowlarr** — indexer manager; add via **Settings → Indexers → Prowlarr** using Prowlarr's API key.
- **Beets** — run Beets after Lidarr imports to apply additional tag corrections and embed cover art.
- **Navidrome** — reads `/music`; trigger a Navidrome rescan after new downloads arrive.

## See Also

- [Beets](beets.md) — music tagger that post-processes Lidarr downloads
- [Navidrome](navidrome.md) — music streaming server reading the library
- [Prowlarr](prowlarr.md) — indexer aggregator
- [Official Docs](https://wiki.servarr.com/lidarr)
