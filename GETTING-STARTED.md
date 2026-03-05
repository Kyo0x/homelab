# Getting Started

Setup guides for all servers in the homelab.

## IBM Server Setup (Proxmox + ZFS)

**Hardware Specs:**
- 2x Intel Xeon E5-2650 (16 cores, 32 threads total)
- 384GB DDR3 ECC RAM
- 8x 2.5" Toshiba 3.2TB SAS SSD
- 2x 750W 80+ Platinum PSUs

**Prerequisites:**
- Proxmox VE ISO (latest version)
- USB drive or bootable media (8GB+)
- Network connectivity (Ethernet recommended)
- Monitor and keyboard for initial setup
- iDRAC/management console access
- Machine for creating bootable USB:
  - **Ubuntu/Debian:** `sudo apt install pv`
  - **Fedora/RHEL:** `sudo dnf install pv`
  - **Arch:** `sudo pacman -S pv`

**Pre-Installation (BIOS Configuration):**
1. Power on server and access BIOS/UEFI (usually Del or F2)
2. Configure RAID settings:
   - Set up RAID controller in HBA (Host Bus Adapter) mode if possible
   - Or create RAID 6 pool for redundancy (recommended for storage)
3. Enable virtualization extensions:
   - Intel VT-x
   - Intel VT-d
   - AES-NI
4. Configure boot order to USB first
5. Enable XMP/DOCP for memory (optional, verify stability)
6. Save and exit

**Proxmox Installation:**
1. Download latest Proxmox VE ISO from proxmox.com
2. Create bootable USB (select your OS):

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install pv
dd if=proxmox-ve_*.iso | pv | sudo dd of=/dev/sdX bs=1M
```

**Fedora/RHEL:**
```bash
sudo dnf install pv
dd if=proxmox-ve_*.iso | pv | sudo dd of=/dev/sdX bs=1M
```

**Arch:**
```bash
sudo pacman -S pv
dd if=proxmox-ve_*.iso | pv | sudo dd of=/dev/sdX bs=1M
```

**Alternative (All distros) - Using GNOME Disks:**
```bash
# Ubuntu/Debian
sudo apt install gnome-disk-utility

# Fedora/RHEL
sudo dnf install gnome-disk-utility

