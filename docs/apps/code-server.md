# code-server

code-server runs VS Code in the browser, giving you a full IDE accessible from any device via your homelab VPN.

## Deployment

| | |
|---|---|
| **Host** | Ubuntu Server |
| **Port** | 8080 |
| **Access** | 🌐 Public — `code.srng.no` |

## Docker Compose

```yaml
services:
  code-server:
    image: lscr.io/linuxserver/code-server:latest
    container_name: code-server
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
      - PASSWORD=changeme
      - SUDO_PASSWORD=changeme
    volumes:
      - /data/appdata/code-server:/config
      - /home/aleks:/workspace
    ports:
      - 8080:8443
    restart: unless-stopped
```

## Setup

1. Set strong `PASSWORD` and `SUDO_PASSWORD` values before starting.
2. Start the container and open code-server at `https://ubuntu:8080`.
3. Log in with the password from the environment variable.
4. Install your preferred VS Code extensions via the Extensions panel.
5. Configure Git inside code-server: set `user.name`, `user.email`, and add your SSH key for Gitea access.
6. Expose `code.srng.no` via Nginx Proxy Manager with Authelia for an extra layer of authentication.

## Links

- [Official Docs](https://coder.com/docs/code-server)
