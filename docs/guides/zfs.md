# ZFS Pool Setup

Setting up a ZFS pool on the IBM Server (Proxmox host) for the primary data store. This pool backs all service data, media, game server files, and backups.

## When to do this

**Day 1** — before creating VMs or deploying any services. The ZFS datasets are bind-mounted into VMs, so the pool must exist first.

## Hardware

| Component | Detail |
|---|---|
| **Machine** | 🖥️ IBM Server (Proxmox host) |
| **Disks** | 8x Toshiba 3.2TB SAS SSD |
| **Target RAID level** | RAID-Z2 (2 parity disks, survives 2 simultaneous failures) |
| **Usable capacity** | ~19.2TB (6 data + 2 parity × 3.2TB) |

## Identify Your Disks

Before creating the pool, identify disk IDs. Use persistent `/dev/disk/by-id/` paths — never `/dev/sdX` (changes on reboot):

```bash
ls -la /dev/disk/by-id/ | grep -v part
```

Note the full ID for each of your 8 disks (e.g. `scsi-3500...`). Use these in all ZFS commands.

## Create the Pool

```bash
# Replace the disk IDs with your actual values
zpool create -o ashift=12 \
  -O atime=off \
  -O compression=lz4 \
  -O xattr=sa \
  -O dnodesize=auto \
  -O normalization=formD \
  -O mountpoint=/data \
  data raidz2 \
  /dev/disk/by-id/scsi-DISK1 \
  /dev/disk/by-id/scsi-DISK2 \
  /dev/disk/by-id/scsi-DISK3 \
  /dev/disk/by-id/scsi-DISK4 \
  /dev/disk/by-id/scsi-DISK5 \
  /dev/disk/by-id/scsi-DISK6 \
  /dev/disk/by-id/scsi-DISK7 \
  /dev/disk/by-id/scsi-DISK8
```

**Options explained:**

| Option | Value | Why |
|---|---|---|
| `ashift=12` | 4K sector alignment | Required for SSDs |
| `atime=off` | Disable access time | Huge performance boost |
| `compression=lz4` | LZ4 compression | Fast, saves ~20-40% space |
| `xattr=sa` | Store xattrs in inode | Better performance for Nextcloud etc. |
| `dnodesize=auto` | Dynamic dnode size | Required for `xattr=sa` |
| `normalization=formD` | Unicode normalization | Prevents filename issues |
| `mountpoint=/data` | Mount at `/data` | All datasets live here |

## Create Datasets

Create separate ZFS datasets for each major use category. Each dataset can have its own settings (compression, quota, etc.):

```bash
# Personal services
zfs create data/appdata      # Docker container config/state
zfs create data/media        # Plex media library
zfs create data/downloads    # Active download staging
zfs create data/music        # Navidrome music library
zfs create data/books        # Audiobookshelf / Calibre
zfs create data/photos       # Immich photo library
zfs create data/cloud        # Nextcloud user files
zfs create data/documents    # Paperless-ngx documents

# Game hosting
zfs create data/gameservers
zfs create data/gameservers/volumes   # Wings game server files
zfs create data/gameservers/backups   # Game server backups

# Backups
zfs create data/backups      # Local backup staging (Restic etc.)
```

## Verify the Pool

```bash
zpool status data    # Should show all disks ONLINE
zpool list data      # Shows capacity and usage
zfs list             # Shows all datasets
df -h /data          # Confirm mounted
```

## Bind Mount Datasets to VMs

In Proxmox, add dataset bind mounts to your VMs so containers can access ZFS data. Edit the VM config in Proxmox shell or via the web UI under **Hardware → Add → Directory**:

```bash
# For the docker VM (VM ID 101 in this example)
# Edit /etc/pve/qemu-server/101.conf and add:
# virtfs0: /data/appdata,mp=/data/appdata,readonly=0
# virtfs1: /data/media,mp=/data/media,readonly=0
# ... etc.

# Or via virtiofs (recommended for Proxmox 8+):
# Add each /data/* path as a VirtioFS share
```

> **Tip:** Use VirtioFS in Proxmox 8+ for much better performance than the older `9p/virtfs` approach.

## ZFS Snapshot Schedule

Set up automated snapshots so you can roll back after mistakes:

```bash
# Install zfs-auto-snapshot (or use sanoid for more control)
apt install zfs-auto-snapshot

# Or manually with cron — daily snapshot, keep 7:
cat > /etc/cron.daily/zfs-snapshot << 'EOF'
#!/bin/bash
POOL=data
DATE=$(date +%Y%m%d-%H%M)
KEEP=7

zfs snapshot -r ${POOL}@auto-${DATE}

# Prune old snapshots
zfs list -t snapshot -H -o name | grep "@auto-" | head -n -${KEEP} | while read snap; do
  zfs destroy "$snap"
done
EOF
chmod +x /etc/cron.daily/zfs-snapshot
```

> Configure this on **Day 14** (hardening) after everything is running.

## Common Commands

```bash
# Check pool health
zpool status

# Check I/O stats
zpool iostat -v 2

# Scrub (verify data integrity — run monthly)
zpool scrub data

# List snapshots
zfs list -t snapshot

# Roll back to a snapshot
zfs rollback data/appdata@auto-20241201

# Check compression ratio
zfs get compressratio data
```

## See Also

- [Roadmap Day 1](../roadmap.md)
- [NFS Setup](nfs.md) — sharing ZFS datasets over NFS to other machines
