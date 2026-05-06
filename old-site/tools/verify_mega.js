import { Storage } from 'megajs';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing MEGA Connection...');
const { MEGA_EMAIL, MEGA_PASSWORD } = process.env;

if (!MEGA_EMAIL || !MEGA_PASSWORD) {
  console.error('❌ Missing MEGA_EMAIL or MEGA_PASSWORD in .env');
  process.exit(1);
}

async function verify() {
  try {
    const storage = await new Storage({
      email: MEGA_EMAIL,
      password: MEGA_PASSWORD
    }).ready;
    console.log(`✅ MEGA Connection Successful! Used storage: ${storage.usedBytes} bytes.`);
  } catch (error) {
    console.error('❌ MEGA Connection Failed:', error.message);
  }
}
verify();
