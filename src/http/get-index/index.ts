import { Request, Response } from "../../shared/architect-types";
import { STATUSES, CONTENT_TYPES, stringify, log } from "../../shared/utils";
import { layoutPage } from "../../views/page-layout";

function getWebSocketURL() {
  let env = process.env.NODE_ENV;
  let testing = "ws://localhost:3333";
  let staging = "fixme: these urls are printed after create";
  let production = "fixme: these urls are printed after create";
  if (env === "staging") return staging;
  if (env === "production") return production;
  return testing;
}

const TITLE = "Fullstack Serverless Starter Kit";
const webSocketURL = getWebSocketURL();

const html = layoutPage({ title: TITLE, websocketURL: webSocketURL });

export async function handler(request: Request): Promise<Response> {
  return {
    statusCode: STATUSES.OK,
    headers: {
      "Content-Type": CONTENT_TYPES.html,
    },
    body: html,
  };
}
