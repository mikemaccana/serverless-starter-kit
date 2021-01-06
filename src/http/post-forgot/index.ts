import { Request, Response } from "@architect/shared/architect-types";
import { log, ObjectLiteral, stringify } from "@architect/shared/utils";
import arc from "@architect/functions";
import redirect from "@architect/shared/redirect";
import config from "@architect/shared/config";
import {
  makePasswordResetToken,
  setPasswordResetTokenForEmail,
} from "@architect/shared/authentication";

const _renderPasswordResetEmail = function (passwordResetToken) {
  return `
    <p>We've received a request to reset the password for this email address.</p>

    <p>Your password reset link is below:<br/>
  
      https://${config.siteURL}/reset/${passwordResetToken}</p>
  
    <p>The link expires in one hour - if it's too late you can get a new one!</p>

    <p>If you don't want to reset your password, please ignore this message. Your password will not be reset.</p>

    <p>For help, just reply!</p>
  `;
};

async function handler(request: Request): Promise<Response> {
  const email = (request.body as ObjectLiteral).email;

  log(`Resetting password for ${email}`);

  // We send the password reset token email in the background
  const passwordResetToken = await makePasswordResetToken();
  await setPasswordResetTokenForEmail(email, passwordResetToken);

  // We send the password reset token email in the background
  await arc.events.publish({
    name: "send-email",
    payload: {
      recipient: email,
      subject: "Reset your password!",
      html: _renderPasswordResetEmail(passwordResetToken),
    },
  });

  return redirect("/forgot/sent");
}

// Needed to decode form data
exports.handler = arc.http.async(handler);
