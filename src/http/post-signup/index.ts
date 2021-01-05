import { Request, Response } from "@architect/shared/architect-types";
import { log, ObjectLiteral, stringify } from "@architect/shared/utils";
import config from "@architect/shared/config";
import arc from "@architect/functions";
import { createPerson } from "@architect/shared/authentication";
import redirect from "@architect/shared/redirect";

// Create a user account and sign people up!
async function handler(request: Request): Promise<Response> {
  const body: ObjectLiteral = request.body as ObjectLiteral;
  const { email, givenName, familyName, password } = body;
  log({ email, givenName, familyName, password });
  const person = await createPerson({ email, givenName, familyName, password });

  log(`Created person in DB`, person);
  const cookie = await arc.http.session.write({ person });
  log(`Attached a person ${person._id} to the session.`);
  const response = redirect(config.loginRedirectURL, cookie);
  log(`Response is`, response);
  log(`Redirecting...`);
  return response;
}

// Needed to decode form data
exports.handler = arc.http.async(handler);
