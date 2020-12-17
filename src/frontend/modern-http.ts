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

export const http = {
  get: async function (url: string): Promise<ModernResponse> {
    const uglyResponse = await fetch(url);

    const modernResponse: ModernResponse = {
      ok: uglyResponse.ok,
      status: uglyResponse.statusText,
      statusCode: uglyResponse.status,
      headers: {},
      body: null,
    };

    for (const pair of uglyResponse.headers.entries()) {
      const key = pair[0];
      const value = pair[1];
      // eslint-disable-next-line no-prototype-builtins
      if (modernResponse.headers.hasOwnProperty(key)) {
        modernResponse.headers[key].push(value);
      } else {
        modernResponse.headers[key] = [value];
      }
    }
    if (uglyResponse.headers !== null) {
      const contentTypeHeader: string | null = uglyResponse.headers.get(
        "content-type"
      );
      if (contentTypeHeader) {
        const contentTypes = contentTypeHeader.split(";");
        if (contentTypes.length) {
          const contentType = contentTypes[0];
          if (Object.keys(contentTypeHandlers).includes(contentType)) {
            // Sadly we can't override the inbuilt useless raw 'body'
            const contentTypeHandler: string = contentTypeHandlers[contentType];
            modernResponse.body = await uglyResponse[
              contentTypeHandler as keyof typeof contentTypeDecodingFunctions
            ]();
          } else {
            log(`Unknown content type: ${contentType}`);
          }
        }
      }
    }

    return modernResponse;
  },
};
