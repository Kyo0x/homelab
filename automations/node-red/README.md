# Node-RED

Visual programming tool for wiring together hardware devices, APIs, and online services.

## Overview

Node-RED provides a browser-based flow editor for creating automations using a visual drag-and-drop interface. Perfect for complex automation logic and integrations.

## Deployment

- **Host:** IBM Server (Proxmox VM/LXC)
- **Access:** 🔒 VPN — Internal only
- **Port:** 1880

## Features

- Visual flow-based programming
- Extensive node library
- MQTT support
- HTTP APIs
- Database integration
- Home Assistant integration

## Installation (Docker)

```yaml
version: '3.8'
services:
  node-red:
    image: nodered/node-red:latest
    container_name: node-red
    environment:
      - TZ=Europe/Oslo
    volumes:
      - node-red-data:/data
    ports:
      - 1880:1880
    restart: unless-stopped

volumes:
  node-red-data:
```

## Configuration

1. Access: `http://server-ip:1880`
2. Enable authentication:
   - Edit `settings.js`
   - Set `adminAuth` section

## Popular Nodes

Install via Manage Palette:
- `node-red-contrib-home-assistant-websocket` - Home Assistant
- `node-red-dashboard` - UI dashboard
- `node-red-contrib-telegrambot` - Telegram notifications
- `node-red-contrib-influxdb` - Time-series database

## Example Flows

### Motion Detection Alert
```
[MQTT In] → [Switch] → [Change] → [Telegram Out]
```

### Temperature Monitoring
```
[Home Assistant] → [Function] → [InfluxDB] → [Grafana]
```

### Daily Report
```
[Inject (cron)] → [HTTP Request] → [Template] → [Email]
```

## Integration with Home Assistant

1. Install HA node
2. Add HA server config
3. Use entity nodes for states
4. Call services for actions

## Dashboard

Create custom dashboards:
- Gauges, charts, sliders
- Buttons for manual control
- Live data visualization

## Backup

Backup `/data` volume regularly:
```bash
docker cp node-red:/data ./node-red-backup
```

## Related Services

- [Home Assistant](../../homeassistant) - Smart home hub
- [Mosquitto](../../apps/mosquitto) - MQTT broker
- [InfluxDB](../../monitoring/influxdb) - Time-series database
