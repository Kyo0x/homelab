# Nextcloud

Nextcloud is a self-hosted file sync and collaboration platform — your private alternative to Google Drive.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8080 |
| **Access** | 🌐 Public — `cloud.srng.no` |

## Docker Compose

```yaml
services:
  nextcloud:
    image: lscr.io/linuxserver/nextcloud:latest
    container_name: nextcloud
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/nextcloud:/config
      - /data/cloud:/data
    ports:
      - 8080:80
    restart: unless-stopped

  nextcloud-db:
    image: mariadb:11
    container_name: nextcloud-db
    environment:
      - MYSQL_ROOT_PASSWORD=changeme
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=changeme
    volumes:
      - /data/appdata/nextcloud-db:/var/lib/mysql
    restart: unless-stopped
```

## Setup

1. Open `http://IBM:8080`, create an admin account, and point the data folder to `/data`.
2. Select **MySQL/MariaDB** as the database and enter the credentials from the compose file.
3. Complete the installation and then go to **Settings → Security → HTTPS** to trust the proxy.
4. Add `'trusted_proxies' => ['nginx-proxy-manager']` and `'overwriteprotocol' => 'https'` to `config.php`.
5. Install the Calendar, Contacts, and Notes apps from the Nextcloud App Store.
6. Set up the Nextcloud desktop and mobile clients on personal devices.

## Links

- [Official Docs](https://docs.nextcloud.com)
