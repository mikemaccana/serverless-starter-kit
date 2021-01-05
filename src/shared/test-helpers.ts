import { ObjectLiteral } from "./utils";
import { URLSearchParams } from "url";
import fetch, { Response } from "node-fetch";

// https://www.npmjs.com/package/node-fetch#post-with-form-parameters
export async function postForm(
  url: string,
  body: ObjectLiteral
): Promise<Response> {
  const formBody = new URLSearchParams();
  Object.entries(body).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    formBody.append(key, value);
  });

  return fetch(url, {
    method: "POST",
    body: formBody,
    // Otherwise node-fetch will follow the direct and return unusual response codes
    redirect: "manual",
  });
}
