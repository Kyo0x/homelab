# NVIDIA Driver & CUDA Setup

Installing NVIDIA drivers and CUDA on the Ubuntu Server for GPU-accelerated workloads: Plex hardware transcoding (NVENC), Immich ML face recognition, and AI inference (llama.cpp, Stable Diffusion).

## When to do this

**Day 1** — install drivers on the first day so they're ready for:
- Day 6: Plex NVENC hardware transcoding
- Day 8: Immich GPU-accelerated face recognition  
- Day 12: llama.cpp CUDA inference + Stable Diffusion

## Hardware

| Component | Detail |
|---|---|
| **Machine** | 🖧 Ubuntu Server |
| **GPU** | NVIDIA GTX 1070 Ti |
| **VRAM** | 8GB GDDR5 |
| **CUDA Compute** | 6.1 |
| **Max CUDA version** | CUDA 12.x (driver ≥ 525) |

## Step 1 — Install NVIDIA Drivers

```bash
# Update package list
sudo apt update

# Check available driver versions
ubuntu-drivers devices

# Install recommended driver (535 or latest available)
sudo apt install -y nvidia-driver-535

# Reboot — required for driver to load
sudo reboot
```

### Verify Driver Install

```bash
nvidia-smi
```

Expected output:
```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 535.x.x    Driver Version: 535.x.x    CUDA Version: 12.2        |
|-------------------------------+----------------------+----------------------+|
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
|  0  NVIDIA GeForce GTX 1070 Ti  Off  | 00000000:01:00.0 Off |              N/A |
```

If `nvidia-smi` fails after reboot, check:
```bash
dmesg | grep -i nvidia   # Look for driver load errors
lsmod | grep nvidia      # Should show nvidia, nvidia_modeset etc.
```

## Step 2 — Install CUDA Toolkit

The CUDA toolkit provides compilers and libraries needed for llama.cpp and Stable Diffusion:

```bash
# Install CUDA toolkit (matches driver version)
sudo apt install -y nvidia-cuda-toolkit

# Verify
nvcc --version
```

> **Alternative:** Use the [NVIDIA CUDA repo](https://developer.nvidia.com/cuda-downloads) for the latest CUDA version if the Ubuntu package is behind.

### Add CUDA to PATH

```bash
echo 'export PATH=/usr/local/cuda/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc
```

## Step 3 — Docker GPU Support

For GPU access in Docker containers (needed for Plex, Immich, Stable Diffusion):

```bash
# Install NVIDIA Container Toolkit
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt update
sudo apt install -y nvidia-container-toolkit

# Configure Docker to use NVIDIA runtime
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

### Test GPU in Docker

```bash
docker run --rm --gpus all nvidia/cuda:12.2-base-ubuntu22.04 nvidia-smi
```

Should print the same `nvidia-smi` output as before. If it works, GPU is available to all Docker containers.

## Using GPU in Docker Compose

Add the `deploy.resources` section to any container that needs GPU access:

```yaml
services:
  plex:
    image: lscr.io/linuxserver/plex:latest
    runtime: nvidia          # Or use deploy section below
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
      - NVIDIA_DRIVER_CAPABILITIES=video,compute,utility
    # ... rest of config

  # Alternative syntax (compose v3.8+)
  stable-diffusion:
    image: ...
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

## GPU Capabilities by Service

| Service | GPU use | Docker env var |
|---|---|---|
| Plex | NVENC video transcoding | `NVIDIA_DRIVER_CAPABILITIES=video,compute,utility` |
| Immich | ML face/object detection | `NVIDIA_DRIVER_CAPABILITIES=compute,utility` |
| llama.cpp | LLM inference (CUDA) | `NVIDIA_VISIBLE_DEVICES=all` |
| Stable Diffusion | Image generation | `NVIDIA_VISIBLE_DEVICES=all` |

## GTX 1070 Ti Capacity

| Task | VRAM needed | Notes |
|---|---|---|
| Plex NVENC | ~100MB | Minimal — just the encoder |
| Immich ML | ~1–2GB | Face recognition + object detection |
| Mistral 7B Q4_K_M | ~4–5GB | Fits well, leaves ~3GB for other tasks |
| Stable Diffusion 1.5 | ~3–4GB | SD1.5 fits; SDXL needs 6GB+ |
| Stable Diffusion XL | ~6–8GB | Tight — may need to run alone |

> At 8GB VRAM, you can run Plex + Immich + llama.cpp simultaneously. Running Stable Diffusion XL requires stopping other GPU workloads first.

## Plex NVENC Setup

After Plex is deployed on Day 6:
1. Go to Plex Settings → Transcoder
2. Enable **"Use hardware acceleration when available"**
3. Enable **"Use hardware-accelerated video encoding"**
4. Play a video and force transcoding — check Plex dashboard shows `(hw)` next to the video

## Monitoring GPU Usage

```bash
# Real-time GPU monitoring
watch -n 1 nvidia-smi

# Or install nvtop for a nicer TUI
sudo apt install nvtop
nvtop
```

## Troubleshooting

| Issue | Fix |
|---|---|
| `nvidia-smi` not found after install | Reboot, then check `lsmod | grep nvidia` |
| `CUDA out of memory` | Another process is using VRAM. Run `nvidia-smi` to see what's running |
| Docker can't see GPU | Ensure `nvidia-container-toolkit` is installed and Docker was restarted |
| Plex not using NVENC | Check container has `NVIDIA_DRIVER_CAPABILITIES=video,compute,utility` set |

## See Also

- [Roadmap Day 1](../roadmap.md) — when to do this
- [Roadmap Day 6](../roadmap.md) — Plex NVENC setup
- [Roadmap Day 12](../roadmap.md) — AI stack setup
- [Plex](../apps/plex.md)
- [llama.cpp](../apps/llama-cpp.md)
- [Stable Diffusion](../apps/stable-diffusion.md)
