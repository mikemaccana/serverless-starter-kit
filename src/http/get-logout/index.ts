import { Request, Response } from "../../shared/architect-types";
import { STATUSES, CONTENT_TYPES, stringify, log } from "../../shared/utils";
import { layoutPage } from "../../views/page-layout";
import arc from "@architect/functions";

import config from "../../shared/config";

export async function handler(request: Request): Promise<Response> {
  const cookie = await arc.http.session.write({ person: null });

  return {
    statusCode: STATUSES.MOVED_TEMPORARILY,
    headers: {
      Location: "/",
      "set-cookie": cookie,
    },
  };
}
