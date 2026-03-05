# Zigbee2MQTT

Zigbee2MQTT bridges Zigbee devices to MQTT, exposing them to Home Assistant without proprietary hubs.

## Deployment

| | |
|---|---|
| **Machine** | 🍓 Raspberry Pi 4B |
| **Port** | 8092 (web UI) |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/zigbee2mqtt` (config + device DB) |

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
      - 8092:8092
    restart: unless-stopped
```

## Setup

1. Plug in your Zigbee USB coordinator (e.g. Sonoff Zigbee 3.0, HUSBZB-1) and find its device path: `ls /dev/ttyUSB*`.
2. Update `/dev/ttyUSB0` in the compose file to match your actual device path.
3. Create `/data/appdata/zigbee2mqtt/configuration.yaml` and set `mqtt.server: mqtt://pi:1883`, credentials, and `serial.port: /dev/ttyUSB0`.
4. Start the container and open the web UI at `http://pi:8092` — enable **Join mode** to pair devices.
5. Put each Zigbee device into pairing mode — they should appear in the Devices tab within seconds.
6. In Home Assistant, the MQTT integration will auto-discover all paired Zigbee devices.

## Configuration

Full `/data/appdata/zigbee2mqtt/configuration.yaml`:

```yaml
homeassistant: true          # Enable HA MQTT discovery

permit_join: false           # Disable after initial pairing

mqtt:
  base_topic: zigbee2mqtt
  server: mqtt://pi:1883
  user: zigbee2mqtt
  password: your-mqtt-password

serial:
  port: /dev/ttyUSB0         # Adjust to your coordinator device path
  # adapter: ezsp            # Uncomment for HUSBZB-1 or similar

advanced:
  log_level: info
  network_key: GENERATE      # Replace with actual key after first run
  channel: 25                # Channels 15, 20, 25 avoid 2.4 GHz WiFi interference

frontend:
  port: 8092
  auth_token: your-secret-token   # Secures the web UI

device_options:
  retain: false
```

**Find your coordinator device path:**

```bash
# List USB serial devices
ls -la /dev/serial/by-id/
# Or
dmesg | grep ttyUSB
```

**Pairing new devices:**

1. Open the Zigbee2MQTT web UI at `http://pi:8092`.
2. Click **Permit join (All)** — green timer appears.
3. Put the Zigbee device in pairing mode (usually hold reset button).
4. Device appears in the **Devices** tab — rename it immediately.
5. Disable **Permit join** when done.

## Integration

- **Mosquitto** — all Zigbee events are published to the MQTT broker; set `mqtt.server` to `mqtt://pi:1883`.
- **Home Assistant** — with `homeassistant: true`, devices auto-appear via MQTT discovery — no manual HA config needed.
- **Node-RED** — subscribe to `zigbee2mqtt/+` topics to build custom device automations.

## See Also

- [Mosquitto](mosquitto.md) — MQTT broker Zigbee2MQTT publishes to
- [Home Assistant](home-assistant.md) — consumes Zigbee devices via MQTT discovery
- [Official Docs](https://www.zigbee2mqtt.io/guide/getting-started)
