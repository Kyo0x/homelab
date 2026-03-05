# Nginx Proxy Manager

Nginx Proxy Manager provides a clean web UI for managing reverse proxy hosts and automatically provisioning Let's Encrypt SSL certificates.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 81 (admin UI) |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/npm/data` (DB + certs), `/data/appdata/npm/letsencrypt` |

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

## Configuration

**Wildcard SSL certificate** — request once, reuse for all subdomains:

1. **SSL Certificates → Add SSL Certificate → Let's Encrypt**
2. Domain: `*.srng.no` and `srng.no`
3. DNS Challenge: choose your DNS provider (Cloudflare, etc.) and enter API token.
4. Click **Save** — cert is auto-renewed before expiry.

**Authelia forward auth** — on any proxy host that requires SSO, open **Advanced** tab and paste:

```nginx
auth_request /authelia;
auth_request_set $target_url $scheme://$http_host$request_uri;
error_page 401 =302 https://auth.srng.no/?rd=$target_url;

location /authelia {
    internal;
    proxy_pass http://authelia:9091/api/verify;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URL $scheme://$http_host$request_uri;
}
```

**Access Lists** — create one named "VPN Only" and attach it to any proxy host that should only be reachable from inside the VPN/LAN. This adds HTTP basic auth as a second gate.

**Proxy Host checklist:**

- [ ] Forward Hostname/IP: container name or LAN IP
- [ ] Scheme: `http` (NPM terminates TLS)
- [ ] SSL Certificate: `*.srng.no` wildcard
- [ ] Force SSL: ✅
- [ ] HTTP/2 Support: ✅
- [ ] Block Common Exploits: ✅

## Integration

- **Authelia** — all SSO-protected services route through Authelia via NPM's Advanced tab forward auth config.
- **Cloudflare** — DNS A records for `*.srng.no` point to the public IP of the IBM server; NPM handles TLS termination.
- **CrowdSec** — NPM can feed access logs to CrowdSec for real-time IP ban enforcement.

## See Also

- [Authelia](authelia.md) — SSO/2FA layer enforced through NPM
- [CrowdSec](crowdsec.md) — threat intelligence fed from NPM logs
- [Cloudflare Tunnel](cloudflare-tunnel.md) — alternative for exposing services without opening firewall ports
- [Official Docs](https://nginxproxymanager.com/guide)
