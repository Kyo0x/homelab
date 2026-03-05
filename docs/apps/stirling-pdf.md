# Stirling-PDF

Stirling-PDF is a self-hosted, all-in-one PDF manipulation tool with 50+ operations including merge, split, OCR, and compression.

## Deployment

| | |
|---|---|
| **Machine** | 🖥️ IBM Server |
| **Proxmox VM** | `docker` VM (Ubuntu 22.04) |
| **Port** | 8085 |
| **Access** | 🔒 VPN |
| **Storage** | `/data/appdata/stirling-pdf` (config + OCR data) |
    image: frooodle/s-pdf:latest
    container_name: stirling-pdf
    environment:
      - TZ=Europe/Oslo
      - DOCKER_ENABLE_SECURITY=false
    volumes:
      - /data/appdata/stirling-pdf/trainingData:/usr/share/tessdata
      - /data/appdata/stirling-pdf/extraConfigs:/configs
    ports:
      - 8085:8085
    restart: unless-stopped
```

## Setup

1. Start the container and open Stirling-PDF at `http://IBM:8085`.
2. No account is required by default — all tools are immediately accessible.
3. Enable authentication by setting `DOCKER_ENABLE_SECURITY=true` and configuring an admin password.
4. Download additional Tesseract language data packs into `/trainingData` for OCR support in other languages.
5. Test the core operations: merge two PDFs, compress a large PDF, and run OCR on a scanned document.
6. Optionally expose via NPM with Authelia protection for access outside the local VPN.

## Configuration

**Key operations available:**

| Category | Operations |
|---|---|
| Organise | Merge, split, rotate, reorder, delete pages |
| Convert | PDF ↔ Word, PDF ↔ PowerPoint, PDF ↔ Excel, PDF ↔ HTML |
| Optimise | Compress, resize images, grayscale |
| Security | Add/remove passwords, watermarks, redact |
| OCR | Make scanned PDFs searchable (requires Tesseract) |
| Other | Extract images, flatten, repair, validate |

**Enable OCR for additional languages** — download Tesseract data files into the training data volume:

```bash
# Inside the container or as a bind-mounted volume
cd /usr/share/tessdata
wget https://github.com/tesseract-ocr/tessdata/raw/main/nor.traineddata  # Norwegian
wget https://github.com/tesseract-ocr/tessdata/raw/main/deu.traineddata  # German
```

**Enable login** — set in compose to restrict access:

```yaml
    environment:
      - DOCKER_ENABLE_SECURITY=true
      - SECURITY_ENABLELOGIN=true
      - SECURITY_INITIALLOGIN_USERNAME=admin
      - SECURITY_INITIALLOGIN_PASSWORD=yourpassword
```

## Integration

- **Paperless-NGX** — use Stirling-PDF to pre-process scanned documents (OCR, compress) before importing into Paperless.
- **Filebrowser** — download files from Filebrowser, process in Stirling-PDF, re-upload.
- **Nginx Proxy Manager** — expose at a subdomain with Authelia protection for household access.

## See Also

- [Paperless-NGX](paperless-ngx.md) — document archiving that benefits from pre-processed PDFs
- [Filebrowser](filebrowser.md) — file storage complement
- [Official Docs](https://github.com/Stirling-Tools/Stirling-PDF)
