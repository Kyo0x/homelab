# Audiobookshelf

Audiobookshelf is a self-hosted server for streaming audiobooks and podcasts with a polished mobile and web interface.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 13378 |
| **Access** | 🌐 Public — `books.srng.no` |
| **Storage** | `/data/appdata/audiobookshelf` (config + metadata), `/data/books/audiobooks`, `/data/books/podcasts` |

## Docker Compose

```yaml
services:
  audiobookshelf:
    image: ghcr.io/advplyr/audiobookshelf:latest
    container_name: audiobookshelf
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/books/audiobooks:/audiobooks
      - /data/books/podcasts:/podcasts
      - /data/appdata/audiobookshelf/config:/config
      - /data/appdata/audiobookshelf/metadata:/metadata
    ports:
      - 13378:80
    restart: unless-stopped
```

## Setup

1. Open Audiobookshelf at `http://IBM:13378` and create the root admin account.
2. Go to **Settings → Libraries** and add your audiobooks library pointing to `/audiobooks`.
3. Add a podcasts library pointing to `/podcasts` and search for your first podcast to subscribe.
4. Install the Audiobookshelf app on iOS or Android and log in with your server URL.
5. Enable progress sync so listening position is remembered across all devices.
6. Expose `books.srng.no` publicly via Nginx Proxy Manager.

## Configuration

**Library settings** — configure per library under **Settings → Libraries**:

| Setting | Recommended value |
|---|---|
| Scanner | Automatic (watches directory for new files) |
| Metadata agent | Audnexus (for audiobooks) |
| Prefer local metadata | On (keep embedded tags) |
| Book cover extraction | From audio file |

**Mobile app setup:**

1. Install the **Audiobookshelf** app (iOS App Store / Google Play — free, open source).
2. Add server: enter `https://books.srng.no` (or VPN address for private setup).
3. Log in with your account credentials.
4. Enable **Download for offline** on any title for offline playback.
5. Playback speed, sleep timer, and chapter navigation are all available in-app.

**Podcast subscriptions** — search directly in the Podcasts library or import an OPML file from a previous podcast app.

## Integration

- **Nginx Proxy Manager** — expose `books.srng.no` publicly so the mobile app works away from home.
- **Authelia** — optionally protect the web UI with SSO (the mobile app handles its own auth).
- **Syncthing** — sync downloaded audiobooks from a desktop Audible/Libby export into `/data/books/audiobooks` on the server.

## See Also

- [Kavita](kavita.md) — reading server for manga/comics/ebooks
- [Calibre-Web](calibre-web.md) — ebook library browser
- [Official Docs](https://www.audiobookshelf.org/docs)
