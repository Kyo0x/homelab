# Paperless-ngx

Paperless-ngx scans, OCRs, indexes, and archives physical and digital documents into a searchable web archive.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8000 |
| **Access** | 🌐 Public — `paper.srng.no` |

## Docker Compose

```yaml
services:
  paperless-ngx:
    image: ghcr.io/paperless-ngx/paperless-ngx:latest
    container_name: paperless-ngx
    environment:
      - PAPERLESS_REDIS=redis://paperless-redis:6379
      - PAPERLESS_DBHOST=paperless-db
      - PAPERLESS_OCR_LANGUAGE=eng+nor
      - PAPERLESS_TIME_ZONE=Europe/Oslo
      - USERMAP_UID=1000
      - USERMAP_GID=1000
    volumes:
      - /data/appdata/paperless/data:/usr/src/paperless/data
      - /data/appdata/paperless/media:/usr/src/paperless/media
      - /data/appdata/paperless/export:/usr/src/paperless/export
      - /data/appdata/paperless/consume:/usr/src/paperless/consume
    ports:
      - 8000:8000
    restart: unless-stopped

  paperless-db:
    image: postgres:15
    container_name: paperless-db
    environment:
      - POSTGRES_DB=paperless
      - POSTGRES_USER=paperless
      - POSTGRES_PASSWORD=changeme
    volumes:
      - /data/appdata/paperless-db:/var/lib/postgresql/data
    restart: unless-stopped

  paperless-redis:
    image: redis:7
    container_name: paperless-redis
    restart: unless-stopped
```

## Setup

1. Start the stack and create a superuser: `docker exec -it paperless-ngx python manage.py createsuperuser`.
2. Open `http://IBM:8000` and log in with the credentials you just created.
3. Drop a test PDF into the consume folder (`/data/appdata/paperless/consume`) and verify it is ingested and OCR'd.
4. Set up correspondents, document types, and tags in the admin interface under **Settings**.
5. Configure the mobile scanning app (iOS/Android) to upload directly to the consume folder via the API.
6. Set up automatic email consumption under **Settings → Mail** to ingest scanned documents via email.

## Links

- [Official Docs](https://docs.paperless-ngx.com)
