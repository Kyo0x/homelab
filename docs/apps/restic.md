# Restic

Restic is a fast, secure, and verifiable backup tool. Backs up homelab data to Backblaze B2 with deduplication, encryption, and retention policies.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM/docker VM |
| **Access** | CLI / cron job |
| **Storage** | Reads from `/data/`, writes to Backblaze B2 |

## Docker Compose

Restic is a CLI tool run via cron or systemd timers — no persistent container needed.

```yaml
services:
  restic:
    image: mazzolino/restic:latest
    container_name: restic
    environment:
      - RESTIC_REPOSITORY=b2:your-bucket-name:/homelab
      - RESTIC_PASSWORD=changeme
      - B2_ACCOUNT_ID=your_account_id
      - B2_ACCOUNT_KEY=your_application_key
      - BACKUP_CRON=0 3 * * *
      - RESTIC_BACKUP_SOURCES=/data
      - RESTIC_BACKUP_ARGS=--verbose --tag homelab
      - RESTIC_FORGET_ARGS=--keep-daily 7 --keep-weekly 4 --keep-monthly 6
      - TZ=Europe/Oslo
    volumes:
      - /data:/data:ro
    restart: unless-stopped
```

## Setup

1. Create a Backblaze B2 bucket and generate an application key with read/write access.
2. Set `RESTIC_REPOSITORY`, `RESTIC_PASSWORD`, `B2_ACCOUNT_ID`, and `B2_ACCOUNT_KEY` in your `.env` file.
3. Start the container — it will initialize the repo and run backups on the defined cron schedule.
4. Verify the first backup: `docker exec restic restic snapshots`.
5. Test a restore to a temporary directory: `docker exec restic restic restore latest --target /tmp/restore-test`.

## Key Commands

```bash
# List snapshots
docker exec restic restic snapshots

# Check repo integrity
docker exec restic restic check

# Restore specific snapshot to a path
docker exec restic restic restore <snapshot-id> --target /tmp/restore

# Force a manual backup now
docker exec restic restic backup /data --tag manual
```

## Retention Policy

The default forget policy in the compose above keeps:

| Window | Snapshots kept |
|---|---|
| Daily | Last 7 |
| Weekly | Last 4 |
| Monthly | Last 6 |

Adjust `RESTIC_FORGET_ARGS` to suit your retention needs.

## See Also

- [ZFS Snapshots](../guides/zfs.md) — local snapshots complement off-site Restic backups
- [Wings Backups](wings.md#backups) — game server backup configuration
