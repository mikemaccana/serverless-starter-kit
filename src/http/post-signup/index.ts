import { Request, Response } from "@architect/shared/architect-types";
import { log } from "@architect/shared/utils";
import { redirect } from "../../views/page-layout";
import arc from "@architect/functions";
import { dbOperation } from "@architect/shared/documentdb";
import config from "@architect/shared/config";
import uuid from "uuid";
import { addOrUpdate } from "@architect/shared/documentdb";
import { Person } from "@architect/shared/person";

require("@architect/shared/globals");

// Create a user account and sign people up!
export async function handler(request: Request): Promise<Response> {
  const session = arc.http.session.read(request);

  const body = JSON.parse(request.body);

  const personDetails: Person = {
    email: body.email,
    password: body.password,
    givenName: body["given-name"],
    familyName: body["family-name"],
    _id: uuid.v4(),
    created: Date.now(),
    updated: Date.now(),
  };

  const person = await dbOperation(function (database) {
    const updatedPerson = await addOrUpdate(database, "people", person);
  });

  log(`Created person in DB`);

  const cookie = await arc.http.session.write({ person });

  log(`Attached a person ${person._id} to the session.`);

  return redirect(config.loginRedirectURL, cookie);
}