# Arch
sudo pacman -S gnome-disk-utility
```
Then open GNOME Disks, select USB drive, and restore ISO image.

3. Insert USB and boot server
4. Select "Proxmox VE" from boot menu
5. Follow installation wizard:
   - Accept EULA
   - Select installation disk (we'll set up ZFS in next step)
   - Configure network:
     - Hostname: `pve-ibm-01` (or your preference)
     - IP address: Use static IP (e.g., 192.168.1.100/24)
     - Gateway and DNS
   - Set root password (use strong password)
6. Review settings and confirm installation
7. System will format drives and install Proxmox

**ZFS Configuration (Post-Installation):**

After Proxmox is installed, configure ZFS for the 8 SSDs:

1. SSH into Proxmox:
   ```bash
   ssh root@<proxmox-ip>
   ```

2. List all drives:
   ```bash
   lsblk
   # or
   zpool import
   ```

3. Create ZFS pool (RAID 6 for redundancy):
   ```bash
   # Create RAID 6 (2 drives can fail, still functional)
   zpool create -f -o ashift=12 \
     -O compression=lz4 \
     -O acltype=posixacl \
     -O xattr=sa \
     -O recordsize=128k \
     -m /mnt/tank \
     tank raidz2 /dev/disk/by-id/ata-TOSHIBA_* \
     /dev/disk/by-id/ata-TOSHIBA_*
   ```

   OR for RAID 10 (4 drives in 2 mirrors):
   ```bash
   zpool create -f -o ashift=12 \
     -O compression=lz4 \
     -O acltype=posixacl \
     -O xattr=sa \
     -O recordsize=128k \
     -m /mnt/tank \
     tank mirror /dev/disk/by-id/ata-TOSHIBA_1 /dev/disk/by-id/ata-TOSHIBA_2 \
             mirror /dev/disk/by-id/ata-TOSHIBA_3 /dev/disk/by-id/ata-TOSHIBA_4 \
             mirror /dev/disk/by-id/ata-TOSHIBA_5 /dev/disk/by-id/ata-TOSHIBA_6 \
             mirror /dev/disk/by-id/ata-TOSHIBA_7 /dev/disk/by-id/ata-TOSHIBA_8
   ```

4. Verify pool creation:
   ```bash
   zpool list
   zfs list
   ```

5. Configure ZFS for Proxmox storage:
   ```bash
   # Add to Proxmox storage configuration
   pvesm add zfspool tank-storage -pool tank -content images,rootdir,backups
   ```

6. Set ZFS properties for optimal performance:
   ```bash
   zfs set sync=standard tank
   zfs set recordsize=128k tank
   zfs set compression=lz4 tank
   zfs set atime=off tank  # Disable access time updates
   ```

7. Enable ZFS monitoring (install from your client machine):

**Ubuntu/Debian:**
```bash
sudo apt install smartmontools
ssh root@<proxmox-ip> 'apt install smartmontools'
```

**Fedora/RHEL:**
```bash
sudo dnf install smartmontools
ssh root@<proxmox-ip> 'dnf install smartmontools'
```

**Arch:**
```bash
sudo pacman -S smartmontools
ssh root@<proxmox-ip> 'pacman -S smartmontools'
```

Then on Proxmox:
   ```bash
   # Monitor pool health
   zpool status
   
   # Watch for SMART errors
   smartctl -a /dev/sdX
   ```

**Storage Datasets:**
Create separate datasets for better organization:
```bash
zfs create tank/vm-disks
zfs create tank/containers
zfs create tank/backups
zfs create tank/media
zfs set recordsize=4k tank/vm-disks
```

**Post-Installation Configuration:**

1. Update Proxmox:
   ```bash
   apt update && apt full-upgrade
   ```

2. From your client machine, verify SSH access (select your OS):

**Ubuntu/Debian:**
```bash
sudo apt install openssh-client
ssh root@<proxmox-ip>
```

**Fedora/RHEL:**
```bash
sudo dnf install openssh-clients
ssh root@<proxmox-ip>
```

**Arch:**
```bash
# SSH is usually pre-installed, but if not:
sudo pacman -S openssh
ssh root@<proxmox-ip>
```

3. Configure iDRAC (if available):
   ```bash
   # Access iDRAC interface for remote console and power management
   # Usually at: https://<idrac-ip>
   ```

4. Set up high availability (if running multiple Proxmox nodes):
   ```bash
   # Configure cluster
   pvecm create mycluster
   ```

5. Configure ZFS auto-snapshots (on Proxmox):
   ```bash
   apt install zfs-auto-snapshot
   ```

6. Access from your client machine (select your OS):

**Ubuntu/Debian:**
```bash
# Open web interface in browser
xdg-open https://<proxmox-ip>:8006
```

**Fedora/RHEL:**
```bash
# Open web interface in browser
xdg-open https://<proxmox-ip>:8006
```

**Arch:**
```bash
# Open web interface in browser (if using GNOME)
xdg-open https://<proxmox-ip>:8006
# Or open manually in your browser
```

7. Monitor system resources:
   - Access Proxmox web interface: https://<proxmox-ip>:8006
   - Default user: root@pam
   - Monitor RAM, CPU, and ZFS pool health

8. Network configuration:
   - Edit `/etc/network/interfaces` for bonding (optional)
   - Consider VLAN setup for network segmentation

9. Firewall configuration:
   - Configure UFW or firewall rules
   - Restrict access to Proxmox web UI

**Performance Tuning:**

1. CPU governor:
   ```bash
   # Set to performance mode for better VM performance
   echo "performance" | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
   ```

2. Memory settings:
   - ZFS recommends 1GB per 1TB of storage
   - With 25.6TB storage, allocate ~25GB to ZFS ARC cache
   ```bash
   echo "options zfs zfs_arc_max=26843545600" >> /etc/modprobe.d/zfs.conf
   ```

3. Storage optimization:
   - Use SSD-specific settings if needed
   - Monitor wear levels with `smartctl`

4. CPU isolation (optional):
   ```bash
   # Pin cores to specific VMs for latency-sensitive workloads
   # Configure in VM settings: CPU Type = host
   ```

**Maintenance:**

1. Monthly ZFS health check (from Proxmox or client SSH):
   ```bash
   ssh root@<proxmox-ip> 'zpool scrub tank'
   ```

2. Monitor disk temperatures (install from your client):

**Ubuntu/Debian:**
```bash
sudo apt install hddtemp
ssh root@<proxmox-ip> 'hddtemp /dev/sd*'
```

**Fedora/RHEL:**
```bash
sudo dnf install hddtemp
ssh root@<proxmox-ip> 'hddtemp /dev/sd*'
```

**Arch:**
```bash
sudo pacman -S hddtemp
ssh root@<proxmox-ip> 'hddtemp /dev/sd*'
```

3. Backup configuration:
   ```bash
   # Backup Proxmox configuration
   ssh root@<proxmox-ip> 'tar -czf /tmp/proxmox-config-backup.tar.gz /etc/'
   # Download backup to your machine
   scp root@<proxmox-ip>:/tmp/proxmox-config-backup.tar.gz ./
   ```

4. Update firmware and drivers:
   - Check manufacturer website for latest firmware
   - Update BIOS if newer version available

## Ubuntu Server Setup

**Prerequisites:**
- Ubuntu Server ISO
- USB drive or bootable media
- Display and keyboard (or SSH access)

**Initial Setup Steps:**
1. Download Ubuntu Server LTS from ubuntu.com
2. Create bootable installation media
3. Boot from USB and follow installation wizard
4. Configure hostname (e.g., `ubuntu-server`)
5. Set up static IP address
6. Install NVIDIA drivers for the GTX 1070 Ti:
   ```bash
   sudo apt update
   sudo apt install nvidia-driver-535
   ```
7. Configure SSH for remote access
8. Set up firewall (ufw)
9. Configure automatic updates

**GPU Setup:**
- Install NVIDIA CUDA Toolkit for compute workloads
- Verify GPU with: `nvidia-smi`

## Raspberry Pi 4B Setup

**Prerequisites:**
- Raspberry Pi 4B with power supply
- MicroSD card (64GB+ recommended)
- Card reader
- Optional: Case, cooling solution

**Initial Setup Steps:**
1. Download Raspberry Pi OS from official website
2. Use Raspberry Pi Imager to flash MicroSD card
3. Insert card into Pi and power on
4. Complete initial setup wizard:
   - Set hostname (e.g., `rpi4b`)
   - Configure WiFi or Ethernet
   - Set password
   - Configure locale and timezone
5. Update system:
   ```bash
   sudo apt update && sudo apt upgrade
   ```
6. Enable SSH for remote access
7. Configure static IP address
8. Install Docker for containerized applications:
   ```bash
   curl -sSL https://get.docker.com | sh
   sudo usermod -aG docker $USER
   ```

**Optimization Tips:**
- Monitor temperature: `vcgencmd measure_temp`
- Consider adding active cooling for better performance
- Use high-quality PSU for stability
