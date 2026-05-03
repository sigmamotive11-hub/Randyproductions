import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Beat database — populated by Admin Studio uploads.
// Each entry maps a beat_id to its MEGA delivery links.
// Both wavLink and stemsLink are ALWAYS delivered to every buyer on every tier.
const BEAT_DATABASE = {
  'beat_001': {
    title: 'GHOST TOWN',
    wavLink: 'https://mega.nz/file/REPLACE_WAV_LINK',
    stemsLink: 'https://mega.nz/file/REPLACE_STEMS_LINK',
  },
};

export default async function (req, res) {
  console.log('Received PayPal Webhook:', JSON.stringify(req.body, null, 2));
  
  const event = req.body;
  if (event.event_type !== 'PAYMENT.CAPTURE.COMPLETED') {
    return res.status(200).send('Not a payment capture event');
  }

  const transactionId = event.resource.id;
  const buyerEmail = event.resource.payer?.email_address || 'test@example.com';
  const beatId = event.resource.custom_id || 'beat_001'; 
  
  try {
    console.log(`[1/3] Payment verified for ${beatId}. Buyer: ${buyerEmail}`);
    
    const beat = BEAT_DATABASE[beatId];
    if (!beat) {
      console.error(`[ERROR] Beat ID ${beatId} not found in database.`);
      return res.status(404).send('Beat not found');
    }

    console.log(`[2/3] Fetched delivery links for "${beat.title}"`);
    
    console.log(`[3/3] Sending delivery email to ${buyerEmail}...`);
    await resend.emails.send({
      from: 'Randyproductions <onboarding@resend.dev>',
      to: [buyerEmail],
      subject: `Your Files Are Ready — ${beat.title} (Order ${transactionId})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212,175,55,0.3); border-radius: 8px;">
          <h1 style="color: #d4af37; letter-spacing: 4px; text-transform: uppercase; font-size: 1.2rem;">RANDYPRODUCTIONS</h1>
          <h2 style="font-size: 1.8rem; margin: 20px 0 10px;">Your files are ready.</h2>
          <p style="color: #888; margin-bottom: 30px;">Thank you for your purchase. Your full download package for <strong style="color: #fff;">${beat.title}</strong> is included below.</p>
          
          <div style="margin-bottom: 20px; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">
            <p style="margin: 0 0 12px; font-size: 0.85rem; color: #888; text-transform: uppercase; letter-spacing: 1px;">High-Quality WAV File</p>
            <a href="${beat.wavLink}" style="display: inline-block; padding: 12px 28px; background-color: #d4af37; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">Download WAV</a>
          </div>

          <div style="margin-bottom: 30px; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">
            <p style="margin: 0 0 12px; font-size: 0.85rem; color: #888; text-transform: uppercase; letter-spacing: 1px;">Trackout Stems — ZIP</p>
            <a href="${beat.stemsLink}" style="display: inline-block; padding: 12px 28px; background-color: #d4af37; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">Download Stems</a>
          </div>

          <p style="font-size: 0.8rem; color: #555;">Order ID: ${transactionId}</p>
          <p style="font-size: 0.8rem; color: #555;">For support, contact: Sigmamotive11@gmail.com</p>
          <p style="margin-top: 20px; font-size: 0.8rem; color: #444;">By downloading, you agree to the Randyproductions Licensing Terms. Credit as: Prod. Randyy</p>
        </div>
      `
    });

    console.log('✅ Webhook processed and email sent successfully!');
    res.status(200).send('Success');
  } catch (error) {
    console.error('❌ Webhook processing failed:', error);
    res.status(500).send('Internal Server Error');
  }
}
