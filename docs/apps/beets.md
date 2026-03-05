# Beets

Beets is a command-line music library manager that auto-tags, renames, and organises your music collection using MusicBrainz.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | — (CLI only) |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/beets` (config), `/data/music` (library), `/data/downloads` (inbox) |

## Docker Compose

```yaml
services:
  beets:
    image: lscr.io/linuxserver/beets:latest
    container_name: beets
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/beets:/config
      - /data/music:/music
      - /data/downloads:/downloads
    restart: unless-stopped
```

## Setup

1. Create `/data/appdata/beets/config.yaml` and set `directory: /music` and `import.move: yes`.
2. Enable desired plugins in `config.yaml` — recommended: `fetchart`, `embedart`, `lastgenre`, `duplicates`.
3. Run an interactive import: `docker exec -it beets beet import /downloads`.
4. Review the proposed changes and approve — Beets will rename and move files to `/music`.
5. After the initial import, run `beet update` to refresh the database for existing files.
6. Schedule a cron job to auto-import new downloads by calling `beet import -q /downloads`.

## Configuration

Full `/data/appdata/beets/config.yaml` example:

```yaml
directory: /music
library: /config/musiclibrary.db

import:
  move: yes
  write: yes
  log: /config/import.log

plugins: fetchart embedart lastgenre duplicates scrub replaygain

fetchart:
  auto: yes
  sources: coverart itunes amazon

embedart:
  auto: yes

lastgenre:
  auto: yes
  source: track

replaygain:
  auto: yes
  backend: ffmpeg

match:
  strong_rec_thresh: 0.10
```

**Common CLI commands:**

```bash
# Interactive import from downloads
docker exec -it beets beet import /downloads

# Non-interactive import (for automation)
docker exec beets beet import -q /downloads

# Retag existing library
docker exec beets beet modify title="New Title" artist="Artist"

# Find duplicates
docker exec beets beet dup

# Update library (rescan existing files)
docker exec beets beet update
```

## Integration

- **Lidarr** — Lidarr downloads music; Beets post-processes and organises into `/music`. Use Lidarr's **Custom Scripts** to call `beet import -q /downloads/completed` after a download completes.
- **Navidrome** — reads the organised `/music` library. After a Beets import run, trigger a Navidrome library rescan.

## See Also

- [Lidarr](lidarr.md) — automated music downloader feeding Beets
- [Navidrome](navidrome.md) — music streaming server reading the Beets-organised library
- [Official Docs](https://beets.readthedocs.io)
