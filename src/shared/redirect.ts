import { ObjectLiteral, STATUSES } from "./utils";
import { Response } from "./architect-types";

export default function redirect(
  destination: string,
  cookie?: ObjectLiteral
): Response {
  const headers = {
    Location: destination,
  };

  if (cookie) {
    headers["set-cookie"] = cookie;
  }

  return {
    statusCode: STATUSES["Found"],
    headers,
  };
}
