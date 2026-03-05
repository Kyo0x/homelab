# Pi-hole

Pi-hole is a network-wide DNS sinkhole that blocks ads and trackers for every device on your network.

## Deployment

| | |
|---|---|
| **Machine** | 🍓 Raspberry Pi 4B |
| **Port** | 80 (web), 8080 (admin) |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  pihole:
    image: pihole/pihole:latest
    container_name: pihole
    environment:
      - TZ=Europe/Oslo
      - WEBPASSWORD=changeme
      - PIHOLE_DNS_=127.0.0.1#5335
    volumes:
      - /data/appdata/pihole/etc:/etc/pihole
      - /data/appdata/pihole/dnsmasq:/etc/dnsmasq.d
    ports:
      - 53:53/tcp
      - 53:53/udp
      - 8080:80
    cap_add:
      - NET_ADMIN
    restart: unless-stopped
```

## Setup

1. Set `WEBPASSWORD` to a strong password before first launch.
2. Open the admin UI at `http://pi:8080/admin` and log in.
3. Go to **Settings → DNS** and set upstream DNS to `127.0.0.1#5335` (Unbound).
4. Add blocklists under **Group Management → Adlists** — start with Steven Black's list.
5. Point your router's DHCP DNS server to the Pi 4B IP address.
6. Verify ad blocking by visiting a test page at `https://ads-blocker.com/testing/`.

## Links

- [Official Docs](https://docs.pi-hole.net)
