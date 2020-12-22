import { Request, Response } from "../../shared/architect-types";
import { STATUSES, CONTENT_TYPES, stringify, log } from "../../shared/utils";
import { aFuckingWebPage } from "../../views/page-layout";
import arc from "@architect/functions";

import config from "../../shared/config";

require("@architect/shared/globals");

export async function handler(request: Request): Promise<Response> {
  const session = arc.http.session.read(request);

  log(`GET signup page. session is ${stringify(session)}`);

  if (session?.person?.email) {
    // You're already logged in
    return {
      statusCode: STATUSES.MOVED_TEMPORARILY,
      headers: {
        Location: config.loginRedirectURL,
      },
    };
  }

  return aFuckingWebPage;
}
