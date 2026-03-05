# Nginx Proxy Manager

Nginx Proxy Manager provides a clean web UI for managing reverse proxy hosts and automatically provisioning Let's Encrypt SSL certificates.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 81 (admin UI) |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/npm/data:/data
      - /data/appdata/npm/letsencrypt:/etc/letsencrypt
    ports:
      - 80:80
      - 81:81
      - 443:443
    restart: unless-stopped
```

## Setup

1. Open the admin UI at `http://IBM:81` — default login is `admin@example.com` / `changeme`.
2. Change the admin email and password immediately after first login.
3. Go to **SSL Certificates → Add Certificate** and request a wildcard cert for `*.srng.no` via DNS challenge.
4. Create a **Proxy Host** for each service — set the SSL certificate and enable **Force SSL**.
5. For VPN-only services, ensure they are not reachable on port 443 from the public internet (firewall rule).
6. Test each proxy host from both inside and outside VPN to confirm access controls are working.

## Links

- [Official Docs](https://nginxproxymanager.com/guide)
