# Unbound

Unbound is a validating, recursive DNS resolver that runs alongside Pi-hole to eliminate reliance on upstream DNS providers.

## Deployment

| | |
|---|---|
| **Machine** | 🍓 Raspberry Pi 4B |
| **Port** | 5335 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  unbound:
    image: mvance/unbound-rpi:latest
    container_name: unbound
    volumes:
      - /data/appdata/unbound:/opt/unbound/etc/unbound
    ports:
      - 5335:5335/tcp
      - 5335:5335/udp
    restart: unless-stopped
```

## Setup

1. Create the config directory and drop a custom `unbound.conf` into `/data/appdata/unbound/`.
2. Set the listening port to `5335` and enable DNSSEC validation in `unbound.conf`.
3. Start the container and test resolution: `dig @127.0.0.1 -p 5335 example.com`.
4. In Pi-hole, set upstream DNS to `127.0.0.1#5335` under **Settings → DNS**.
5. Disable all other upstream DNS servers in Pi-hole so all queries flow through Unbound.
6. Verify DNSSEC with `dig @127.0.0.1 -p 5335 sigfail.verteiltesysteme.net` — expect `SERVFAIL`.

## Links

- [Official Docs](https://unbound.docs.nlnetlabs.nl)
