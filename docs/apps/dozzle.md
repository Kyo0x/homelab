# Dozzle

Dozzle provides a real-time, searchable web interface for viewing Docker container logs without touching the CLI.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 8083 |
| **Access** | 🔒 VPN |
    image: amir20/dozzle:latest
    container_name: dozzle
    environment:
      - TZ=Europe/Oslo
      - DOZZLE_LEVEL=info
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 8083:8083
    restart: unless-stopped
```

## Setup

1. Start the container and open Dozzle at `http://IBM:8083`.
2. All running containers appear in the left sidebar — click any to stream logs live.
3. Enable authentication by setting `DOZZLE_AUTH_PROVIDER=simple` and creating a `users.yml` config file.
4. To monitor remote Docker hosts, add `DOZZLE_REMOTE_HOST` with the remote Docker socket address.
5. Use the search bar to filter logs across all containers simultaneously.
6. Pin the most-watched containers to the top via the interface for quick access.

## Configuration

**Agent mode for multi-host log viewing** — run a lightweight Dozzle agent on each remote host and connect them to the primary instance:

On the remote host (e.g. Ubuntu Server), add a separate agent-only compose:

```yaml
services:
  dozzle-agent:
    image: amir20/dozzle:latest
    container_name: dozzle-agent
    command: agent
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 7007:7007
    restart: unless-stopped
```

Then on the primary IBM instance, add the remote agent:

```yaml
    environment:
      - DOZZLE_REMOTE_HOST=tcp://ubuntu:7007|Ubuntu Server
```

**Simple auth** — create `/data/appdata/dozzle/users.yml`:

```yaml
users:
  admin:
    name: "Admin"
    password: "$2a$10$..."   # bcrypt hash
    email: admin@srng.no
```

Then add to the compose environment:

```yaml
      - DOZZLE_AUTH_PROVIDER=simple
      - DOZZLE_DATA=/data
```

## Integration

- **Portainer** — complementary; Dozzle is for quick log tailing while Portainer is for container management.
- **Grafana / Loki** — for persistent log aggregation; Dozzle is ephemeral, showing only live/recent logs.

## See Also

- [Portainer](portainer.md) — container management complement
- [Official Docs](https://dozzle.dev/guide/getting-started)
