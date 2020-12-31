const log = console.log.bind(console);

import type ObjectLiteral from "./object-literal";

// https://developer.mozilla.org/en-US/docs/Web/API/Response
const contentTypeHandlers: ObjectLiteral = {
  "application/json": "json",
  "text/plain": "text",
  "text/markdown": "text",
  "text/html": "text",
  "application/x-www-form-urlencoded": "formData",
};

enum contentTypeDecodingFunctions {
  json = "json",
  text = "text",
  formData = "formData",
}

interface ModernResponse {
  headers: ObjectLiteral;
  body: ObjectLiteral | string | null;
  ok: boolean;
  status: string;
  statusCode: number;
}

function cleanResponse(shitResponse: Response): ModernResponse {
  if (!shitResponse.ok) {
    throw new Error(`oh no response didn't work`);
  }
  const modernResponse: ModernResponse = {
    ok: shitResponse.ok,
    status: shitResponse.statusText,
    statusCode: shitResponse.status,
    headers: {},
    body: null,
  };

  for (const pair of shitResponse.headers.entries()) {
    const key = pair[0];
    const value = pair[1];
    // eslint-disable-next-line no-prototype-builtins
    if (modernResponse.headers.hasOwnProperty(key)) {
      modernResponse.headers[key].push(value);
    } else {
      modernResponse.headers[key] = [value];
    }
  }
  if (shitResponse.headers !== null) {
    const contentTypeHeader: string | null = shitResponse.headers.get(
      "content-type"
    );
    if (contentTypeHeader) {
      const contentTypes = contentTypeHeader.split(";");
      if (contentTypes.length) {
        const contentType = contentTypes[0];
        if (Object.keys(contentTypeHandlers).includes(contentType)) {
          // Sadly we can't override the inbuilt useless raw 'body'
          const contentTypeHandler: string = contentTypeHandlers[contentType];
          modernResponse.body = shitResponse[
            contentTypeHandler as keyof typeof contentTypeDecodingFunctions
          ]();
        } else {
          log(`Unknown content type: ${contentType}`);
        }
      }
    }
  }
  return modernResponse;
}

export const http = {
  get: async function (url: string): Promise<ModernResponse> {
    const shitResponse = await fetch(url);
    return cleanResponse(shitResponse);
  },
  post: async function (
    url: string,
    body: ObjectLiteral | string
  ): Promise<ModernResponse> {
    let contentType;
    let encodedBody = body;
    if (typeof body === "object") {
      contentType = "application/json";
      encodedBody = JSON.stringify(body);
    }
    if (typeof body === "string") {
      contentType = "text/plain";
      encodedBody = body;
    }
    const shitResponse = await fetch(url, {
      method: "POST",
      body: encodedBody as BodyInit,
      headers: {
        "Content-Type": contentType,
      },
    });
    return cleanResponse(shitResponse);
  },
};
