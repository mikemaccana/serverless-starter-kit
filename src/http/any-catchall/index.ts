import { Request, Response } from "@architect/shared/architect-types";
import { log } from "@architect/shared/utils";
import { notFoundResponse } from "../../views/page-layout";

export async function handler(request: Request): Promise<Response> {
  log(`Request to non-existent route ${request.rawPath}`);
  return notFoundResponse;
}
