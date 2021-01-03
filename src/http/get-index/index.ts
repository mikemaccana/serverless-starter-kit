import { Request, Response } from "@architect/shared/architect-types";
import { makeWebAppResponse } from "@architect/views/page-layout";
import arc from "@architect/functions";
import { log } from "@architect/shared/utils";

// Check login attemot and redirect accordingly
async function handler(request: Request): Promise<Response> {
  const session = await arc.http.session.read(request);
  log(`Session`, session);
  return makeWebAppResponse({
    person: session.person,
  });
}

// Needed to decode form data
exports.handler = arc.http.async(handler);
