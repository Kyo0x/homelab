# Netdata

Netdata delivers real-time, per-second performance monitoring with zero configuration for hosts and containers.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server + 🖧 Ubuntu Server |
| **Port** | 19999 |
| **Access** | 🔒 VPN |

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

## Links

- [Official Docs](https://learn.netdata.cloud/docs)
