# Node-RED

Node-RED is a flow-based visual programming tool for wiring together IoT devices, APIs, and home automation logic.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 1880 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  node-red:
    image: nodered/node-red:latest
    container_name: node-red
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/node-red:/data
    ports:
      - 1880:1880
    restart: unless-stopped
```

## Setup

1. Start the container and open Node-RED at `http://IBM:1880`.
2. Install the `node-red-contrib-home-assistant-websocket` palette from the **Manage palette** menu.
3. Add a **Server** node pointing to your Home Assistant instance with a long-lived access token.
4. Build a simple flow — trigger a HA service call on an MQTT message to verify the integration.
5. Enable authentication by editing `settings.js` (found in `/data/appdata/node-red/`) and setting `adminAuth`.
6. Use the **Projects** feature to back up your flows to Gitea.

## Links

- [Official Docs](https://nodered.org/docs)
