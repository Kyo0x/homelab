# NetBird

Self-hosted mesh VPN with WireGuard.

## Overview

NetBird creates a secure mesh VPN connecting all homelab machines and personal devices. Self-hosted control plane for full privacy.

## Deployment

- **Host:** IBM Server (Proxmox VM/LXC)
- **Access:** 🔒 VPN — Management UI
- **Ports:**
  - Management: 443
  - Signal: 10000
  - TURN/STUN: 3478

## Features

- WireGuard-based mesh VPN
- NAT traversal
- Access control policies
- DNS management
- Activity monitoring
- SSO support

## Installation (Docker Compose)

```yaml
version: '3.8'
services:
  management:
    image: netbirdio/management:latest
    container_name: netbird-management
    environment:
      - NETBIRD_DOMAIN=netbird.srng.no
      - NETBIRD_AUTH_ISSUER=https://netbird.srng.no
    volumes:
      - netbird-mgmt:/var/lib/netbird
    ports:
      - 443:443
    restart: unless-stopped

  signal:
    image: netbirdio/signal:latest
    container_name: netbird-signal
    ports:
      - 10000:10000
    restart: unless-stopped

  coturn:
    image: coturn/coturn:latest
    container_name: netbird-coturn
    environment:
      - TURN_USERNAME=netbird
      - TURN_PASSWORD=changeme
    ports:
      - 3478:3478/udp
      - 3478:3478/tcp
    restart: unless-stopped

volumes:
  netbird-mgmt:
```

## Client Installation

### Linux
```bash
curl -fsSL https://pkgs.netbird.io/install.sh | sh
netbird up --management-url https://netbird.srng.no
```

### Windows/macOS
- Download from netbird.io
- Configure management URL

### Mobile
- Install NetBird app
- Scan QR code or enter setup key

## Network Configuration

### Subnet Allocation
- NetBird network: `100.64.0.0/10`
- IBM Server: `100.64.0.1`
- Ubuntu Server: `100.64.0.2`
- Raspberry Pi: `100.64.0.3`
- Personal devices: Auto-assigned

## Access Control

### Setup Rules
1. **Access Control → Add Rule**
2. Groups:
   - `servers` - All servers
   - `admins` - Admin devices
   - `users` - Regular devices
3. Example rule:
   - Allow `admins` → `servers` (all ports)
   - Allow `users` → `servers` (limited ports)

## DNS Configuration

1. **DNS → Add Nameserver**
2. Groups: Apply to all clients
3. Add internal DNS entries:
   ```
   plex.internal → 100.64.0.2
   vault.internal → 100.64.0.1
   ```

## Monitoring

- Activity → View connection logs
- Peers → Check online status
- Routes → Monitor traffic

## Backup

Backup management database:
```bash
docker exec netbird-management \
  tar czf /tmp/netbird-backup.tar.gz /var/lib/netbird
docker cp netbird-management:/tmp/netbird-backup.tar.gz ./
```

## Security

- Rotate setup keys regularly
- Use SSO if possible (Google, GitHub)
- Monitor peer connections
- Review access policies

## Split Tunneling

Configure routes for:
- Route homelab subnet via NetBird
- Other traffic via default gateway

## Related Services

- [Nginx Proxy Manager](../proxy/nginx-proxy-manager) - Access services via VPN
- All homelab services require VPN connection
