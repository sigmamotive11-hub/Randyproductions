import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('Testing Resend Connection...');
if (!process.env.RESEND_API_KEY) {
  console.error('❌ Missing RESEND_API_KEY in .env');
  process.exit(1);
}

async function verify() {
  try {
    // Listing domains requires valid auth
    const data = await resend.domains.list();
    console.log('✅ Resend Connection Successful!');
  } catch (error) {
    console.error('❌ Resend Connection Failed:', error.message);
  }
}
verify();
