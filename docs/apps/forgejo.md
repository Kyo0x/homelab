# Forgejo

Forgejo is an actively maintained, community-driven fork of Gitea. Self-hosted Git service with pull requests, CI/CD via Gitea Actions, and a clean GitHub-like UI.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 3003 (web), 222 (SSH) |
| **Access** | 🌐 Public — `git.srng.no` |

## Docker Compose

```yaml
services:
  gitea:
    image: codeberg.org/forgejo/forgejo:latest
    container_name: forgejo
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - TZ=Europe/Oslo
      - GITEA__database__DB_TYPE=postgres
      - GITEA__database__HOST=gitea-db:5432
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=changeme
    volumes:
      - /data/appdata/forgejo:/data
    ports:
      - 3003:3003
      - 222:22
    restart: unless-stopped

  gitea-db:
    image: postgres:15
    container_name: forgejo-db
    environment:
      - POSTGRES_DB=gitea
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=changeme
    volumes:
      - /data/appdata/forgejo-db:/var/lib/postgresql/data
    restart: unless-stopped
```

## Setup

1. Start the stack and open Forgejo at `http://IBM:3003` to complete the installation wizard.
2. Set the repository root, SSH server port (`222`), and base URL (`https://git.srng.no`).
3. Create the admin account and configure organisation settings.
4. Add your SSH public key under **Settings → SSH / GPG Keys**.
5. Push your homelab repo: `git remote add forgejo ssh://git@git.srng.no:222/you/homelab.git && git push gitea main`.
6. Expose `git.srng.no` via Nginx Proxy Manager with Authelia protection.

## Links

- [Official Docs](https://forgejo.org/docs/latest/)
