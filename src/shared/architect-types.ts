import { ObjectLiteral } from "./utils";

// https://arc.codes/primitives/http#req
export interface Request {
  version: String;
  routeKey: String;
  rawPath: String;
  pathParameters?: ObjectLiteral;
  rawQueryString: String;
  queryStringParameters?: Object;
  cookies?: String[];
  headers: ObjectLiteral;
  requestContext: ObjectLiteral;
  body?: String;
  isBase64Encoded: Boolean;
}

// https://arc.codes/primitives/http#res
export interface Response {
  statusCode: Number;
  headers?: ObjectLiteral;
  body?: String | Buffer;
  isBase64Encoded?: Boolean;
}
