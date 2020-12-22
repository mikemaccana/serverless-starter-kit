import { Request, Response } from "../../shared/architect-types";
import { aFuckingWebPage } from "../../views/page-layout";

require("@architect/shared/globals");

export async function handler(request: Request): Promise<Response> {
  return aFuckingWebPage;
}
