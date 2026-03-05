# Stable Diffusion (Automatic1111)

Automatic1111 is a feature-rich web UI for running Stable Diffusion image generation locally using your GPU.

## Deployment

| | |
|---|---|
| **Host** | Ubuntu Server |
| **Port** | 7860 |
| **Access** | 🌐 Public — `draw.srng.no` |

## Docker Compose

```yaml
services:
  stable-diffusion:
    image: universonic/stable-diffusion-webui:full
    container_name: stable-diffusion
    environment:
      - TZ=Europe/Oslo
      - CLI_ARGS=--listen --api --xformers
    volumes:
      - /data/appdata/stable-diffusion:/data
      - /data/models/sd:/data/StableDiffusion
    ports:
      - 7860:7860
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

1. Ensure the NVIDIA Container Toolkit is installed on Ubuntu and Docker can see the GPU.
2. Place at least one Stable Diffusion checkpoint (`.safetensors` or `.ckpt`) into `/data/models/sd`.
3. Start the container — first launch downloads dependencies and may take several minutes.
4. Open the UI at `http://ubuntu:7860`, select a model checkpoint, and generate a test image.
5. Enable `--xformers` in `CLI_ARGS` for significantly lower VRAM usage and faster generation on the 1070 Ti.
6. Expose `draw.srng.no` via Nginx Proxy Manager with Authelia protection before sharing access.

## Links

- [Official Docs](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki)
