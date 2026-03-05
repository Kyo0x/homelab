# Netdata

Netdata delivers real-time, per-second performance monitoring with zero configuration for hosts and containers.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server + 🖧 Ubuntu Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) on IBM |
| **Port** | 19999 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/netdata` (config, lib, cache) |

## Docker Compose

```yaml
services:
  netdata:
    image: netdata/netdata:latest
    container_name: netdata
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/netdata/config:/etc/netdata
      - /data/appdata/netdata/lib:/var/lib/netdata
      - /data/appdata/netdata/cache:/var/cache/netdata
      - /etc/passwd:/host/etc/passwd:ro
      - /etc/group:/host/etc/group:ro
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /etc/os-release:/host/etc/os-release:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 19999:19999
    cap_add:
      - SYS_PTRACE
      - SYS_ADMIN
    security_opt:
      - apparmor:unconfined
    restart: unless-stopped
```

## Setup

1. Deploy this compose on both IBM and Ubuntu Server — each host gets its own Netdata instance.
2. Open the local dashboard at `http://IBM:19999` to verify metrics collection is working.
3. Optionally claim both nodes to **Netdata Cloud** (free tier) for a unified multi-node view.
4. Configure alert thresholds in `/data/appdata/netdata/config/health.d/` for CPU, RAM, and disk.
5. Set up notification channels under `health_alarm_notify.conf` for email or Slack.
6. Access `http://ubuntu:19999` on the Ubuntu host to see GPU and NVIDIA stats.

## Configuration

**Custom alert thresholds** — create override files in `/data/appdata/netdata/config/health.d/`:

```conf
# /data/appdata/netdata/config/health.d/disk.conf
alarm: disk_space_usage
    on: disk.space
    lookup: average -10m percentage of used
    units: %
    every: 1m
    warn: $this > 80
    crit: $this > 90
    info: disk space utilization
```

**Notification channels** — edit `health_alarm_notify.conf`:

```bash
# Telegram
SEND_TELEGRAM="YES"
TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_CHAT_ID="your-chat-id"

# Email
SEND_EMAIL="YES"
DEFAULT_RECIPIENT_EMAIL="aleks@example.com"
```

**Disable cloud / reduce telemetry** — add to the compose environment:

```yaml
    environment:
      - DO_NOT_TRACK=1
```

**NVIDIA GPU metrics** (Ubuntu Server) — Netdata auto-detects NVIDIA GPUs when the NVIDIA driver is present. No extra config needed; GPU charts appear automatically.

## Integration

- **Grafana** — Netdata can expose a Prometheus-compatible scrape endpoint; add it as a Grafana datasource for unified dashboards. Enable in `netdata.conf`: `[backend] enabled = yes; type = prometheus`.
- **Prometheus** — alternatively, use the Netdata Prometheus exporter and scrape it from Prometheus.
- **Homepage** — embed the Netdata per-host widget in the dashboard for at-a-glance system health.

## See Also

- [Grafana](grafana.md) — centralised metrics dashboards
- [Prometheus](prometheus.md) — time-series metrics backend
- [Official Docs](https://learn.netdata.cloud/docs)
