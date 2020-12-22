import { Request, Response } from "../../shared/architect-types";
import { log } from "../../shared/utils";
import { aNotFoundPage } from "../../views/page-layout";

export async function handler(request: Request): Promise<Response> {
  log(`Request to non-existent route ${request.rawPath}`);
  return aNotFoundPage;
}
