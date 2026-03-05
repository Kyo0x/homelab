# Kavita

Kavita is a fast, feature-rich reading server for manga, comics, and books with a beautiful web reader.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 5000 |
| **Access** | �� VPN |

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
      - 5000:5000
    restart: unless-stopped
```

## Setup

1. Start Kavita and open `http://IBM:5000` — create the admin account on first launch.
2. Go to **Server Settings → Libraries** and add a Manga library pointing to `/manga`.
3. Add a Comics library pointing to `/comics` and trigger an initial scan.
4. Configure user accounts and sharing settings under **Server Settings → Users**.
5. Install the Kavita mobile companion app (Paperback iOS plugin or Tachiyomi extension for Android).
6. Enable OPDS under **Server Settings → OPDS** for e-reader compatibility.

## Links

- [Official Docs](https://wiki.kavitareader.com)
