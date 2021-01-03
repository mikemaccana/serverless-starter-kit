import { Request, Response } from "@architect/shared/architect-types";
import { log, ObjectLiteral } from "@architect/shared/utils";
import redirect from "@architect/shared/redirect";
import arc from "@architect/functions";
import { resetPasswordWithToken } from "@architect/shared/authentication";
import assert from "assert";
import config from "@architect/shared/config";
import { Person } from "@architect/shared/person";

require("@architect/shared/globals");

// Handle a user resetting their password - check the token and set their
// password, or if the token is invalid, ask them to try again
async function handler(request: Request): Promise<Response> {
  const session = arc.http.session.read(request);

  const body = request.body as ObjectLiteral;
  const passwordResetToken = request.pathParameters.token;
  const suppliedPassword = body.password;

  assert(passwordResetToken);
  assert(suppliedPassword);

  let person: Person;
  try {
    person = await resetPasswordWithToken(passwordResetToken, suppliedPassword);
  } catch (error) {
    log(`Password reset token is invalid or has expired.`);
    // TODO: show via websocket
    // "Password reset token is invalid or has expired."
    return redirect("/forgot");
  }

  const cookie = await arc.http.session.write({ person });

  return redirect(config.loginRedirectURL, cookie);
}

// Needed to decode form data
exports.handler = arc.http.async(handler);
