# Nginx Proxy Manager

Easy-to-use reverse proxy with SSL certificate management.

## Overview

Nginx Proxy Manager provides a clean web interface for managing reverse proxy hosts, SSL certificates, and access lists without editing configuration files.

## Deployment

- **Host:** IBM Server (Proxmox VM/LXC)
- **Access:** 🔒 VPN — `proxy.srng.no`
- **Ports:** 
  - Admin UI: 81
  - HTTP: 80
  - HTTPS: 443

## Features

- Automatic Let's Encrypt SSL certificates
- Wildcard certificates
- Access lists (IP whitelisting)
- Custom locations
- WebSocket support
- HTTP/2 and HTTP/3

## Installation (Docker Compose)

```yaml
version: '3.8'
services:
  npm:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    ports:
      - 80:80
      - 443:443
      - 81:81
    environment:
      - DB_SQLITE_FILE=/data/database.sqlite
    volumes:
      - npm-data:/data
      - npm-letsencrypt:/etc/letsencrypt
    restart: unless-stopped

volumes:
  npm-data:
  npm-letsencrypt:
```

## Initial Setup

1. Access: `http://server-ip:81`
2. Default login:
   - Email: `admin@example.com`
   - Password: `changeme`
3. Change credentials immediately

## Configuration

### Add Proxy Host

1. **Hosts → Proxy Hosts → Add Proxy Host**
2. **Details:**
   - Domain: `plex.srng.no`
   - Scheme: `http`
   - Forward Hostname/IP: `192.168.1.50` (Ubuntu Server)
   - Forward Port: `32400`
3. **SSL:**
   - Request new certificate
   - Force SSL
   - Enable HTTP/2
4. **Advanced (if needed):**
   - WebSocket support
   - Custom config

### Wildcard Certificate

For `*.srng.no`:
1. SSL Certificates → Add SSL Certificate
2. Use DNS Challenge
3. Select DNS provider (Cloudflare recommended)
4. Enter API credentials
5. Add domain: `*.srng.no` and `srng.no`

## DNS Configuration

Point all subdomains to IBM Server IP:

```
A    srng.no           → 192.168.1.100
A    *.srng.no         → 192.168.1.100
```

## Access Lists

Restrict services to VPN IPs:
1. Access Lists → Add Access List
2. Name: "VPN Only"
3. Add NetBird subnet: `100.64.0.0/10`
4. Apply to sensitive proxy hosts

## Backup

Backup configuration:
```bash
docker exec nginx-proxy-manager \
  sqlite3 /data/database.sqlite ".backup '/data/npm-backup.db'"
```

## Related Services

- [Cloudflare](https://cloudflare.com) - DNS management
- [NetBird](../../netbird) - VPN access
