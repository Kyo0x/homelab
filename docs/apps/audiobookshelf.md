# Audiobookshelf

Audiobookshelf is a self-hosted server for streaming audiobooks and podcasts with a polished mobile and web interface.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 13378 |
| **Access** | 🌐 Public — `books.srng.no` |

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

## Links

- [Official Docs](https://www.audiobookshelf.org/docs)
