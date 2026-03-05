# Zigbee2MQTT

Zigbee2MQTT bridges Zigbee devices to MQTT, exposing them to Home Assistant without proprietary hubs.

## Deployment

| | |
|---|---|
| **Machine** | 🍓 Raspberry Pi 4B |
| **Port** | 8080 (web UI) |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  zigbee2mqtt:
    image: koenkk/zigbee2mqtt:latest
    container_name: zigbee2mqtt
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/zigbee2mqtt:/app/data
      - /run/udev:/run/udev:ro
    devices:
      - /dev/ttyUSB0:/dev/ttyUSB0
    ports:
      - 8080:8080
    restart: unless-stopped
```

## Setup

1. Plug in your Zigbee USB coordinator (e.g. Sonoff Zigbee 3.0, HUSBZB-1) and find its device path: `ls /dev/ttyUSB*`.
2. Update `/dev/ttyUSB0` in the compose file to match your actual device path.
3. Create `/data/appdata/zigbee2mqtt/configuration.yaml` and set `mqtt.server: mqtt://pi:1883`, credentials, and `serial.port: /dev/ttyUSB0`.
4. Start the container and open the web UI at `http://pi:8080` — enable **Join mode** to pair devices.
5. Put each Zigbee device into pairing mode — they should appear in the Devices tab within seconds.
6. In Home Assistant, the MQTT integration will auto-discover all paired Zigbee devices.

## Links

- [Official Docs](https://www.zigbee2mqtt.io/guide/getting-started)
