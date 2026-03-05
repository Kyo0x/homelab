# Unbound

Unbound is a validating, recursive DNS resolver that runs alongside Pi-hole to eliminate reliance on upstream DNS providers.

## Deployment

| | |
|---|---|
| **Machine** | 🍓 Raspberry Pi 4B |
| **Port** | 5335 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/unbound` (config) |

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

## Configuration

Full `/data/appdata/unbound/unbound.conf`:

```conf
server:
  verbosity: 0
  interface: 0.0.0.0
  port: 5335
  do-ip4: yes
  do-udp: yes
  do-tcp: yes

  # IPv6 disabled if not in use
  do-ip6: no

  # DNSSEC validation
  auto-trust-anchor-file: "/opt/unbound/etc/unbound/root.key"
  val-log-level: 2

  # Hardening
  harden-glue: yes
  harden-dnssec-stripped: yes
  use-caps-for-id: yes
  edns-buffer-size: 1232
  prefetch: yes
  num-threads: 1

  # Cache tuning
  msg-cache-slabs: 2
  rrset-cache-slabs: 2
  infra-cache-slabs: 2
  key-cache-slabs: 2
  rrset-cache-size: 100m
  msg-cache-size: 50m
  so-rcvbuf: 1m

  # Only respond to local network
  access-control: 127.0.0.1/32 allow
  access-control: 192.168.0.0/16 allow
  access-control: 172.16.0.0/12 allow

  # Root hints (update occasionally)
  root-hints: "/opt/unbound/etc/unbound/root.hints"
```

Download/refresh root hints periodically:

```bash
curl -o /data/appdata/unbound/root.hints https://www.internic.net/domain/named.root
```

## Integration

- **Pi-hole** — set upstream DNS to `127.0.0.1#5335` (or `<pi-ip>#5335`) under **Pi-hole Settings → DNS**. Disable all other upstream servers so every query resolves recursively through Unbound.
- **Local DNS validation** — Unbound validates DNSSEC; Pi-hole benefits without needing to implement it separately.

## See Also

- [Pi-hole](pi-hole.md) — ad-blocking DNS that forwards to Unbound
- [Official Docs](https://unbound.docs.nlnetlabs.nl)
