# Kavita

Kavita is a fast, feature-rich reading server for manga, comics, and books with a beautiful web reader.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 8090 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/kavita` (config), `/data/books` (library) |

## Docker Compose

```yaml
services:
  kavita:
    image: jvmilazz0/kavita:latest
    container_name: kavita
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/books/manga:/manga
      - /data/books/comics:/comics
      - /data/appdata/kavita:/kavita/config
    ports:
      - 8090:8090
    restart: unless-stopped
```

## Setup

1. Start Kavita and open `http://IBM:8090` — create the admin account on first launch.
2. Go to **Server Settings → Libraries** and add a Manga library pointing to `/manga`.
3. Add a Comics library pointing to `/comics` and trigger an initial scan.
4. Configure user accounts and sharing settings under **Server Settings → Users**.
5. Install the Kavita mobile companion app (Paperback iOS plugin or Tachiyomi extension for Android).
6. Enable OPDS under **Server Settings → OPDS** for e-reader compatibility.

## Configuration

**Library types and root folder mapping:**

| Library type | Container path | Host path |
|---|---|---|
| Manga | `/manga` | `/data/books/manga` |
| Comics | `/comics` | `/data/books/comics` |
| Books (epub/pdf) | `/books` | `/data/books/epub` |

**OPDS catalog** — enable under **Server Settings → OPDS**:

- URL format: `http://IBM:8090/api/opds`
- Compatible apps: KOReader, Moon+ Reader, Panels (iOS)
- Basic auth required — use your Kavita account credentials in the app

**User management** — create read-only accounts for household members:

1. **Server Settings → Users → Add User**
2. Set a role (`Admin`, `User`) and assign library access per user
3. Users can only see libraries explicitly shared with them

**Email setup** (for invite links):

```
Server Settings → Email → SMTP Host, Port, Sender
```

## Integration

- **Readarr** — can download books/manga into the watched folder; Kavita picks them up on the next scan.
- **Tachiyomi / Paperback** — install the Kavita extension and point it to `http://IBM:8090` to browse the library from Android/iOS.
- **Nginx Proxy Manager** — optionally expose for remote access, protecting with Authelia.

## See Also

- [Calibre-Web](calibre-web.md) — alternative for Calibre-managed ebook libraries
- [Readarr](readarr.md) — automated book downloader
- [Official Docs](https://wiki.kavitareader.com)
