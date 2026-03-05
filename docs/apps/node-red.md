# Node-RED

Node-RED is a flow-based visual programming tool for wiring together IoT devices, APIs, and home automation logic.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 1880 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/node-red` (flows + settings) |

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

## Configuration

Edit `/data/appdata/node-red/settings.js` to enable authentication:

```js
adminAuth: {
    type: "credentials",
    users: [{
        username: "admin",
        password: "$2b$08$...",  // bcrypt hash — generate with: node -e "console.log(require('bcryptjs').hashSync('yourpass', 8))"
        permissions: "*"
    }]
},
```

**Key palette packages to install** (via Manage Palette):

| Package | Purpose |
|---|---|
| `node-red-contrib-home-assistant-websocket` | Home Assistant integration |
| `node-red-node-email` | Send email notifications |
| `node-red-contrib-telegrambot` | Send Telegram messages |
| `node-red-contrib-cron-plus` | Advanced cron scheduling |

## Integration

- **Home Assistant** — connect via the HA WebSocket node; paste a long-lived access token from **HA → Profile → Long-Lived Access Tokens**. Use `call service`, `get entities`, and `events` nodes to drive automations.
- **Mosquitto** — use the built-in MQTT `in` and `out` nodes; set broker to `pi:1883` with the MQTT username/password created in Mosquitto.
- **Gitea** — enable the **Projects** feature in Node-RED settings and push flows to a Gitea repository for version control.

## See Also

- [Home Assistant](home-assistant.md) — primary automation target
- [Mosquitto](mosquitto.md) — MQTT message bus
- [Official Docs](https://nodered.org/docs)
