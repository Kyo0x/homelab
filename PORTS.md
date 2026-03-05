# 🔌 Port Forwarding Reference

> Only ports that need to be forwarded on your **router** to the specific machine.
> Everything else is handled by Cloudflare Tunnel or NetBird — no ports needed.

---

## 🏠 Router Port Forwards

| Port | Protocol | Forward To | Service | Why |
|---|---|---|---|---|
| `32400` | TCP | Ubuntu Server | Plex | Direct connection, bypasses relay |
| `51820` | UDP | IBM Server | NetBird / WireGuard | Guarantees fastest + most stable VPN connections |

> That's it. Two ports. Everything else is handled by Cloudflare Tunnel and NetBird. 🎯

---

## 📡 Cloudflare Tunnel (No Port Forwarding Needed)

> `cloudflared` on IBM makes an **outbound** connection to Cloudflare.
> No inbound ports required on your router.

| Subdomain | Service | Machine |
|---|---|---|
| `request.srng.no` | Overseerr | IBM |
| `music.srng.no` | Navidrome | IBM |
| `books.srng.no` | Audiobookshelf | IBM |

---

## 🔒 NetBird VPN (No Port Forwarding Needed)

> NetBird makes **outbound** connections — no inbound ports required on your router.
> All VPN-only services are only reachable when connected to NetBird.

| Machine | Role |
|---|---|
| IBM Server | NetBird management server + enrolled node |
| Ubuntu Server | Enrolled node |
| Raspberry Pi 4B | Enrolled node |
| Your devices | Enrolled nodes (phone, laptop, etc.) |

---

## 🖥️ Internal Ports Reference

> These are **not** forwarded on your router.
> Only relevant if you're accessing services directly on your local network or over NetBird VPN.

### IBM Server

| Port | Service |
|---|---|
| `80` / `443` | Nginx Proxy Manager |
| `81` | NPM Admin UI |
| `7878` | Radarr |
| `8989` | Sonarr |
| `8686` | Lidarr |
| `8787` | Readarr |
| `9696` | Prowlarr |
| `8081` | qBittorrent |
| `6767` | Bazarr |
| `5055` | Overseerr |
| `4533` | Navidrome |
| `13378` | Audiobookshelf |
| `8082` | Vaultwarden |
| `9000` | Portainer |
| `3000` | Grafana |
| `9090` | Prometheus |
| `3001` | Uptime Kuma |
| `8083` | Dozzle |
| `3002` | Homepage |
| `3003` | Gitea / Forgejo |
| `8084` | Wiki.js / BookStack |
| `8085` | Stirling-PDF |
| `8086` | IT-Tools |
| `8384` | Syncthing |
| `8000` | Paperless-ngx |
| `8087` | Filebrowser |
| `8088` | Nextcloud |
| `8123` | Home Assistant |
| `1880` | Node-RED |
| `8089` | Calibre-Web |
| `8090` | Kavita |

### Ubuntu Server

| Port | Service |
|---|---|
| `32400` | Plex *(forwarded on router)* |
| `2283` | Immich |
| `3004` | Open WebUI |
| `8443` | code-server |
| `7860` | Stable Diffusion (Automatic1111) |
| `8091` | llama-server |

### Raspberry Pi 4B

| Port | Service |
|---|---|
| `53` | Pi-hole / Unbound DNS |
| `80` | Pi-hole Admin UI |
| `1883` | Mosquitto MQTT |
| `8883` | Mosquitto MQTT (TLS) |
| `8092` | Zigbee2MQTT |

---

## 📝 Notes

- All internal ports are unique — no conflicts
- All internal ports are only accessible on your local network or over NetBird VPN
- Cloudflare Tunnel and NetBird both use outbound connections — your router firewall stays closed for everything except `32400` TCP and `51820` UDP
- GlobalConnect confirmed no CGNAT — port forwarding works as expected
