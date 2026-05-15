import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64');
  const res = await fetch(BASE_URL + '/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + auth,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const beatId = searchParams.get('beatId');

    if (!token || !beatId) {
      return NextResponse.redirect(new URL((process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '?error=missing_params'));
    }

    const accessToken = await getAccessToken();
    const captureRes = await fetch(BASE_URL + '/v2/checkout/orders/' + token + '/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    });

    const captureData = await captureRes.json();

    if (captureData.status === 'COMPLETED') {
      const buyerEmail = captureData.payer?.email_address || '';
      const transactionId = captureData.id;
      const captureAmount = captureData.purchase_units?.[0]?.amount?.value || '0';

      // Fetch beat info
      const adminClient = createClient(supabaseUrl, serviceKey);
      const { data: beat, error } = await adminClient
        .from('beats')
        .select('*')
        .eq('id', beatId)
        .single();

      if (error || !beat) {
        console.error('Beat not found:', beatId);
        return NextResponse.redirect(new URL((process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '?error=beat_not_found'));
      }

      // Save purchase to database
      try {
        await adminClient.from('purchases').insert({
          beat_id: beatId,
          beat_title: beat.title,
          beat_image: beat.image || '',
          buyer_email: buyerEmail,
          amount: parseFloat(captureAmount),
          currency: 'USD',
          paypal_order_id: transactionId,
        });
      } catch (insertErr) {
        console.error('Failed to save purchase:', insertErr);
      }

      // Send delivery email
      if (RESEND_API_KEY && buyerEmail) {
        try {
          const resend = new Resend(RESEND_API_KEY);
          await resend.emails.send({
            from: 'Randyproductions <' + (process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev') + '>',
            to: [buyerEmail],
            subject: 'Your Files Are Ready — ' + beat.title + ' (Order ' + transactionId + ')',
            html: '<div style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212,175,55,0.3); border-radius: 8px;">'
              + '<h1 style="color: #d4af37; letter-spacing: 4px; text-transform: uppercase; font-size: 1.2rem;">RANDYPRODUCTIONS</h1>'
              + '<h2 style="font-size: 1.8rem; margin: 20px 0 10px;">Your files are ready.</h2>'
              + '<p style="color: #888; margin-bottom: 30px;">Thank you for your purchase of <strong style="color: #fff;">' + beat.title + '</strong>. Your WAV + Stems ZIP are below.</p>'
              + '<div style="margin-bottom: 20px; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">'
              + '<p style="margin: 0 0 12px; font-size: 0.85rem; color: #888; text-transform: uppercase; letter-spacing: 1px;">High-Quality WAV File</p>'
              + '<a href="' + (beat.wav_link || '') + '" style="display: inline-block; padding: 12px 28px; background-color: #d4af37; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">Download WAV</a>'
              + '</div>'
              + '<div style="margin-bottom: 30px; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">'
              + '<p style="margin: 0 0 12px; font-size: 0.85rem; color: #888; text-transform: uppercase; letter-spacing: 1px;">Trackout Stems — ZIP</p>'
              + '<a href="' + (beat.stems_link || '') + '" style="display: inline-block; padding: 12px 28px; background-color: #d4af37; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">Download Stems</a>'
              + '</div>'
              + '<p style="font-size: 0.8rem; color: #555;">Order ID: ' + transactionId + '</p>'
              + '<p style="font-size: 0.8rem; color: #555;">Support: Sigmamotive11@gmail.com</p>'
              + '<p style="margin-top: 20px; font-size: 0.8rem; color: #444;">Credit as: Prod. Randyy</p>'
              + '</div>',
          });
        } catch (emailError) {
          console.error('Failed to send email:', emailError);
        }
      }

      return NextResponse.redirect(new URL((process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '?success=1&title=' + encodeURIComponent(beat.title)));
    }

    return NextResponse.redirect(new URL((process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '?error=payment_failed'));
  } catch (error) {
    console.error('Capture failed:', error);
    return NextResponse.redirect(new URL((process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '?error=server_error'));
  }
}
