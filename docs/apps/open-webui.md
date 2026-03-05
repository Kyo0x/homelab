# Open WebUI

Open WebUI provides a polished ChatGPT-like interface for interacting with local LLMs served by llama.cpp or Ollama.

## Deployment

| | |
|---|---|
| **Host** | Ubuntu Server |
| **Port** | 3000 |
| **Access** | 🌐 Public — `ai.srng.no` |

## Docker Compose

```yaml
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    environment:
      - TZ=Europe/Oslo
      - OPENAI_API_BASE_URL=http://llama-cpp:8080/v1
      - OPENAI_API_KEY=sk-dummy
    volumes:
      - /data/appdata/open-webui:/app/backend/data
    ports:
      - 3000:8080
    extra_hosts:
      - host.docker.internal:host-gateway
    restart: unless-stopped
```

## Setup

1. Start the container and open Open WebUI at `http://ubuntu:3000`.
2. Create the admin account on first launch.
3. Go to **Settings → Connections** and verify the OpenAI API URL points to `http://llama-cpp:8080/v1`.
4. Start a new chat — select the model and confirm responses are streaming from llama.cpp.
5. Configure system prompts and model parameters under **Settings → Models** for each use case.
6. Expose `ai.srng.no` via Nginx Proxy Manager with Authelia SSO protection.

## Links

- [Official Docs](https://docs.openwebui.com)
