import arc from "@architect/functions";
import { sendEmail } from "@architect/shared/email";
import { log } from "@architect/shared/utils";

async function handler(payload) {
  const { recipient, subject, html, text } = payload;
  try {
    await sendEmail({
      recipient,
      subject,
      html,
      text,
    });
  } catch (error) {
    log(`Error sending email: ${error.message}`);
    throw error;
  }
  log(`Event 'send-email' completed`);
}

exports.handler = arc.events.subscribe(handler);
