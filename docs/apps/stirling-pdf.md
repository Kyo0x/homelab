# Stirling-PDF

Stirling-PDF is a self-hosted, all-in-one PDF manipulation tool with 50+ operations including merge, split, OCR, and compression.

## Deployment

| | |
|---|---|
| **Host** | IBM Server |
| **Port** | 8080 |
| **Access** | 🔒 VPN |

## Docker Compose

```yaml
services:
  stirling-pdf:
    image: frooodle/s-pdf:latest
    container_name: stirling-pdf
    environment:
      - TZ=Europe/Oslo
      - DOCKER_ENABLE_SECURITY=false
    volumes:
      - /data/appdata/stirling-pdf/trainingData:/usr/share/tessdata
      - /data/appdata/stirling-pdf/extraConfigs:/configs
    ports:
      - 8080:8080
    restart: unless-stopped
```

## Setup

1. Start the container and open Stirling-PDF at `http://IBM:8080`.
2. No account is required by default — all tools are immediately accessible.
3. Enable authentication by setting `DOCKER_ENABLE_SECURITY=true` and configuring an admin password.
4. Download additional Tesseract language data packs into `/trainingData` for OCR support in other languages.
5. Test the core operations: merge two PDFs, compress a large PDF, and run OCR on a scanned document.
6. Optionally expose via NPM with Authelia protection for access outside the local VPN.

## Links

- [Official Docs](https://github.com/Stirling-Tools/Stirling-PDF)
