# qBittorrent

BitTorrent client with web interface, running behind ProtonVPN.

## Overview

qBittorrent is the download client for all *arr applications, configured to route all traffic through ProtonVPN for privacy.

## Deployment

- **Host:** Ubuntu Server
- **VPN:** ProtonVPN (all traffic routed through VPN)
- **Access:** 🔒 VPN — Internal only (192.168.1.50:8080)
- **Downloads:** Saved to `/mnt/media/Downloads` (NFS mount from IBM)

## Features

- Web-based interface
- RSS feed support
- Sequential downloading
- IP binding (VPN-only)
- Automatic torrent management

## Installation

```bash
# On Ubuntu Server
sudo apt update
sudo apt install qbittorrent-nox
```

## ProtonVPN Setup

```bash
# Install ProtonVPN CLI
sudo apt install protonvpn-cli

# Initialize and connect
protonvpn init
protonvpn connect --fastest
```

## Configuration

1. **Network Binding:**
   - Settings → Advanced → Network Interface
   - Select ProtonVPN interface (usually `proton0` or `tun0`)

2. **Download Path:**
   - Settings → Downloads → Default Save Path: `/mnt/media/Downloads`

3. **Web UI:**
   - Settings → Web UI
   - Enable authentication
   - Set username/password

4. **Connection Limits:**
   - Global max connections: 500
   - Per-torrent connections: 100

## VPN Kill Switch

Ensure qBittorrent only uses VPN interface:

```bash
# Add to systemd service
[Service]
ExecStartPre=/bin/bash -c 'while ! ip a show proton0; do sleep 1; done'
```

## Maintenance

- Monitor VPN connection status
- Check ProtonVPN port forwarding
- Clear completed torrents periodically

## Related Services

- [Sonarr](../sonarr) - Sends TV torrents
- [Radarr](../radarr) - Sends movie torrents
- [Lidarr](../lidarr) - Sends music torrents
