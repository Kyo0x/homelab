# Calibre-Web

Calibre-Web is a polished web-based eBook library browser and reader backed by a Calibre database.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8083 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  calibre-web:
    image: lscr.io/linuxserver/calibre-web:latest
    container_name: calibre-web
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
      - DOCKER_MODS=linuxserver/mods:universal-calibre
    volumes:
      - /data/appdata/calibre-web:/config
      - /data/books/calibre:/books
    ports:
      - 8083:8083
    restart: unless-stopped
```

## Setup

1. Place your Calibre library (including `metadata.db`) at `/data/books/calibre`.
2. Open Calibre-Web at `http://IBM:8083` — default login is `admin` / `admin123`.
3. When prompted for the Calibre library path, enter `/books`.
4. Change the admin password immediately under **Admin → Edit User**.
5. Enable the **OPDS catalog** under **Admin → Basic Configuration** for e-reader app support.
6. Enable **Allow Uploads** and **Public Registration** as appropriate for your use case.

## Links

- [Official Docs](https://github.com/janeczku/calibre-web/wiki)
