# Beets

Beets is a command-line music library manager that auto-tags, renames, and organises your music collection using MusicBrainz.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | — (CLI only) |
| **Access** | 🔒 VPN |

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

## Links

- [Official Docs](https://beets.readthedocs.io)
