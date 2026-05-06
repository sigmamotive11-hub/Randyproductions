# Project Constitution

## Data Schemas
```json
{
  "BeatSchema": {
    "beat_id": "string",
    "title": "string",
    "price": "number",
    "preview_audio_url": "string",
    "product_type": "enum(wav, stems, exclusive)"
  },
  "CheckoutPayload": {
    "session_id": "string",
    "buyer_email": "string",
    "beat_ids": ["string"],
    "payment_status": "string"
  },
  "DeliveryPayload": {
    "buyer_email": "string",
    "subject": "string",
    "download_links": ["string"]
  }
}
```

## Behavioral Rules
- **No Paid Storage:** Must use generous free tier storage.
- **Instant Delivery:** The webhook must respond to payment success immediately and trigger email delivery.
- **Audio Protection:** Previews must be low-quality or tagged to prevent theft before purchase.

## Architectural Invariants
- **Frontend:** Personal website with audio player.
- **Payments:** External payment gateway handling checkout and webhooks.
- **Storage:** MEGA (20GB free) for high-quality WAV/Stem assets.
- **Automation Layer:** Node.js / TypeScript routing payment webhooks to cloud storage download link generation and email dispatch.

## Maintenance Log
