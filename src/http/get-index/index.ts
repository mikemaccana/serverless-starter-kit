import { Request, Response } from "../../shared/architect-types";
import { STATUSES, CONTENT_TYPES, stringify, log } from "../../shared/utils";
import { layoutPage } from "../../views/page-layout";

const TITLE = "Fullstack Serverless Starter Kit";

const html = layoutPage(TITLE);

export async function handler(request: Request): Promise<Response> {
  return {
    statusCode: STATUSES.OK,
    headers: {
      "Content-Type": CONTENT_TYPES.html,
    },
    body: html,
  };
}
