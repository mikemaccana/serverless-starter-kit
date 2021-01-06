import config from "./config";
import dotenv from "dotenv";
import htmlToText from "html-to-text";
dotenv.config();

// From https://app.sendgrid.com/guide/integrate/langs/nodejs
import sendgridEmail from "@sendgrid/mail";
import { log } from "./utils";

const EMBARASSING_PATTERNS = [/\{/, /\}/, /\[object/];

const from = config.email.fromAddress;

// Don't ever send a customer something like 'Hi there {{ firstName }}'
// Because that's embarassing
// We *must* have plainText, as HTML with inline CSS contains {} characters.
export function _checkEmbarassing(plainText: string): undefined {
  EMBARASSING_PATTERNS.forEach(function (embarassingPattern) {
    // Some properties could be null, or objects (eg, for when we send JSON)
    const isEmbarassing = plainText.match(new RegExp(embarassingPattern));
    if (isEmbarassing) {
      throw new Error(
        `Refusing to send message: possible embarassing pattern in text: ${plainText}`
      );
    }
  });
  return;
}

const convertHTMLToText = function (string) {
  return htmlToText.fromString(string, {
    // Don't format for specific line width (many devices are narrower or wider than 80 characters)
    wordwrap: false,
  });
};

export async function sendEmail({
  recipient,
  subject,
  html,
  text,
}: {
  recipient: string;
  subject: string;
  html: string;
  // If a text version isn't supplied we'll just make one
  text?: string;
}): Promise<void> {
  if (html) {
    if (!text) {
      text = convertHTMLToText(html);
    }
  }

  _checkEmbarassing(text);

  const message = {
    to: recipient,
    from,
    subject,
    html,
    text,
  };
  if (!config.isProduction) {
    log(`Refusing to send email outside production`);
    log(
      `Would have sent email to '${recipient}', subject '${subject}', with body\n${text}`
    );

    return;
  }
  try {
    sendgridEmail.setApiKey(process.env.SENDGRID_API_KEY);
    await sendgridEmail.send(message);
  } catch (error) {
    console.error(error);
  }
}
