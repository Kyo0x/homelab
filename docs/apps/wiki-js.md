# Wiki.js

Wiki.js is a powerful, self-hosted knowledge base with Markdown editing, full-text search, and Git-based storage.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 3000 |
| **Access** | 🌐 Public — `docs.srng.no` |

## Docker Compose

```yaml
services:
  wiki-js:
    image: ghcr.io/requarks/wiki:2
    container_name: wiki-js
    environment:
      - TZ=Europe/Oslo
      - DB_TYPE=postgres
      - DB_HOST=wiki-db
      - DB_PORT=5432
      - DB_NAME=wiki
      - DB_USER=wiki
      - DB_PASS=changeme
    ports:
      - 3000:3000
    restart: unless-stopped

  wiki-db:
    image: postgres:15
    container_name: wiki-db
    environment:
      - POSTGRES_DB=wiki
      - POSTGRES_USER=wiki
      - POSTGRES_PASSWORD=changeme
    volumes:
      - /data/appdata/wiki-db:/var/lib/postgresql/data
    restart: unless-stopped
```

## Setup

1. Start the stack and navigate to `http://IBM:3000` — complete the initial setup wizard.
2. Create the admin account and set the site URL to `https://docs.srng.no`.
3. Enable Git storage sync under **Administration → Storage** to back up pages to Gitea.
4. Set the default editor to Markdown under **Administration → Editors**.
5. Configure authentication providers (local, Authelia/OIDC) under **Administration → Authentication**.
6. Expose `docs.srng.no` via Nginx Proxy Manager.

## Links

- [Official Docs](https://docs.requarks.io)
