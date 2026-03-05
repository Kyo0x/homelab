# Authelia

Authelia provides SSO (single sign-on) and two-factor authentication in front of all internal services via Nginx Proxy Manager.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 9091 |
| **Access** | 🔒 VPN |

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

## Links

- [Official Docs](https://www.authelia.com/configuration/prologue/introduction/)
