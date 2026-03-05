# Calibre-Web

Calibre-Web is a polished web-based eBook library browser and reader backed by a Calibre database.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 8089 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/calibre-web` (config), `/data/books/calibre` (Calibre library) |

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
      - 8089:8089
    restart: unless-stopped
```

## Setup

1. Place your Calibre library (including `metadata.db`) at `/data/books/calibre`.
2. Open Calibre-Web at `http://IBM:8089` — default login is `admin` / `admin123`.
3. When prompted for the Calibre library path, enter `/books`.
4. Change the admin password immediately under **Admin → Edit User**.
5. Enable the **OPDS catalog** under **Admin → Basic Configuration** for e-reader app support.
6. Enable **Allow Uploads** and **Public Registration** as appropriate for your use case.

## Configuration

**Initial library path** — when prompted after first login, enter `/books` (the container path mapped to `/data/books/calibre`). This directory must contain Calibre's `metadata.db`.

**OPDS catalog** — enable under **Admin → Basic Configuration → Feature Configuration**:

- OPDS URL: `http://IBM:8089/opds`
- Requires authentication — use Calibre-Web account credentials in the e-reader app
- Compatible clients: KOReader, Marvin (iOS), Moon+ Reader (Android)

**Send to Kindle / email** — configure under **Admin → Basic Configuration → E-Mail**:

```
SMTP server: smtp.gmail.com
SMTP port: 587
From: youraddress@gmail.com
Use SSL: STARTTLS
```

**Enable Kobo sync** — install the `kepubify` binary (included with `DOCKER_MODS`) and enable **Kobo Sync** under admin settings. Users can then sync directly from Kobo devices.

## Integration

- **Readarr** — Readarr downloads books into a monitored folder; after import, trigger a Calibre library update (`calibredb add`) or rescan from Calibre-Web admin.
- **Calibre desktop** — manage the library from a desktop Calibre install pointing to `/data/books/calibre`; Calibre-Web reads the same `metadata.db`.

## See Also

- [Kavita](kavita.md) — alternative reading server (manga/comics friendly)
- [Readarr](readarr.md) — automated ebook downloader
- [Official Docs](https://github.com/janeczku/calibre-web/wiki)
