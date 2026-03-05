# NetBird

NetBird is a self-hosted WireGuard-based mesh VPN that connects all homelab machines and personal devices into a private network.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 443 (management), 10000 (signal), 3478 (STUN/TURN) |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  netbird-management:
    image: netbirdio/management:latest
    container_name: netbird-management
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/appdata/netbird/management:/var/lib/netbird
    ports:
      - 443:443
      - 10000:10000
    restart: unless-stopped

  netbird-signal:
    image: netbirdio/signal:latest
    container_name: netbird-signal
    volumes:
      - /data/appdata/netbird/signal:/var/lib/netbird
    ports:
      - 10001:10001
    restart: unless-stopped
```

## Setup

1. Configure an identity provider (Zitadel self-hosted or use NetBird Cloud free tier temporarily).
2. Set up the management and signal containers, then open the dashboard.
3. Install the NetBird client on IBM, Ubuntu Server, and Raspberry Pi 4B.
4. Install the NetBird client on personal devices (phone, laptop) and enroll each one.
5. Verify mesh connectivity between all nodes with `netbird status`.
6. Configure network policies in the dashboard so VPN-only services are unreachable without NetBird.

## Links

- [Official Docs](https://docs.netbird.io)
