import { Request, Response } from "@architect/shared/architect-types";
import { log, ObjectLiteral, stringify } from "@architect/shared/utils";
import { redirect } from "../../views/page-layout";
import config from "@architect/shared/config";
import arc from "@architect/functions";
import { getFormDataFromRequest } from "@architect/shared/get-form-data";
import { createPerson } from "@architect/shared/authentication";

// Create a user account and sign people up!
export async function handler(request: Request): Promise<Response> {
  const body = getFormDataFromRequest(request);
  log(`User signed up:`, stringify(body));
  const { email, givenName, familyName } = body;
  log({ email, givenName, familyName });
  const person = await createPerson(email, givenName, familyName);
  log(`Created person in DB`, person);
  const cookie = await arc.http.session.write({ person });
  log(`Attached a person ${person._id} to the session.`);
  return redirect(config.loginRedirectURL, cookie);
}
