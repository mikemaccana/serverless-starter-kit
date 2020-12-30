import { Request, Response } from "@architect/shared/architect-types";
import { log } from "@architect/shared/utils";
import { redirect } from "../../views/page-layout";
import arc from "@architect/functions";
import config from "@architect/shared/config";
import { createPerson } from "@architect/shared/authentication";

require("@architect/shared/globals");

// Create a user account and sign people up!
export async function handler(request: Request): Promise<Response> {
  const body = JSON.parse(request.body);
  const { email, givenName, familyName } = body;
  const person = await createPerson(email, givenName, familyName);
  log(`Created person in DB`, person);
  const cookie = await arc.http.session.write({ person });
  log(`Attached a person ${person._id} to the session.`);
  return redirect(config.loginRedirectURL, cookie);
}
