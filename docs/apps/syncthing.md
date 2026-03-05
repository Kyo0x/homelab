# Syncthing

Syncthing provides continuous, peer-to-peer file synchronization between your homelab and personal devices — no cloud needed.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8384 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  syncthing:
    image: lscr.io/linuxserver/syncthing:latest
    container_name: syncthing
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/syncthing:/config
      - /data/sync:/data
    ports:
      - 8384:8384
      - 22000:22000/tcp
      - 22000:22000/udp
      - 21027:21027/udp
    restart: unless-stopped
```

## Setup

1. Open the web UI at `http://IBM:8384` — you will be prompted to set a GUI password.
2. Note the device ID shown in the UI — you will need this to pair other devices.
3. Install Syncthing on each personal device (desktop app or mobile) and add the IBM device ID.
4. Accept the incoming device connection requests in the IBM web UI.
5. Create a shared folder pointing to `/data/sync` and share it with your connected devices.
6. Verify bidirectional sync is working by creating and editing a test file on each device.

## Links

- [Official Docs](https://docs.syncthing.net)
