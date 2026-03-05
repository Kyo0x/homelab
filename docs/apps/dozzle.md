# Dozzle

Dozzle provides a real-time, searchable web interface for viewing Docker container logs without touching the CLI.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8080 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  dozzle:
    image: amir20/dozzle:latest
    container_name: dozzle
    environment:
      - TZ=Europe/Oslo
      - DOZZLE_LEVEL=info
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 8080:8080
    restart: unless-stopped
```

## Setup

1. Start the container and open Dozzle at `http://IBM:8080`.
2. All running containers appear in the left sidebar — click any to stream logs live.
3. Enable authentication by setting `DOZZLE_AUTH_PROVIDER=simple` and creating a `users.yml` config file.
4. To monitor remote Docker hosts, add `DOZZLE_REMOTE_HOST` with the remote Docker socket address.
5. Use the search bar to filter logs across all containers simultaneously.
6. Pin the most-watched containers to the top via the interface for quick access.

## Links

- [Official Docs](https://dozzle.dev/guide/getting-started)
