import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
const BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { beatId, beatTitle, price, buyerEmail } = body;

    if (!beatId || !price) {
      return NextResponse.json({ error: 'Missing beatId or price' }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const orderRes = await fetch(`${BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: price.toFixed(2),
            },
            description: `${beatTitle} - WAV + Stems License`,
            custom_id: beatId,
            payee: {
              email_address: buyerEmail,
            },
          },
        ],
        application_context: {
          brand_name: 'Randyproductions',
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/paypal/capture?beatId=${beatId}`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?cancelled=1`,
        },
      }),
    });

    const orderData = await orderRes.json();

    if (orderData.links) {
      const approvalLink = orderData.links.find((l: { rel: string }) => l.rel === 'approve');
      if (approvalLink) {
        return NextResponse.json({ approvalUrl: approvalLink.href, orderId: orderData.id });
      }
    }

    return NextResponse.json({ error: 'Could not create PayPal order', details: orderData }, { status: 500 });
  } catch (error) {
    console.error('PayPal order creation failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
