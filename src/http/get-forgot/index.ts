import { Request, Response } from "@architect/shared/architect-types";
import { webAppResponse } from "../../views/page-layout";

export async function handler(request: Request): Promise<Response> {
  return webAppResponse;
}
