# Open WebUI

Open WebUI provides a polished ChatGPT-like interface for interacting with local LLMs served by llama.cpp or Ollama.

## Deployment

| | |
|---|---|
| **Machine** | 🖧 Ubuntu Server |
| **Port** | 3004 |
| **Access** | 🌐 Public — `ai.srng.no` |
| **Storage** | `/data/appdata/open-webui` (data + model config) |

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
      - 3004:8080
    extra_hosts:
      - host.docker.internal:host-gateway
    restart: unless-stopped
```

## Setup

1. Start the container and open Open WebUI at `http://ubuntu:3004`.
2. Create the admin account on first launch.
3. Go to **Settings → Connections** and verify the OpenAI API URL points to `http://llama-cpp:8080/v1`.
4. Start a new chat — select the model and confirm responses are streaming from llama.cpp.
5. Configure system prompts and model parameters under **Settings → Models** for each use case.
6. Expose `ai.srng.no` via Nginx Proxy Manager with Authelia SSO protection.

## Configuration

**Connecting to llama.cpp** — the compose already sets `OPENAI_API_BASE_URL`. Verify the URL matches your llama.cpp container/host:

```yaml
    environment:
      - OPENAI_API_BASE_URL=http://llama-cpp:8080/v1
      - OPENAI_API_KEY=sk-dummy  # llama.cpp doesn't validate this
```

If llama.cpp runs on the Ubuntu Server host (not in Docker): use `http://host.docker.internal:8080/v1`.

**Model management** — if connecting to Ollama instead of llama.cpp:

```yaml
      - OLLAMA_BASE_URL=http://ollama:11434
```

**RAG (Retrieval-Augmented Generation)** — upload documents under **Workspace → Documents**; they are chunked and embedded for context-aware chat.

**System prompts** — configure per-model defaults under **Admin → Models**. Useful for setting consistent personalities or language preferences.

**User accounts** — Open WebUI supports multiple users. First registered user is admin. Disable new registrations after setup:

```
Admin Panel → Settings → General → Default User Role = pending
```

## Integration

- **llama.cpp** — primary LLM backend on the Ubuntu Server with the GTX 1070 Ti for GPU inference; Open WebUI connects via the OpenAI-compatible API.
- **Authelia** — protect `ai.srng.no` with SSO; Open WebUI also has its own user system so both layers apply.

## See Also

- [llama.cpp](llama-cpp.md) — LLM inference backend
- [Stable Diffusion](stable-diffusion.md) — image generation on the same Ubuntu Server GPU
- [Official Docs](https://docs.openwebui.com)
