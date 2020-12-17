import { Request, Response } from "../../shared/architect-types";
import {
  log,
  STATUSES,
  ObjectLiteral,
  CONTENT_TYPES,
} from "../../shared/utils";

export async function handler(request: Request): Promise<Response> {
  log(`Request to non-existent route ${request.rawPath}`);
  return {
    statusCode: STATUSES["Not Found"],
    headers: {
      "Content-Type": CONTENT_TYPES.html,
    },
    body: `<h1>Not found</h1>`,
  };
}
