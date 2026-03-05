# Watchtower

Watchtower automatically monitors running Docker containers and pulls updated images on a schedule.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | — (no UI) |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  watchtower:
    image: containrrr/watchtower:latest
    container_name: watchtower
    environment:
      - TZ=Europe/Oslo
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_SCHEDULE=0 0 4 * * *
      - WATCHTOWER_NOTIFICATIONS=email
      - WATCHTOWER_NOTIFICATION_EMAIL_TO=you@example.com
      - WATCHTOWER_NOTIFICATION_EMAIL_FROM=watchtower@srng.no
      - WATCHTOWER_NOTIFICATION_EMAIL_SERVER=smtp.example.com
      - WATCHTOWER_NOTIFICATION_EMAIL_SERVER_PORT=587
      - WATCHTOWER_NOTIFICATION_EMAIL_SERVER_USER=you@example.com
      - WATCHTOWER_NOTIFICATION_EMAIL_SERVER_PASSWORD=changeme
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped
```

## Setup

1. Adjust `WATCHTOWER_SCHEDULE` to a cron expression for your preferred update window (default: 04:00 daily).
2. Set `WATCHTOWER_CLEANUP=true` to automatically remove old image versions after updating.
3. Configure email (or Slack/Telegram) notification variables so you are alerted after updates.
4. To exclude specific containers from updates, add the label `com.centurylinklabs.watchtower.enable=false`.
5. For manual one-shot updates, run: `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once`.
6. Review the Watchtower logs after the first scheduled run to confirm updates are applied cleanly.

## Links

- [Official Docs](https://containrrr.dev/watchtower)
