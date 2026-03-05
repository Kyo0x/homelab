# Mosquitto

Eclipse Mosquitto is a lightweight MQTT broker that acts as the message bus for all IoT devices and home automation services.

## Deployment

| | |
|---|---|
| **Host** | Raspberry Pi 4B |
| **Port** | 1883 (MQTT), 9001 (WebSocket) |
| **Access** | 🔒 VPN |

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
      - 9001:9001
    restart: unless-stopped
```

## Setup

1. Create `/data/appdata/mosquitto/config/mosquitto.conf` with `listener 1883`, `allow_anonymous false`, and `password_file /mosquitto/config/passwd`.
2. Create a password file: `docker exec mosquitto mosquitto_passwd -c /mosquitto/config/passwd mqtt_user`.
3. Restart Mosquitto and test the connection: `mosquitto_pub -h pi -u mqtt_user -P yourpass -t test -m hello`.
4. In Home Assistant, add the MQTT integration pointing to `pi:1883` with your credentials.
5. Configure Zigbee2MQTT to use the same broker for Zigbee device events.
6. Enable WebSocket listener on port 9001 if any browser-based MQTT clients are needed.

## Links

- [Official Docs](https://mosquitto.org/documentation)
