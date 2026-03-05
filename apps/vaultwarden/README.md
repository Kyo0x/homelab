# Vaultwarden

Self-hosted Bitwarden password manager.

## Overview

Vaultwarden is an unofficial Bitwarden-compatible server written in Rust. It's lightweight, fast, and perfect for self-hosting.

## Deployment

- **Host:** IBM Server (Proxmox VM/LXC)
- **Access:** 🔒 VPN — `vault.srng.no`
- **Port:** 8080
- **Database:** SQLite (default) or PostgreSQL

## Features

- Full Bitwarden compatibility
- Browser extensions
- Mobile apps
- TOTP 2FA support
- Secure notes and file attachments
- Organization/team support

## Installation (Docker)

```yaml
version: '3.8'
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    environment:
      - DOMAIN=https://vault.srng.no
      - SIGNUPS_ALLOWED=false
      - ADMIN_TOKEN=your-secure-admin-token
    volumes:
      - vaultwarden-data:/data
    ports:
      - 8080:80
    restart: unless-stopped

volumes:
  vaultwarden-data:
```

## Configuration

1. **Admin Panel:**
   - Access: `https://vault.srng.no/admin`
   - Use ADMIN_TOKEN to log in

2. **Disable Public Signups:**
   - Set `SIGNUPS_ALLOWED=false`
   - Create accounts via admin panel

3. **Email Configuration:**
   - Settings → SMTP settings
   - Required for password resets

4. **Backup:**
   - Backup `/data` volume regularly
   - Contains database and attachments

## Client Setup

1. Download Bitwarden client:
   - Browser extension
   - Desktop app
   - Mobile app

2. Settings → Self-hosted server
3. Enter: `https://vault.srng.no`

## Security Best Practices

- Use strong ADMIN_TOKEN
- Enable 2FA for all accounts
- Regular backups
- Restrict access via VPN only
- Use HTTPS with valid SSL certificate

## Backup Script

```bash
#!/bin/bash
# Backup Vaultwarden data
docker exec vaultwarden sqlite3 /data/db.sqlite3 ".backup '/data/db-backup.sqlite3'"
tar -czf vaultwarden-backup-$(date +%Y%m%d).tar.gz /path/to/vaultwarden/data
```

## Related Services

- [Nginx Proxy Manager](../../proxy) - Reverse proxy with SSL
- [Authelia](../authelia) - Additional 2FA layer
