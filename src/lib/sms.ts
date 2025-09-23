import twilio from "twilio"

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendSMS(to: string, message: string) {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE!,
      to,
    });
    console.log(`✅ SMS sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send SMS to ${to}:`, error);
  }
}
