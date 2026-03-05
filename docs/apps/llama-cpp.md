# llama.cpp

llama.cpp is a high-performance LLM inference server that runs quantised language models locally on CPU or GPU.

## Deployment

| | |
|---|---|
| **Machine** | 🖧 Ubuntu Server |
| **Port** | 8080 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  llama-cpp:
    image: ghcr.io/ggerganov/llama.cpp:server-cuda
    container_name: llama-cpp
    environment:
      - TZ=Europe/Oslo
    volumes:
      - /data/models:/models
    ports:
      - 8080:8080
    command: >
      -m /models/mistral-7b-instruct-v0.2.Q4_K_M.gguf
      --host 0.0.0.0
      --port 8080
      -ngl 35
      --ctx-size 4096
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    restart: unless-stopped
```

## Setup

1. Ensure the NVIDIA Container Toolkit is installed on Ubuntu: `nvidia-ctk runtime configure --runtime=docker`.
2. Download a GGUF model into `/data/models` — start with `mistral-7b-instruct-v0.2.Q4_K_M.gguf` (~4.5 GB).
3. Start the container and test inference: `curl http://ubuntu:8080/v1/chat/completions -d '{"model":"mistral","messages":[{"role":"user","content":"Hello"}]}'`.
4. Tune the `-ngl` flag (number of GPU layers) to maximise VRAM usage — start with 35 for a 1070 Ti.
5. Adjust `--ctx-size` to balance context window size against VRAM consumption.
6. Connect Open WebUI to this endpoint for a chat interface.

## Links

- [Official Docs](https://github.com/ggerganov/llama.cpp/blob/master/examples/server/README.md)
