# Filebrowser

Filebrowser provides a clean, web-based file manager for browsing and managing files on your homelab storage.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 8087 |
| **Access** | 🌐 Public — `files.srng.no` |
| **Storage** | `/data/appdata/filebrowser` (db + settings), `/data` (root served) |

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
      - 8087:80
    restart: unless-stopped
```

## Setup

1. Create a minimal `settings.json` at the config path: `{"port": 80, "baseURL": "", "address": "", "log": "stdout", "database": "/database/filebrowser.db", "root": "/srv"}`.
2. Start the container — default login is `admin` / `admin`.
3. Change the admin password immediately under **Settings → User Management**.
4. Set the root directory scope to limit access to specific subdirectories per user if needed.
5. Enable dark mode and configure branding under **Settings → Global Settings**.
6. Protect with Authelia in Nginx Proxy Manager before exposing publicly.

## Configuration

Minimal `/.filebrowser.json` (bind-mounted as shown in compose):

```json
{
  "port": 80,
  "baseURL": "",
  "address": "",
  "log": "stdout",
  "database": "/database/filebrowser.db",
  "root": "/srv"
}
```

**User management** — per-user settings allow scoping access:

1. **Settings → User Management → Add User**
2. Set a **Scope** to restrict the user to a subdirectory (e.g. `/srv/photos` for a family photos user).
3. Set **Permissions**: read-only vs read-write, create/delete, share.

**Share links** — generate time-limited or password-protected share URLs from any file/folder. Useful for sharing files without requiring an account.

**Custom branding** — under **Settings → Global Settings**:

- Set the instance name and logo.
- Enable dark mode as the default for all users.

## Integration

- **Nextcloud** — if Nextcloud is already in use, Filebrowser is complementary for direct `/data` filesystem access without the Nextcloud overhead.
- **Authelia** — protect `files.srng.no` with SSO; set Authelia as the access layer in NPM before exposing publicly.
- **Syncthing** — Syncthing syncs files into the `/data` tree; Filebrowser provides a browser-based view of the same storage.

## See Also

- [Nextcloud](nextcloud.md) — full cloud storage suite (heavier alternative)
- [Syncthing](syncthing.md) — file sync that populates storage Filebrowser accesses
- [Official Docs](https://filebrowser.org/configuration)
