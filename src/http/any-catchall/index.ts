import { Request, Response } from "@architect/shared/architect-types";
import { log } from "@architect/shared/utils";
import { notFoundResponse } from "@architect/views/page-layout";

export async function handler(request: Request): Promise<Response> {
  log(`Not found: ${request.rawPath}`);
  return notFoundResponse;
}
