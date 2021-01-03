import { Request, Response } from "@architect/shared/architect-types";
import { isLoggedIn } from "@architect/shared/utils";
import { webAppResponse } from "@architect/views/page-layout";
import redirect from "@architect/shared/redirect";
import config from "@architect/shared/config";

export async function handler(request: Request): Promise<Response> {
  if (isLoggedIn(request)) {
    // You're already logged in, no need to sign up
    return redirect(config.loginRedirectURL);
  }
  return webAppResponse;
}
