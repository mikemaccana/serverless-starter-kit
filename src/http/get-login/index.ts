import { Request, Response } from "../../shared/architect-types";
import { STATUSES, CONTENT_TYPES, stringify, log } from "../../shared/utils";
import { layoutPage } from "../../views/page-layout";
import arc from "@architect/functions";

import config from "../../shared/config";

export async function handler(request: Request): Promise<Response> {
  const session = arc.http.session.read(request);

  const isLoggedIn = session?.person?.email;

  if (isLoggedIn) {
    return {
      statusCode: STATUSES.MOVED_TEMPORARILY,
      headers: {
        Location: config.loginRedirectURL,
      },
    };
  }

  let message = null;
  if (session.attemptedEmail) {
    message = `Could not log in as ${session.attemptedEmail}`;
  }

  return {
    statusCode: STATUSES.OK,
    body: layoutPage({
      title: "| Log in",
      serverVars: { message },
    }),
    headers: {
      "Content-Type": CONTENT_TYPES.html,
    },
  };
}
