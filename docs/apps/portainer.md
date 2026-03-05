# Portainer

Docker container management web interface.

## Overview

Portainer provides a web-based interface for managing Docker containers, images, networks, and volumes across all homelab machines.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Port** | 9000 |
| **Access** | 🔒 VPN |

## Features

- Container management (start, stop, restart, logs)
- Image management
- Volume and network management
- Stack deployment (docker-compose)
- Multi-host support (agents)
- RBAC and user management

## Installation (Docker)

```bash
# Create volume
docker volume create portainer_data

# Run Portainer
docker run -d \
  -p 9000:9000 \
  -p 9443:9443 \
  --name=portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

## Multi-Host Setup

1. **Install Portainer on IBM Server** (main instance)

2. **Install Portainer Agent on other hosts:**

```bash
# On Ubuntu Server
docker run -d \
  -p 9001:9001 \
  --name portainer_agent \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /var/lib/docker/volumes:/var/lib/docker/volumes \
  portainer/agent:latest
```

3. **Add Environments in Portainer:**
   - Environments → Add environment → Agent
   - Enter agent IP and port (9001)

## Configuration

1. **Initial Setup:**
   - Access `http://server-ip:9000`
   - Create admin account
   - Connect local Docker environment

2. **Stacks:**
   - Use for deploying docker-compose files
   - Stacks → Add stack → Upload compose file

3. **Templates:**
   - Pre-configured app templates
   - Templates → Add template

## Security

- Use HTTPS (port 9443) in production
- Enable authentication
- Restrict port access via firewall
- Regular updates

## Related Services

- [Watchtower](../watchtower) - Auto-updates containers
- [Dozzle](../dozzle) - Real-time log viewer
