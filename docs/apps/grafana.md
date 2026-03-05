# Grafana

Grafana renders beautiful, interactive metrics dashboards from Prometheus and other data sources.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 3000 |
| **Access** | 🌐 Public — `monitor.srng.no` |
| **Storage** | `/data/appdata/grafana` (data) |

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

## Configuration

Key environment variables:

| Variable | Purpose |
|---|---|
| `GF_SECURITY_ADMIN_PASSWORD` | Admin password (change from `changeme`) |
| `GF_USERS_ALLOW_SIGN_UP` | Set to `false` to prevent self-registration |
| `GF_SERVER_ROOT_URL` | Set to `https://monitor.srng.no` for correct redirects |
| `GF_SMTP_ENABLED` | Enable email for alert notifications |

**Recommended dashboard IDs to import:**

| Dashboard | ID |
|---|---|
| Node Exporter Full | `1860` |
| Docker Container & Host Metrics | `179` |
| Pi-hole | `10176` |
| Netdata (if using) | `809` |
| Uptime Kuma | `18278` |

**Prometheus datasource** (added via UI or provisioning at `/etc/grafana/provisioning/datasources/`):

```yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true
```

## Integration

- **Prometheus** — primary data source; all dashboards query Prometheus metrics.
- **Alertmanager / Grafana Alerting** — define alert rules in **Alerting → Alert Rules**; route to email, Telegram, or Discord notification channels.
- **Authelia** — protect `monitor.srng.no` behind SSO via Nginx Proxy Manager access list.
- **Netdata** — can forward metrics to Prometheus for unified dashboard coverage.

## See Also

- [Prometheus](prometheus.md) — metrics backend for Grafana
- [Netdata](netdata.md) — complementary real-time monitoring
- [Authelia](authelia.md) — SSO protection for public dashboard
- [Official Docs](https://grafana.com/docs/grafana/latest)
