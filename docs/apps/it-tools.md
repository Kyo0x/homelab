# IT-Tools

IT-Tools is a self-hosted collection of 100+ handy utilities for developers — encoders, converters, generators, and more.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 8086 |
| **Access** | 🔒 VPN |
    image: corentinth/it-tools:latest
    container_name: it-tools
    environment:
      - TZ=Europe/Oslo
    ports:
      - 8086:80
    restart: unless-stopped
```

## Setup

1. Start the container and open IT-Tools at `http://IBM:8086` — no configuration needed.
2. Browse the tool list and use the search bar to find utilities quickly.
3. Pin your most-used tools using the star icon to surface them in the **Favourites** section.
4. If exposing beyond VPN, add basic authentication in Nginx Proxy Manager.
5. The container is stateless — updates are a simple `docker pull` and restart.
6. Consider bookmarking `http://IBM:8086` on your devices for quick access to the toolbox.

## Feature Highlights

IT-Tools includes 100+ utilities across categories:

| Category | Example tools |
|---|---|
| Crypto / Encoding | Base64, JWT decoder, bcrypt, MD5/SHA hash, UUID generator |
| Network | IPv4/IPv6 CIDR calc, MAC lookup, DNS lookup, HTTP status codes |
| Text | Regex tester, JSON formatter, YAML↔JSON, Markdown preview |
| Dev | Cron expression parser, SQL formatter, HTML entity encoder |
| Convert | Color picker/converter, temperature/unit converters |
| Random | Password generator, lorem ipsum, QR code generator |

## Configuration

No persistent configuration — the container is fully stateless. The only optional tweak is pinning tools with the ⭐ icon in the UI (stored in browser `localStorage`).

To run on a non-conflicting port (avoid clash with other 8080 services), change the host port mapping:

```yaml
    ports:
      - 8083:80   # or any unused port
```

## Integration

- Standalone tool — no integrations required.
- Pair with **Vaultwarden** for password generation workflows.
- Access via **Homepage** dashboard widget for quick launch.

## See Also

- [Official Docs](https://github.com/CorentinTh/it-tools)
