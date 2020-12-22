import { Request, Response } from "../../shared/architect-types";
import { aFuckingWebPage } from "../../views/page-layout";

export async function handler(request: Request): Promise<Response> {
  return aFuckingWebPage;
}
