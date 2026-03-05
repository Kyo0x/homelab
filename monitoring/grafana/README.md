# Grafana + Prometheus

Metrics collection, storage, and visualization platform.

## Overview

Grafana provides beautiful dashboards for visualizing metrics collected by Prometheus from all homelab machines.

## Deployment

- **Host:** IBM Server (Proxmox VM/LXC)
- **Access:** 🔒 VPN — `monitor.srng.no`
- **Ports:** 
  - Grafana: 3000
  - Prometheus: 9090

## Features

- Real-time metrics dashboards
- Alerting
- Multiple data sources
- Template variables
- Custom dashboards

## Installation (Docker Compose)

```yaml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    ports:
      - 9090:9090
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=changeme
    volumes:
      - grafana-data:/var/lib/grafana
    ports:
      - 3000:3000
    restart: unless-stopped

volumes:
  prometheus-data:
  grafana-data:
```

## Prometheus Configuration

`prometheus.yml`:
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter-ibm'
    static_configs:
      - targets: ['192.168.1.100:9100']

  - job_name: 'node-exporter-ubuntu'
    static_configs:
      - targets: ['192.168.1.50:9100']

  - job_name: 'node-exporter-pi'
    static_configs:
      - targets: ['192.168.1.X:9100']
```

## Node Exporter Setup

On each machine:
```bash
# Docker
docker run -d \
  --name=node-exporter \
  --net="host" \
  --pid="host" \
  -v "/:/host:ro,rslave" \
  prom/node-exporter:latest \
  --path.rootfs=/host
```

## Grafana Dashboards

Popular dashboards:
- Node Exporter Full (ID: 1860)
- Docker Container Metrics (ID: 193)
- Proxmox Dashboard
- ZFS Monitoring

Import: Dashboard → Import → Enter ID

## Alerts

Configure in Grafana:
- High CPU usage
- Low disk space
- Service down
- High memory usage

## Related Services

- [Netdata](../netdata) - Real-time per-node monitoring
- [Uptime Kuma](../uptime-kuma) - Service uptime tracking
