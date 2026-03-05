# Home Assistant

Home Assistant is an open-source home automation platform that integrates and controls all your smart home devices locally.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 8123 |
| **Access** | 🌐 Public — `home.srng.no` |
| **Storage** | `/data/appdata/homeassistant` (config) |

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

## Configuration

Add to `/data/appdata/homeassistant/configuration.yaml` to trust the NPM reverse proxy:

```yaml
homeassistant:
  external_url: "https://home.srng.no"
  internal_url: "http://192.168.1.x:8123"

http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 172.16.0.0/12   # Docker bridge network range
```

**Useful HACS integrations to install** (Home Assistant Community Store):

- `browser_mod` — turn any browser into a dashboard display
- `scheduler-component` — time-based automation scheduler
- `spotcast` — cast Spotify to Chromecast devices
- `adaptive_lighting` — circadian rhythm lighting automation

**`secrets.yaml`** — store sensitive values here and reference with `!secret key_name`:

```yaml
mqtt_password: "your-mqtt-password"
latitude: "59.9139"
longitude: "10.7522"
```

## Integration

- **Mosquitto** — MQTT broker; add the MQTT integration under **Settings → Devices & Services → MQTT** pointing to `pi:1883`.
- **Zigbee2MQTT** — devices auto-discovered via MQTT discovery; no extra HA config needed once MQTT is set up.
- **Node-RED** — install `node-red-contrib-home-assistant-websocket`; HA generates long-lived access tokens under **Profile → Long-Lived Access Tokens**.
- **Nginx Proxy Manager** — expose `home.srng.no` publicly; set `trusted_proxies` to the Docker subnet in `configuration.yaml`.

## See Also

- [Mosquitto](mosquitto.md) — MQTT broker for device events
- [Zigbee2MQTT](zigbee2mqtt.md) — Zigbee coordinator bridge
- [Node-RED](node-red.md) — visual automation flows
- [Official Docs](https://www.home-assistant.io/docs)
