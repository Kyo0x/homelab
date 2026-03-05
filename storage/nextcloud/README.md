# Nextcloud

Self-hosted cloud storage, file sync, and collaboration platform.

## Overview

Nextcloud is a private cloud solution providing file storage, calendar, contacts, document editing, and more.

## Deployment

- **Host:** IBM Server (Proxmox VM/LXC)
- **Access:** 🔒 VPN — `cloud.srng.no`
- **Storage:** ZFS dataset on `/tank`
- **Database:** PostgreSQL or MariaDB

## Features

- File storage and sync
- Calendar and contacts
- Collaborative document editing
- Photo galleries
- Talk (chat and video calls)
- Extensive app ecosystem

## Installation (Docker Compose)

```yaml
version: '3.8'
services:
  nextcloud-db:
    image: postgres:latest
    container_name: nextcloud-db
    environment:
      - POSTGRES_DB=nextcloud
      - POSTGRES_USER=nextcloud
      - POSTGRES_PASSWORD=changeme
    volumes:
      - nextcloud-db:/var/lib/postgresql/data
    restart: unless-stopped

  nextcloud:
    image: nextcloud:latest
    container_name: nextcloud
    environment:
      - POSTGRES_HOST=nextcloud-db
      - POSTGRES_DB=nextcloud
      - POSTGRES_USER=nextcloud
      - POSTGRES_PASSWORD=changeme
    volumes:
      - nextcloud-data:/var/www/html
      - /tank/nextcloud:/var/www/html/data
    ports:
      - 8080:80
    depends_on:
      - nextcloud-db
    restart: unless-stopped

volumes:
  nextcloud-db:
  nextcloud-data:
```

## Configuration

1. **Initial Setup:**
   - Access: `https://cloud.srng.no`
   - Create admin account
   - Configure database connection

2. **Storage:**
   - Data directory: `/var/www/html/data`
   - Ensure proper permissions

3. **Apps:**
   - Install from Apps menu
   - Recommended: Calendar, Contacts, Deck, Talk

4. **External Storage:**
   - Admin → External Storage
   - Mount NFS/SMB shares

## Performance Tuning

1. **Redis Cache:**
```yaml
  redis:
    image: redis:alpine
    container_name: nextcloud-redis
    restart: unless-stopped

# Add to nextcloud config.php:
'memcache.distributed' => '\OC\Memcache\Redis',
'memcache.locking' => '\OC\Memcache\Redis',
'redis' => [
  'host' => 'redis',
  'port' => 6379,
],
```

2. **PHP Memory Limit:**
   - Increase to 512M or higher

3. **Cron Jobs:**
   - Use cron instead of AJAX
   ```bash
   docker exec -u www-data nextcloud php cron.php
   ```

## Clients

- Desktop sync client (Windows, macOS, Linux)
- Mobile apps (iOS, Android)
- WebDAV support for any client

## Backup

```bash
# Backup database
docker exec nextcloud-db pg_dump -U nextcloud nextcloud > nextcloud-db-backup.sql

# Backup data
rsync -av /tank/nextcloud/ /backup/nextcloud/
```

## Related Services

- [Collabora Online](../collabora) - Document editing
- [OnlyOffice](../onlyoffice) - Alternative document suite
