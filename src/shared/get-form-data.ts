import { Request } from "./architect-types";
import { ObjectLiteral } from "./utils";

export function formDecode(string: string): ObjectLiteral {
  const results = {};
  const buffer = Buffer.from(string, "base64");
  const plainText = decodeURIComponent(buffer.toString("utf-8"));
  const items = plainText.split("&");
  items.forEach((item) => {
    console.log(item);
    const parts = item.split("=");
    const key = parts[0];
    const value = parts[1];
    results[key] = value;
  });
  return results;
}

export function getFormDataFromRequest(request: Request): ObjectLiteral {
  if (request.headers["content-type"] !== "application/x-www-form-urlencoded") {
    throw new Error(`Request has bad content type`);
  }
  if (!request.isBase64Encoded) {
    throw new Error(`Request isn't base64 encoded`);
  }
  return formDecode(request.body);
}
