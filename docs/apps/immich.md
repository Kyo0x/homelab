# Immich

Immich is a self-hosted Google Photos replacement with GPU-accelerated ML for face recognition, object detection, and smart search.

## Deployment

| | |
|---|---|
| **Host** | Ubuntu Server |
| **Port** | 2283 |
| **Access** | 🌐 Public — `photos.srng.no` |

## Docker Compose

```yaml
services:
  immich-server:
    image: ghcr.io/immich-app/immich-server:release
    container_name: immich-server
    environment:
      - TZ=Europe/Oslo
      - DB_HOSTNAME=immich-db
      - DB_PASSWORD=changeme
      - REDIS_HOSTNAME=immich-redis
    volumes:
      - /data/photos:/usr/src/app/upload
      - /etc/localtime:/etc/localtime:ro
    ports:
      - 2283:2283
    depends_on:
      - immich-db
      - immich-redis
    restart: unless-stopped

  immich-machine-learning:
    image: ghcr.io/immich-app/immich-machine-learning:release
    container_name: immich-machine-learning
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    volumes:
      - /data/appdata/immich/model-cache:/cache
    restart: unless-stopped

  immich-db:
    image: tensorchord/pgvecto-rs:pg14-v0.2.0
    container_name: immich-db
    environment:
      - POSTGRES_DB=immich
      - POSTGRES_USER=immich
      - POSTGRES_PASSWORD=changeme
    volumes:
      - /data/appdata/immich/db:/var/lib/postgresql/data
    restart: unless-stopped

  immich-redis:
    image: redis:7
    container_name: immich-redis
    restart: unless-stopped
```

## Setup

1. Ensure NVIDIA Container Toolkit is installed on Ubuntu for GPU ML acceleration.
2. Start the stack and open Immich at `http://ubuntu:2283` — create the admin account.
3. Point the library at `/data/photos` and run an initial import scan.
4. Enable face recognition and smart search under **Administration → Jobs** — queue all ML jobs.
5. Install the Immich mobile app and configure it to back up photos automatically.
6. Expose `photos.srng.no` via Nginx Proxy Manager with Authelia protection.

## Links

- [Official Docs](https://immich.app/docs)
