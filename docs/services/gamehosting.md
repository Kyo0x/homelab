# Game Hosting (Arctichost.no)

Commercial game server hosting infrastructure running on the IBM Server. Customers rent server slots — the panel handles deployment, and underlying game types are hotswappable.

---

## Infrastructure Overview

```
IBM Server (Proxmox VE)
├── docker VM             ← Pelican Panel web UI + API
│
└── gameservers VM        ← Isolated from personal services
    ├── Wings daemon
    └── Game server containers (Docker)
        ├── Server slot 1: Minecraft
        ├── Server slot 2: Valheim
        ├── Server slot 3: CS2
        └── ...
```

Game server VMs are **completely isolated** from personal services. A customer exploiting a game server cannot reach Plex, Nextcloud, Vaultwarden, etc.

**Panel:** [Pelican Panel](../apps/pelican.md) — modern open-source game server management, actively maintained, thousands of community game eggs.  
**Node daemon:** [Wings](../apps/wings.md) — runs on the `gameservers` VM, manages all game containers.

---

## Network Architecture

Game servers require **direct port exposure** — they cannot go through Cloudflare Tunnel or Nginx Proxy Manager. Game traffic is raw UDP/TCP, not HTTP.

```
Internet
   │
   ▼
Router / Firewall
   │  Port forward ranges (UDP/TCP)
   ▼
gameservers VM (static LAN IP)
   │
   ▼
Wings → Game server containers
```

**The Panel web UI** (`panel.arctichost.no`) goes through normal NPM → Cloudflare, like any other web app.

### Port Forwarding Ranges

Configure your router to forward these to the `gameservers` VM's LAN IP:

| Range | Protocol | Game |
|---|---|---|
| 25565–25600 | TCP/UDP | Minecraft Java |
| 19132–19160 | UDP | Minecraft Bedrock |
| 2456–2480 | UDP | Valheim |
| 27015–27060 | TCP/UDP | Steam games (CS2, Rust, CSGO) |
| 7777–7810 | UDP | Palworld, ARK, Conan |
| 28960–28990 | UDP | Call of Duty series |
| 25444–25460 | UDP | Satisfactory |

> Define these ranges as **allocations** in your panel. Assign one allocation per server slot so ports never overlap.

---

## Resource Allocation

The IBM Server has significant headroom for game servers:

| Resource | Total | Personal services | Available for games |
|---|---|---|---|
| RAM | 384GB | ~20–40GB | **340GB+** |
| CPU | 32 threads | ~4–8 threads | **24+ threads** |
| Storage | 25.6TB | ~2–5TB | **20TB+** |

### Per-Server Limits (Recommended Defaults)

| Game type | RAM | CPU | Disk |
|---|---|---|---|
| Minecraft (small) | 2–4GB | 100–200% | 15GB |
| Minecraft (large/modded) | 6–12GB | 300–400% | 50GB |
| Valheim | 2–4GB | 100–200% | 15GB |
| CS2 | 2–4GB | 200–300% | 20GB |
| Rust | 6–8GB | 300–400% | 30GB |
| Palworld | 8–12GB | 300–400% | 30GB |
| ARK | 8–16GB | 400% | 50GB |

> CPU: 100% = 1 core. Wings enforces these via Docker cgroups.

---

## DDoS Considerations

Commercial game hosting is a common DDoS target. Options in order of cost/effectiveness:

| Method | Cost | Protection level |
|---|---|---|
| Upstream ISP filtering | Free (ask your ISP) | Basic |
| Cloudflare Magic Transit | Enterprise | High |
| OVH Game DDoS (if renting a VPS for relay) | ~€10–50/mo | High, game-optimized |
| Path.net / Voxility | Custom | Very high |
| TCPShield / TCPShield Enterprise | Free tier / paid | Minecraft-focused |

> **Minimum recommendation:** Ask your ISP if they offer upstream filtering. For production commercial hosting, route game traffic through an OVH relay or dedicated DDoS protection service.

---

## ZFS Dataset Layout

```
data/
├── gameservers/        ← ZFS dataset, bind-mounted to gameservers VM
│   ├── volumes/        ← Game server files (Wings volume path)
│   └── backups/        ← Local backup storage
```

Create the dataset on the Proxmox host:
```bash
zfs create data/gameservers
zfs create data/gameservers/volumes
zfs create data/gameservers/backups
```

---

## Game Server Backups

Wings supports two backup drivers:

**Local (default):**
- Stored in `/var/lib/pterodactyl/backups/` (→ `data/gameservers/backups/`)
- Customers can trigger from the Panel UI
- ZFS snapshots provide an additional layer: `zfs snapshot data/gameservers@daily`

**S3 / Backblaze B2 (recommended for commercial):**
- Offsite, survives server failure
- Configure via Wings config — see [Wings setup](../apps/wings.md#backups)

---

## Billing & Customer Portal

Undecided. Options when ready:

| Tool | Notes |
|---|---|
| WHMCS | Industry standard, has a Pelican/Pterodactyl module |
| Blesta | Cheaper alternative, Pterodactyl module compatible |
| Stripe direct | DIY — handle provisioning manually or via API |
| Clientexec | Budget option |

> For now, manage customers manually. Add a billing system in a later phase when customer volume justifies it.

---

## Hotswapping a Server Slot

When a customer wants to change their game (or their subscription ends):

1. Stop the running game server in the Panel
2. Optionally create a final backup
3. Delete or reassign the server in the Panel
4. Create a new server with the desired game egg on the same allocation (ports)
5. Start the new server

Total time: ~2–5 minutes. No VM changes required.

---

## See Also

- [Pelican Panel](../apps/pelican.md)
- [Wings Daemon](../apps/wings.md)
