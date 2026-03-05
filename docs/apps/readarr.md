# Readarr

Readarr automatically monitors, downloads, and manages your eBook and audiobook collection.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8787 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  readarr:
    image: lscr.io/linuxserver/readarr:develop
    container_name: readarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/readarr:/config
      - /data/books:/books
      - /data/downloads:/downloads
    ports:
      - 8787:8787
    restart: unless-stopped
```

## Setup

1. Open Readarr at `http://IBM:8787` and complete the initial setup.
2. Go to **Settings → Media Management** and add `/books` as the root folder.
3. Go to **Settings → Download Clients** and add qBittorrent.
4. Connect Prowlarr via **Settings → Indexers** using the Prowlarr integration.
5. Add a book or author to confirm the search and download pipeline works end to end.
6. Configure a quality profile to control preferred formats (epub, mobi, pdf).

## Links

- [Official Docs](https://wiki.servarr.com/readarr)
