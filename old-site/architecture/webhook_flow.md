# Webhook Flow SOP

## Goal
To receive a successful payment payload from PayPal, generate a secure MEGA download link for the purchased beat, and email it to the buyer using Resend.

## Inputs
- `paypal_webhook_payload`: JSON containing `resource.id` (transaction ID), `resource.payer.email_address`, and custom fields indicating the `beat_id`.

## Tool Logic (Layer 3)
1. **Validation**: Verify the PayPal webhook signature to ensure it's not a spoofed request.
2. **Database Lookup**: (Mocked for now) Retrieve the MEGA file handle based on the `beat_id`.
3. **MEGA Link Generation**: Use `megajs` to generate a direct download link for the WAV/Stem file.
4. **Email Dispatch**: Use `resend` to send an HTML-formatted email containing the download link to the buyer's email address.

## Edge Cases
- **Invalid Signature**: Drop the request immediately (return 400).
- **MEGA API Rate Limit**: Retry with exponential backoff.
- **Email Bounce**: Log the failure for manual review.
- **Missing Beat ID**: If custom fields are empty, alert the admin.
