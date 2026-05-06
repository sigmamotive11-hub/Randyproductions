# Findings

## Research
- **Free Cloud Storage Options:**
  - Google Drive: 15GB free, robust API for secure link generation.
  - Cloudflare R2: 10GB free, S3-compatible, no egress fees. Good for direct link serving.
  - Mega: 20GB free, but API can be tricky for automated backend link generation.

## Discoveries
- The user wants a complete Beatstars replacement (Website + Auto-delivery).
- Delivery must happen instantly via email.
- **Payment:** PayPal selected. Client ID saved in `.env`.
- **UI/UX Reference:** Jay Cactus sites. Needs robust navigation (Tracks, Collections, Kits, Services), persistent audio player, premium dark/3D aesthetic.

## Constraints
- **Cost:** Must use free storage.
- **File Sizes:** WAV files and Stems can be large (100MB - 1GB+ per beat). 15GB free limit might eventually be hit depending on catalog size.
- **Storage Option Details:** Google Cloud provides Google Drive (15GB free) which can be accessed programmatically via Google Cloud Service Accounts. Google Cloud Storage itself has a 5GB free tier. We will proceed with Google Drive via Google Cloud for maximum free space.
