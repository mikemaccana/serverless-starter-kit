import { log, STATUSES } from "../../shared/utils";
import arc from "@architect/functions";

exports.handler = async function ws(event) {
  console.log("ws-default called with", event);

  let timestamp = new Date().toISOString();
  let connectionId = event.requestContext.connectionId;
  let message = JSON.parse(event.body);
  // Reply with an echo and a timestamp
  let text = `${timestamp} - Echoing ${message.text}`;

  await arc.ws.send({
    id: connectionId,
    payload: { text },
  });

  return { statusCode: STATUSES.OK };
};
