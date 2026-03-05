# NFS Setup

Sharing ZFS datasets from the IBM Server (Proxmox host) to the Ubuntu Server over NFS. This lets Plex on Ubuntu access the media library stored on IBM's ZFS pool, and lets Immich access the photo library.

## When to do this

**Day 5** — before deploying Plex (Day 6) or Immich (Day 8). Both services run on the Ubuntu Server but need read/write access to data stored on IBM.

## Architecture

```
IBM Server (Proxmox host)
└── ZFS pool: /data/media, /data/photos, /data/downloads
    │
    │ NFS exports (LAN only)
    ▼
Ubuntu Server
└── NFS mounts: /mnt/media, /mnt/photos, /mnt/downloads
    │
    └── Plex, Immich, Navidrome etc. use these paths
```

> The NFS server runs on the **Proxmox host** — it exports ZFS datasets directly. This avoids the overhead of going through a VM.

## Server Side (IBM/Proxmox Host)

### Install NFS Server

```bash
apt update && apt install -y nfs-kernel-server
```

### Configure Exports

```bash
nano /etc/exports
```

Add one line per dataset you want to share. Replace `192.168.1.0/24` with your LAN subnet:

```
/data/media       192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)
/data/downloads   192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)
/data/photos      192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)
/data/music       192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)
/data/books       192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)
/data/cloud       192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)
```

**Options explained:**

| Option | Why |
|---|---|
| `rw` | Read + write access |
| `sync` | Write to disk before acknowledging (safer) |
| `no_subtree_check` | Avoids issues with renamed files |
| `no_root_squash` | Allows Docker containers to write as root |

### Apply the Exports

```bash
exportfs -arv       # Re-read /etc/exports and apply
systemctl enable --now nfs-server
showmount -e localhost   # Verify exports are listed
```

## Client Side (Ubuntu Server)

### Install NFS Client

```bash
apt update && apt install -y nfs-common
```

### Test the Mount

```bash
# Replace 192.168.1.X with the IBM server's LAN IP
showmount -e 192.168.1.X    # Should list the exports
```

### Create Mount Points

```bash
mkdir -p /mnt/media /mnt/downloads /mnt/photos /mnt/music /mnt/books
```

### Mount Manually (Test First)

```bash
IBM_IP=192.168.1.X   # Replace with your IBM LAN IP

mount -t nfs ${IBM_IP}:/data/media     /mnt/media
mount -t nfs ${IBM_IP}:/data/downloads /mnt/downloads
mount -t nfs ${IBM_IP}:/data/photos    /mnt/photos
mount -t nfs ${IBM_IP}:/data/music     /mnt/music
mount -t nfs ${IBM_IP}:/data/books     /mnt/books

# Test read/write
ls /mnt/media
touch /mnt/media/test.txt && rm /mnt/media/test.txt
echo "Write test passed"
```

### Make Mounts Persistent (fstab)

Once you've confirmed the mounts work, add them to `/etc/fstab` so they survive reboots:

```bash
nano /etc/fstab
```

Add at the bottom (replace `192.168.1.X`):

```
192.168.1.X:/data/media     /mnt/media     nfs  defaults,_netdev,nofail  0  0
192.168.1.X:/data/downloads /mnt/downloads nfs  defaults,_netdev,nofail  0  0
192.168.1.X:/data/photos    /mnt/photos    nfs  defaults,_netdev,nofail  0  0
192.168.1.X:/data/music     /mnt/music     nfs  defaults,_netdev,nofail  0  0
192.168.1.X:/data/books     /mnt/books     nfs  defaults,_netdev,nofail  0  0
```

**`_netdev`** — tells the system to wait for network before mounting.  
**`nofail`** — boots successfully even if NFS is unreachable.

```bash
# Test fstab without rebooting
mount -a
# Then verify
df -h | grep mnt
```

## Using NFS Paths in Docker

When Plex or Immich runs in Docker on Ubuntu, point their volume mounts at the NFS paths:

```yaml
# Plex example
volumes:
  - /mnt/media:/data/media:ro     # read-only for Plex
  - /mnt/music:/data/music:ro

# Immich example  
volumes:
  - /mnt/photos:/usr/src/app/upload:rw
```

## Performance Tuning

For better throughput over gigabit LAN, mount with NFS v4 and larger read/write sizes:

```
192.168.1.X:/data/media /mnt/media nfs rw,_netdev,nofail,nfsvers=4,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 0 0
```

### Test Throughput

```bash
# Write speed test
dd if=/dev/zero of=/mnt/media/speedtest bs=1M count=1024 conv=fdatasync
# Read speed test
dd if=/mnt/media/speedtest of=/dev/null bs=1M
rm /mnt/media/speedtest
```

Expect ~100–115 MB/s on gigabit. If much lower, check your switch and cable quality.

## Troubleshooting

| Issue | Fix |
|---|---|
| `Connection refused` | Firewall blocking port 2049. Run `ufw allow from 192.168.1.0/24 to any port nfs` on IBM |
| `Permission denied` | Check `no_root_squash` in exports, re-run `exportfs -arv` |
| `Stale file handle` | NFS server was restarted. Unmount and remount: `umount /mnt/media && mount /mnt/media` |
| Mount doesn't survive reboot | Make sure `_netdev` is in fstab options |

## See Also

- [ZFS Pool Setup](zfs.md)
- [Roadmap Day 5](../roadmap.md)
- [Plex](../apps/plex.md)
