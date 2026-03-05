# CrowdSec

CrowdSec is a collaborative intrusion prevention system that analyzes logs and automatically bans malicious IPs via a shared blocklist.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 8080 (local API) |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  crowdsec:
    image: crowdsecurity/crowdsec:latest
    container_name: crowdsec
    environment:
      - TZ=Europe/Oslo
      - GID=1000
      - COLLECTIONS=crowdsecurity/nginx-proxy-manager
    volumes:
      - /data/appdata/crowdsec/data:/var/lib/crowdsec/data
      - /data/appdata/crowdsec/config:/etc/crowdsec
      - /data/appdata/npm/data/logs:/var/log/npm:ro
    ports:
      - 8080:8080
    restart: unless-stopped

  crowdsec-bouncer-npm:
    image: wallarm/njs-crowdsec-nginx-module:latest
    container_name: crowdsec-bouncer
    environment:
      - API_URL=http://crowdsec:8080
      - API_KEY=changeme
    restart: unless-stopped
```

## Setup

1. Start CrowdSec and register with the central API: `docker exec crowdsec cscli console enroll <token>`.
2. Verify the NPM collection is installed: `docker exec crowdsec cscli collections list`.
3. Add the NPM bouncer: `docker exec crowdsec cscli bouncers add npm-bouncer` and copy the API key.
4. Set the bouncer API key in the bouncer container environment and restart it.
5. Tail the CrowdSec log to confirm decisions are being processed: `docker logs -f crowdsec`.
6. Check the CrowdSec dashboard or use `cscli decisions list` to view active bans.

## Links

- [Official Docs](https://docs.crowdsec.net)
