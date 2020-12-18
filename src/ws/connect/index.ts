import { log, STATUSES } from "../../shared/utils";

exports.handler = async function ws(event) {
  // event.requestContext.connectionId
  // event.requestContext.apiId
  // event.body

  // TODO: verify event.headers.Origin to enforce same-origin
  return { statusCode: STATUSES.OK };
};
