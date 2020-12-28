import config from "./config";

// From https://app.sendgrid.com/guide/integrate/langs/nodejs
import sendgridEmail from "@sendgrid/mail";

sendgridEmail.setApiKey(process.env.SENDGRID_API_KEY);

const from = config.email.fromAddress;

export async function sendEmail(
  recipient: string,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  const message = {
    to: recipient,
    from,
    subject,
    html,
    text,
  };
  try {
    await sendgridEmail.send(message);
  } catch (error) {
    console.error(error);
  }
}
