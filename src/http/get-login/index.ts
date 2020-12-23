import { Request, Response } from "@architect/shared/architect-types";
import {
  STATUSES,
  CONTENT_TYPES,
  stringify,
  log,
} from "@architect/shared/utils";
import { webAppResponse, layoutPage } from "../../views/page-layout";
import arc from "@architect/functions";

import config from "@architect/shared/config";

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

  return webAppResponse;
}
