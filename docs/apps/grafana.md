# Grafana

Grafana renders beautiful, interactive metrics dashboards from Prometheus and other data sources.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 3000 |
| **Access** | 🌐 Public — `monitor.srng.no` |

## Docker Compose

```yaml
services:
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    environment:
      - TZ=Europe/Oslo
      - GF_SECURITY_ADMIN_PASSWORD=changeme
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - /data/appdata/grafana:/var/lib/grafana
    ports:
      - 3000:3000
    restart: unless-stopped
```

## Setup

1. Open Grafana at `http://IBM:3000` — default login is `admin` / `changeme` (or your set password).
2. Go to **Connections → Data Sources** and add Prometheus at `http://prometheus:9090`.
3. Import the **Node Exporter Full** dashboard using Dashboard ID `1860`.
4. Import additional dashboards for Docker, Pi-hole, and other services as needed.
5. Configure alert rules under **Alerting → Alert Rules** and set up a notification channel (email, Telegram).
6. Expose `monitor.srng.no` via Nginx Proxy Manager with Authelia SSO protection.

## Links

- [Official Docs](https://grafana.com/docs/grafana/latest)
