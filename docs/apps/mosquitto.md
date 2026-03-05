# Mosquitto

Eclipse Mosquitto is a lightweight MQTT broker that acts as the message bus for all IoT devices and home automation services.

## Deployment

| | |
|---|---|
| **Machine** | 🍓 Raspberry Pi 4B |
| **Port** | 1883 (MQTT), 8883 (MQTT TLS) |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/mosquitto` (config, data, log) |

## Docker Compose

```yaml
services:
  mosquitto:
    image: eclipse-mosquitto:latest
    container_name: mosquitto
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/mosquitto/config:/mosquitto/config
      - /data/appdata/mosquitto/data:/mosquitto/data
      - /data/appdata/mosquitto/log:/mosquitto/log
    ports:
      - 1883:1883
      - 8883:8883
    restart: unless-stopped
```

## Setup

1. Create `/data/appdata/mosquitto/config/mosquitto.conf` with `listener 1883`, `allow_anonymous false`, and `password_file /mosquitto/config/passwd`.
2. Create a password file: `docker exec mosquitto mosquitto_passwd -c /mosquitto/config/passwd mqtt_user`.
3. Restart Mosquitto and test the connection: `mosquitto_pub -h pi -u mqtt_user -P yourpass -t test -m hello`.
4. In Home Assistant, add the MQTT integration pointing to `pi:1883` with your credentials.
5. Configure Zigbee2MQTT to use the same broker for Zigbee device events.
6. Enable TLS listener on port 8883 if any browser-based MQTT clients are needed.

## Configuration

Full `/data/appdata/mosquitto/config/mosquitto.conf`:

```conf
# Listeners
listener 1883
listener 8883
protocol websockets

# Security — require authentication
allow_anonymous false
password_file /mosquitto/config/passwd

# Persistence
persistence true
persistence_location /mosquitto/data/

# Logging
log_dest file /mosquitto/log/mosquitto.log
log_type error
log_type warning
log_type information

# Connection limits
max_connections 100
```

**Create / manage users:**

```bash
# Create new user (prompts for password)
docker exec mosquitto mosquitto_passwd -c /mosquitto/config/passwd mqtt_user

# Add additional user (no -c flag — avoids overwriting)
docker exec mosquitto mosquitto_passwd /mosquitto/config/passwd zigbee2mqtt

# Reload config without restart
docker exec mosquitto kill -HUP 1
```

**Verify connectivity:**

```bash
# Subscribe (in one terminal)
mosquitto_sub -h pi -u mqtt_user -P yourpass -t "#" -v

# Publish test message (in another)
mosquitto_pub -h pi -u mqtt_user -P yourpass -t homeassistant/test -m "hello"
```

## Integration

- **Home Assistant** — add MQTT integration via **Settings → Devices & Services**; broker `pi`, port `1883`, username/password as configured.
- **Zigbee2MQTT** — set `mqtt.server: mqtt://pi:1883` in `configuration.yaml`; use a dedicated `zigbee2mqtt` MQTT user.
- **Node-RED** — add an MQTT broker node pointing to `pi:1883`; use for custom automation message routing.

## See Also

- [Zigbee2MQTT](zigbee2mqtt.md) — Zigbee-to-MQTT bridge
- [Home Assistant](home-assistant.md) — primary MQTT consumer
- [Node-RED](node-red.md) — MQTT flow automation
- [Official Docs](https://mosquitto.org/documentation)
