# IT-Tools

IT-Tools is a self-hosted collection of 100+ handy utilities for developers — encoders, converters, generators, and more.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8080 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  it-tools:
    image: corentinth/it-tools:latest
    container_name: it-tools
    environment:
      - TZ=Europe/Oslo
    ports:
      - 8080:80
    restart: unless-stopped
```

## Setup

1. Start the container and open IT-Tools at `http://IBM:8080` — no configuration needed.
2. Browse the tool list and use the search bar to find utilities quickly.
3. Pin your most-used tools using the star icon to surface them in the **Favourites** section.
4. If exposing beyond VPN, add basic authentication in Nginx Proxy Manager.
5. The container is stateless — updates are a simple `docker pull` and restart.
6. Consider bookmarking `http://IBM:8080` on your devices for quick access to the toolbox.

## Links

- [Official Docs](https://github.com/CorentinTh/it-tools)
