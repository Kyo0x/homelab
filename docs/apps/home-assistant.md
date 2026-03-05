# Home Assistant

Home Assistant is an open-source home automation platform that integrates and controls all your smart home devices locally.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8123 |
| **Access** | 🌐 Public — `home.srng.no` |

## Docker Compose

```yaml
services:
  home-assistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    container_name: home-assistant
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/homeassistant:/config
    ports:
      - 8123:8123
    network_mode: host
    privileged: true
    restart: unless-stopped
```

## Setup

1. Start the container and open Home Assistant at `http://IBM:8123` — create the owner account.
2. Complete the onboarding wizard and let Home Assistant auto-discover devices on your network.
3. Go to **Settings → Devices & Services** and add integrations for your smart devices.
4. Connect to Mosquitto MQTT broker under **Settings → Devices & Services → MQTT**.
5. Install the **Node-RED Companion** integration for advanced automation flows.
6. Expose `home.srng.no` via Nginx Proxy Manager, ensuring trusted proxy headers are configured in `configuration.yaml`.

## Links

- [Official Docs](https://www.home-assistant.io/docs)
