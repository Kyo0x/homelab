# Authelia

Authelia provides SSO (single sign-on) and two-factor authentication in front of all internal services via Nginx Proxy Manager.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 9091 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/authelia` (config) |

## Docker Compose

```yaml
services:
  authelia:
    image: authelia/authelia:latest
    container_name: authelia
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/authelia:/config
    ports:
      - 9091:9091
    restart: unless-stopped
```

## Setup

1. Create `/data/appdata/authelia/configuration.yml` — set your `jwt_secret`, `session.secret`, and `storage.encryption_key`.
2. Define users in `users_database.yml` (file backend) or configure an LDAP backend.
3. Enable TOTP two-factor under the `authentication_backend` section and test enrollment.
4. In Nginx Proxy Manager, add Authelia as the **Access List** provider for each protected host.
5. Add `auth.srng.no` as a proxy host in NPM pointing to `http://IBM:9091`.
6. Test the full login flow — enter credentials, complete TOTP, and verify redirect to the target service.

## Configuration

Key settings in `/data/appdata/authelia/configuration.yml`:

```yaml
jwt_secret: your-very-long-random-secret

session:
  secret: another-random-secret
  domain: srng.no
  expiration: 1h
  inactivity: 5m

storage:
  encryption_key: yet-another-32-char-secret
  local:
    path: /config/db.sqlite3

authentication_backend:
  file:
    path: /config/users_database.yml
    password:
      algorithm: argon2id

totp:
  issuer: srng.no

access_control:
  default_policy: deny
  rules:
    - domain: "*.srng.no"
      policy: two_factor
    - domain: "status.srng.no"
      policy: bypass

notifier:
  filesystem:
    filename: /config/notification.txt
```

User entries in `users_database.yml`:

```yaml
users:
  aleks:
    displayname: "Aleks"
    password: "$argon2id$..."   # generate with: authelia crypto hash generate argon2
    email: aleks@example.com
    groups:
      - admins
```

Add a Redis container for session storage in production to survive restarts:

```yaml
  redis:
    image: redis:alpine
    container_name: redis
    restart: unless-stopped
```

Then add to `configuration.yml`:

```yaml
session:
  redis:
    host: redis
    port: 6379
```

## Integration

- **Nginx Proxy Manager** — add an Access List for each protected proxy host pointing to `http://authelia:9091`. Set the Authelia forward auth URL in NPM's Advanced tab:
  ```
  auth_request /authelia;
  auth_request_set $target_url $scheme://$http_host$request_uri;
  error_page 401 =302 https://auth.srng.no/?rd=$target_url;
  ```
- **All services behind VPN** — any subdomain on `srng.no` can require Authelia 2FA by adding a rule in `access_control`.

## See Also

- [Nginx Proxy Manager](nginx-proxy-manager.md) — reverse proxy that enforces Authelia
- [Official Docs](https://www.authelia.com/configuration/prologue/introduction/)
