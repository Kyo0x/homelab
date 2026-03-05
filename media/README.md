# Media Server

Plex, Jellyfin, *arr stack, and more.

## Architecture Overview

This homelab uses a distributed media server setup:

```
Internet
    │
    ├─→ qBittorrent (Ubuntu PC) → ProtonVPN → Download torrents
    │
    ├─→ *arr Stack (IBM Server) → Monitors qBittorrent, organizes media
    │                           → Stores media on ZFS pool
    │
    └─→ Plex (Ubuntu PC) → Reads from shared storage on IBM Server
                         → Serves media to clients
```

### Component Distribution

- **Ubuntu PC:**
  - Plex Media Server (frontend/serving)
  - qBittorrent (download client with VPN)
  
- **IBM Server (Proxmox):**
  - Sonarr (TV show management)
  - Radarr (Movie management)
  - Lidarr (Music management)
  - Prowlarr (Indexer management)
  - Shared ZFS storage (tank/media dataset)

## Network Communication Setup

### Prerequisites

1. Both machines on same network (or accessible via VPN)
2. Static IP addresses for consistency
3. Firewall rules allowing communication between machines

### IP Configuration (Example)

- **IBM Server:** 192.168.1.100
- **Ubuntu PC:** 192.168.1.50
- Both on same subnet (192.168.1.0/24)

### Storage Sharing (NFS Method - Recommended)

**On IBM Server (Proxmox):**

1. Create media dataset on ZFS:
   ```bash
   zfs create tank/media
   zfs set recordsize=128k tank/media
   zfs set compression=lz4 tank/media
   ```

2. Install NFS server:
   ```bash
   apt update && apt install nfs-kernel-server
   ```

3. Configure NFS export:
   ```bash
   echo "/tank/media 192.168.1.50(rw,sync,no_root_squash,no_subtree_check)" >> /etc/exports
   exportfs -a
   ```

4. Start NFS service:
   ```bash
   systemctl enable nfs-kernel-server
   systemctl restart nfs-kernel-server
   ```

**On Ubuntu PC (from client machine - select your distro):**

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nfs-common
sudo mkdir -p /mnt/media
sudo mount -t nfs 192.168.1.100:/tank/media /mnt/media
# Add to /etc/fstab for persistent mounting:
echo "192.168.1.100:/tank/media /mnt/media nfs defaults,_netdev 0 0" | sudo tee -a /etc/fstab
```

**Fedora/RHEL:**
```bash
sudo dnf install nfs-utils
sudo mkdir -p /mnt/media
sudo mount -t nfs 192.168.1.100:/tank/media /mnt/media
# Add to /etc/fstab for persistent mounting:
echo "192.168.1.100:/tank/media /mnt/media nfs defaults,_netdev 0 0" | sudo tee -a /etc/fstab
```

**Arch:**
```bash
sudo pacman -S nfs-utils
sudo mkdir -p /mnt/media
sudo mount -t nfs 192.168.1.100:/tank/media /mnt/media
# Add to /etc/fstab for persistent mounting:
echo "192.168.1.100:/tank/media /mnt/media nfs defaults,_netdev 0 0" | sudo tee -a /etc/fstab
```

### Storage Sharing (SMB/CIFS Method - Alternative)

**On IBM Server (Proxmox):**

1. Install Samba:
   ```bash
   apt update && apt install samba
   ```

2. Configure Samba share:
   ```bash
   cat >> /etc/samba/smb.conf << 'EOF'
   [media]
   path = /tank/media
   browsable = yes
   read only = no
   guest ok = no
   valid users = @sambashare
   EOF
   ```

3. Create Samba user:
   ```bash
   useradd -m -G sambashare mediauser
   smbpasswd -a mediauser
   ```

4. Restart Samba:
   ```bash
   systemctl restart smbd
   ```

**On Ubuntu PC:**

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install cifs-utils
sudo mkdir -p /mnt/media
sudo mount -t cifs //192.168.1.100/media /mnt/media -o username=mediauser,password=yourpassword,uid=1000,gid=1000
```

**Fedora/RHEL:**
```bash
sudo dnf install cifs-utils
sudo mkdir -p /mnt/media
sudo mount -t cifs //192.168.1.100/media /mnt/media -o username=mediauser,password=yourpassword,uid=1000,gid=1000
```

**Arch:**
```bash
sudo pacman -S cifs-utils
sudo mkdir -p /mnt/media
sudo mount -t cifs //192.168.1.100/media /mnt/media -o username=mediauser,password=yourpassword,uid=1000,gid=1000
```

## Media Applications

### Plex (Ubuntu PC)

**Installation:**

**Ubuntu/Debian:**
```bash
curl https://downloads.plex.tv/plex-keys/PlexSign.key | sudo apt-key add -
echo deb https://downloads.plex.tv/repo/deb public main | sudo tee /etc/apt/sources.list.d/plexmediaserver.list
sudo apt update
sudo apt install plexmediaserver
```

**Configuration:**
1. Access Plex at http://localhost:32400/web
2. Sign in with Plex account
3. Add library pointing to `/mnt/media` (your NFS/SMB mount)
4. Configure remote access and streaming quality

### *arr Stack (IBM Server - Proxmox VMs/LXC)

Each *arr application will run as LXC containers or VMs in Proxmox:

**Sonarr (TV Shows):**
- Monitors configured indexers for new episodes
- Sends download requests to qBittorrent
- Automatically moves completed downloads to /tank/media/TV

**Radarr (Movies):**
- Monitors configured indexers for new movies
- Sends download requests to qBittorrent
- Automatically moves completed downloads to /tank/media/Movies

