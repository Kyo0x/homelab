# Wings (Pelican Node Daemon)

Wings is the node-side daemon for Pelican Panel. It runs on the `gameservers` VM, manages Docker containers per game server, enforces resource limits, handles file management, and streams logs and console output back to the Panel.

> **Wings lives in the `gameservers` VM — fully isolated from your personal services.**

## Deployment

| Property | Value |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `gameservers` VM (Ubuntu 22.04) |
| **Access** | Internal — Panel communicates with Wings over port 8080 |
| **Requires** | Docker, [Pelican Panel](pelican.md) |

## Prerequisites

Wings requires Docker installed directly on the host (the `gameservers` VM):

```bash
# On the gameservers VM
curl -sSL https://get.docker.com/ | CHANNEL=stable bash
sudo systemctl enable --now docker
```

> Wings manages Docker itself — do **not** run Wings inside a container.

## Installation

```bash
# Create Wings directories
sudo mkdir -p /etc/pterodactyl /var/lib/pterodactyl/volumes

# Download Wings binary
curl -L -o /usr/local/bin/wings \
  "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_amd64"
sudo chmod u+x /usr/local/bin/wings
```

## Configuration

1. In the Panel, go to **Admin → Nodes → Create Node**
2. Fill in:
   - **FQDN:** IP of the `gameservers` VM (e.g. `192.168.1.50`) or a hostname
   - **Daemon Port:** 8080
   - **Total Memory / Disk:** Set to available resources on the VM
3. After saving, go to **Configuration → Generate Token** — copy the config block
4. Paste it into `/etc/pterodactyl/config.yml` on the `gameservers` VM

## Systemd Service

```bash
sudo bash -c 'cat > /etc/systemd/system/wings.service << EOF
[Unit]
Description=Pterodactyl Wings Daemon
After=docker.service
Requires=docker.service
PartOf=docker.service

[Service]
User=root
WorkingDirectory=/etc/pterodactyl
LimitNOFILE=4096
PIDFile=/var/run/wings/daemon.pid
ExecStart=/usr/local/bin/wings
Restart=on-failure
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF'

sudo systemctl daemon-reload
sudo systemctl enable --now wings
```

## Ports

| Port | Protocol | Purpose |
|------|----------|---------|
| 8080 | TCP | Wings API (Panel → Wings communication) |
| 2022 | TCP | SFTP server for file access |
| Game ranges | TCP/UDP | Per-server game ports (configured in Panel) |

## Game Port Ranges

Game servers need direct port access. Configure your router/firewall to forward these ranges to the `gameservers` VM IP:

| Range | Protocol | Common Use |
|---|---|---|
| 25565–25575 | TCP/UDP | Minecraft Java |
| 19132–19142 | UDP | Minecraft Bedrock |
| 2456–2466 | UDP | Valheim |
| 27015–27030 | TCP/UDP | Steam games (CS2, Rust, etc.) |
| 7777–7787 | UDP | Palworld, ARK |
| 28960–28970 | UDP | Call of Duty series |
| 25444–25454 | UDP | Satisfactory |

> Tip: Assign a port range per customer/slot in the Panel's allocation settings so ports never conflict.

## ZFS Dataset for Game Data

Game server files live in `/var/lib/pterodactyl/volumes/`. Mount a dedicated ZFS dataset here:

```bash
# On the Proxmox host
zfs create data/gameservers

# In the gameservers VM — add bind mount in Proxmox VM config:
# mp0: /data/gameservers,mp=/var/lib/pterodactyl/volumes
```

This ensures game data is on your ZFS pool (with snapshots/backups) rather than the VM's local disk.

## Resource Limits

Wings enforces per-server limits set in the Panel:

| Resource | How it's enforced |
|---|---|
| CPU | Docker cgroup CPU shares |
| RAM | Docker memory limit (hard cap) |
| Disk | Wings-side quota check on file writes |
| Network | Optional — via traffic control (tc) |

## Backups

Wings has built-in backup support. Configure in the Panel:
- **Backup Driver:** `wings` (local) or `s3` (Backblaze B2)
- Customers can trigger backups from the Panel UI
- Backups stored in `/var/lib/pterodactyl/backups/` (or S3)

For S3 (Backblaze B2):
```yaml
# In /etc/pterodactyl/config.yml
backups:
  compression_level: best_compression
  s3:
    key: <B2_APPLICATION_KEY_ID>
    secret: <B2_APPLICATION_KEY>
    region: <B2_REGION>
    bucket: <BUCKET_NAME>
    endpoint: https://s3.<B2_REGION>.backblazeb2.com
```

## See Also

- [Pelican Panel](pelican.md)
- [Game Hosting Overview](../services/gamehosting.md)
