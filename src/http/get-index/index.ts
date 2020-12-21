import { Request, Response } from "../../shared/architect-types";
import { STATUSES, CONTENT_TYPES, stringify, log } from "../../shared/utils";
import { layoutPage } from "../../views/page-layout";

function getWebSocketURL() {
  const env = process.env.NODE_ENV;
  const testing = "ws://localhost:3333";
  const staging = "fixme: these urls are printed after create";
  const production = "fixme: these urls are printed after create";
  if (env === "staging") {
    return staging;
  }
  if (env === "production") {
    return production;
  }
  return testing;
}

const serverVars = {
  webSocketURL: getWebSocketURL(),
};

const html = layoutPage({ serverVars });

export async function handler(request: Request): Promise<Response> {
  return {
    statusCode: STATUSES.OK,
    headers: {
      "Content-Type": CONTENT_TYPES.html,
    },
    body: html,
  };
}
