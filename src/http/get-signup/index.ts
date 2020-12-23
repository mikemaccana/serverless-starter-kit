import { Request, Response } from "@architect/shared/architect-types";
import { isLoggedIn } from "@architect/shared/utils";
import { webAppResponse, redirect } from "../../views/page-layout";

import config from "@architect/shared/config";

require("@architect/shared/globals");

export async function handler(request: Request): Promise<Response> {
  if (isLoggedIn(request)) {
    // You're already logged in, no need to sign up
    return redirect(config.loginRedirectURL);
  }
  return webAppResponse;
}
