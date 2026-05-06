import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing PayPal Connection...');
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  console.error('❌ Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET in .env');
  process.exit(1);
}

async function verify() {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log('✅ PayPal Connection Successful! Token received.');
  } catch (error) {
    console.error('❌ PayPal Connection Failed:', error.response?.data || error.message);
  }
}
verify();