**Lidarr (Music):**
- Monitors for new music releases
- Sends to qBittorrent
- Organizes into /tank/media/Music

**Prowlarr (Indexer Hub):**
- Centralized indexer management
- Provides unified API to Sonarr, Radarr, Lidarr
- Better torrent/usenet source discovery

### qBittorrent (Ubuntu PC with ProtonVPN)

**Installation:**

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install qbittorrent-nox
```

**Fedora/RHEL:**
```bash
sudo dnf install qbittorrent
```

**Arch:**
```bash
sudo pacman -S qbittorrent
```

**ProtonVPN Setup:**

1. Install ProtonVPN CLI:
   ```bash
   sudo apt install protonvpn-cli  # Ubuntu/Debian
   sudo dnf install protonvpn-cli  # Fedora
   sudo pacman -S protonvpn-cli    # Arch
   ```

2. Configure and connect:
   ```bash
   protonvpn init
   protonvpn connect
   ```

3. Run qBittorrent with VPN enforcement:
   ```bash
   # Option 1: Run in VPN namespace
   sudo ip netns exec protonvpn qbittorrent-nox
   
   # Option 2: Use qBittorrent bind settings
   # Configure qBittorrent to only use VPN interface
   ```

**qBittorrent Configuration:**

1. Access WebUI: http://localhost:8080
2. Set download folder: `/mnt/media/Downloads`
3. Configure for *arr integration:
   - Enable qBittorrent API
   - Set up port forwarding (if needed)
4. Set up network interface binding to VPN

## Communication Between Components

### Sonarr/Radarr → qBittorrent

1. In Sonarr/Radarr, add Download Client:
   - Type: qBittorrent
   - Host: 192.168.1.50 (Ubuntu PC IP)
   - Port: 8080 (or your qBittorrent port)
   - Username/Password (if configured)

2. Test connection in *arr settings

### Sonarr/Radarr → Shared Storage

Both already use same shared storage (`/tank/media`), so no additional config needed. Just set Root Folders in each app:
- Sonarr: `/tank/media/TV` (mounted on server)
- Radarr: `/tank/media/Movies` (mounted on server)
- Lidarr: `/tank/media/Music` (mounted on server)

### Plex → Shared Storage

Plex reads from NFS/SMB mounted media:
- Library path: `/mnt/media` (on Ubuntu PC)
- Points to IBM Server's `/tank/media`

## Firewall Configuration

**Ubuntu PC:**
```bash
# Allow *arr stack to reach qBittorrent
sudo ufw allow from 192.168.1.100 to any port 8080  # qBittorrent
sudo ufw allow 32400:32500/tcp  # Plex
```

**IBM Server (Proxmox):**
```bash
# Allow Ubuntu PC to access NFS/SMB
sudo ufw allow from 192.168.1.50 to any port 2049  # NFS
sudo ufw allow from 192.168.1.50 to any port 445   # SMB
sudo ufw allow from 192.168.1.50 to any port 139   # NetBIOS
```

## Docker Compose (Alternative to VMs)

If using Docker on Ubuntu PC:

```yaml
version: '3.8'
services:
  qbittorrent:
    image: linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=UTC
    volumes:
      - /mnt/media/Downloads:/downloads
      - /path/to/qbittorrent/config:/config
    ports:
      - 6881:6881
      - 6881:6881/udp
      - 8080:8080
    restart: unless-stopped
    network_mode: host  # For VPN integration

  plex:
    image: linuxserver/plex:latest
    container_name: plex
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=UTC
    volumes:
      - /mnt/media:/media
      - /path/to/plex/config:/config
    ports:
      - 32400:32400
    restart: unless-stopped
```

## Data Flow Example

1. **Indexer Update:** Prowlarr checks indexers for new content
2. **Request:** User adds show/movie in Sonarr/Radarr
3. **Search:** Sonarr/Radarr queries Prowlarr for torrents
4. **Download:** Best match sent to qBittorrent (on Ubuntu PC via VPN)
5. **Progress:** qBittorrent downloads via ProtonVPN
6. **Organization:** Upon completion, *arr moves to `/tank/media`
7. **Scanning:** Plex scans shared storage for new content
8. **Serving:** User watches via Plex client

### Download Folder Permissions

On Ubuntu PC:
```bash
# Ensure qBittorrent can write to shared folder
sudo chown -R debian-transmission:debian-transmission /mnt/media/Downloads
sudo chmod -R 775 /mnt/media/Downloads
```

## Monitoring

Track status of all components:

- **Plex:** http://192.168.1.50:32400/web
- **Sonarr:** http://192.168.1.100:8989 (via Proxmox)
- **Radarr:** http://192.168.1.100:7878 (via Proxmox)
- **qBittorrent:** http://192.168.1.50:8080
- **ProtonVPN Status:** `protonvpn status`

## Troubleshooting

### *arr can't reach qBittorrent
- Check firewall: `sudo ufw status`
- Verify qBittorrent is running: `ps aux | grep qbittorrent`
- Test connection: `curl http://192.168.1.50:8080/api/v2/app/webapiVersion`

### NFS Mount not working
- Check NFS exports: `exportfs -v` (on server)
- Verify connectivity: `showmount -e 192.168.1.100` (from Ubuntu PC)
- Check logs: `tail -f /var/log/syslog` (Ubuntu) or `journalctl` (Fedora/Arch)

### Plex not finding media
- Verify mount is active: `mount | grep media`
- Check permissions: `ls -la /mnt/media`
- Rescan library in Plex (Settings → Library)
