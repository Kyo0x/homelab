# Prometheus

Prometheus scrapes and stores time-series metrics from all machines and services in the homelab.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 9090 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - /data/appdata/prometheus/data:/prometheus
    ports:
      - 9090:9090
    command:
      - --config.file=/etc/prometheus/prometheus.yml
      - --storage.tsdb.retention.time=30d
    restart: unless-stopped
```

## Setup

1. Create `/data/appdata/prometheus/prometheus.yml` with scrape configs for each machine's Node Exporter.
2. Install Node Exporter on IBM, Ubuntu, and Pi 4B — default port is `9100`.
3. Start Prometheus and verify targets are `UP` at `http://IBM:9090/targets`.
4. Add `cAdvisor` on each Docker host to scrape container metrics.
5. Connect Prometheus to Grafana as a data source for dashboard visualisation.
6. Set `--storage.tsdb.retention.time=30d` (or higher) to control local disk usage.

## Links

- [Official Docs](https://prometheus.io/docs/introduction/overview)
