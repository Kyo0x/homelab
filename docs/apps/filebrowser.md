# Filebrowser

Filebrowser provides a clean, web-based file manager for browsing and managing files on your homelab storage.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 8080 |
| **Access** | 🌐 Public — `files.srng.no` |

## Docker Compose

```yaml
services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    container_name: filebrowser
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
    volumes:
      - /data:/srv
      - /data/appdata/filebrowser/filebrowser.db:/database/filebrowser.db
      - /data/appdata/filebrowser/settings.json:/.filebrowser.json
    ports:
      - 8080:80
    restart: unless-stopped
```

## Setup

1. Create a minimal `settings.json` at the config path: `{"port": 80, "baseURL": "", "address": "", "log": "stdout", "database": "/database/filebrowser.db", "root": "/srv"}`.
2. Start the container — default login is `admin` / `admin`.
3. Change the admin password immediately under **Settings → User Management**.
4. Set the root directory scope to limit access to specific subdirectories per user if needed.
5. Enable dark mode and configure branding under **Settings → Global Settings**.
6. Protect with Authelia in Nginx Proxy Manager before exposing publicly.

## Links

- [Official Docs](https://filebrowser.org/configuration)
