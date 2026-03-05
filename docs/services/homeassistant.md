# Home Assistant

Open-source home automation platform.

## Overview

Home Assistant is the central hub for all smart home devices and automations, providing a unified interface for controlling lights, sensors, cameras, and more.

## Deployment

- **Host:** IBM Server (Proxmox VM recommended)
- **Access:** 🔒 VPN — `home.srng.no`
- **Port:** 8123

## Features

- 2000+ integrations
- Local control (no cloud required)
- Powerful automations
- Voice assistant support (Alexa, Google, Siri)
- Energy monitoring
- Custom dashboards

## Installation Options

### Option 1: Home Assistant OS (Recommended for Proxmox)

1. Download QCOW2 image from home-assistant.io
2. Import to Proxmox
3. Assign 2GB RAM, 2 CPU cores
4. Start VM

### Option 2: Docker (Supervised)

```yaml
version: '3.8'
services:
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    container_name: homeassistant
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /path/to/homeassistant/config:/config
      - /etc/localtime:/etc/localtime:ro
    network_mode: host
    restart: unless-stopped
```

## Initial Configuration

1. Access: `http://server-ip:8123`
2. Create owner account
3. Set up location and units
4. Discover devices on network

## Integrations

### Popular Integrations:
- **Zigbee/Z-Wave:** Zigbee2MQTT, ZHA
- **Lights:** Philips Hue, LIFX
- **Media:** Plex, Spotify, Sonos
- **Weather:** Met.no, OpenWeatherMap
- **Notifications:** Mobile app, Telegram, Discord
- **Surveillance:** Frigate NVR
- **Network:** UniFi, Pi-hole

## Automations

Example automation (lights on at sunset):
```yaml
automation:
  - alias: "Lights on at sunset"
    trigger:
      platform: sun
      event: sunset
    action:
      service: light.turn_on
      entity_id: light.living_room
```

## Add-ons (Home Assistant OS)

- **File Editor** - Edit config files
- **Samba Share** - Access config via network
- **Mosquitto MQTT Broker** - MQTT support
- **ESPHome** - ESP32/ESP8266 management
- **Node-RED** - Visual automation

## Voice Assistants

- **Nabu Casa Cloud** (paid) - Easy Alexa/Google setup
- **Self-hosted:** Use Wyoming protocol or Rhasspy

## Backup

- Settings → System → Backups
- Schedule automatic backups
- Store on NFS share or cloud

## Dashboard Customization

- Use Lovelace UI
- HACS for custom cards
- Mushroom cards for modern UI
- Layout-card for advanced layouts

## Related Services

- [Node-RED](../automations/node-red) - Visual automation
- [Mosquitto](../apps/mosquitto) - MQTT broker
- [Zigbee2MQTT](../apps/zigbee2mqtt) - Zigbee devices
- [Frigate](../surveillance/frigate) - Camera integration
