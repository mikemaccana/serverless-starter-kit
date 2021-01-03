import { STATUS_CODES } from "http";
import arc from "@architect/functions";
import { Request } from "./architect-types";
import util from "util";
import crypto from "crypto";

export const STATUSES = Object.fromEntries(
  Object.entries(STATUS_CODES).map((entry) => [entry[1], Number(entry[0])])
);

export const CONTENT_TYPES = {
  html: "text/html; charset=utf8",
  // JSON doesn't need a charset - it's assumed to be in UTF-8
  json: "application/json",
};

export function isLoggedIn(request: Request): boolean {
  const session = arc.http.session.read(request);
  log(`Checking isLoggedIn. session is ${stringify(session)}`);

  if (session?.person?.email) {
    return true;
  }
  return false;
}

export async function asyncForEach<Generic>(
  array: Generic[],
  iterator: (item: Generic, index: number, array: Generic[]) => Promise<void>
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await iterator(array[index], index, array);
  }
}

export const wait = async (timeInMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
};

export async function repeat<Generic>(
  func: () => Promise<Generic>,
  count: number
): Promise<Generic[]> {
  const results = [];
  for (let index = 0; index < count; index++) {
    results.push(func());
  }
  return Promise.all(results);
}

// eslint-disable-next-line no-console
export const log = console.log.bind(console);

// eslint-disable-next-line no-console
export const warn = console.warn.bind(console);

export const stringify = (input: Record<string, unknown>): string => {
  return JSON.stringify(input, null, 2);
};

export function deepClone(obj: ObjectLiteral): ObjectLiteral {
  return JSON.parse(JSON.stringify(obj));
}

export const dateFromNowNumber = function (adjustmentMs: number): number {
  const now: number = new Date().valueOf();
  return now + adjustmentMs;
};

export const dateFromNow = function (adjustmentMs: number): Date {
  return new Date(dateFromNowNumber(adjustmentMs));
};

export const getRandomBytes = util.promisify(crypto.randomBytes);

export function makeStringUrlSafe(string: string): string {
  // See https://en.wikipedia.org/wiki/Base64
  // and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
  const URL_UNSAFE_CHARACTERS = /^[\W]/g;
  return string.replace(URL_UNSAFE_CHARACTERS, "");
}

export async function getRandomUrlSafeString(length: number): Promise<string> {
  const buffer = await getRandomBytes(length);
  return makeStringUrlSafe(buffer.toString("hex").substring(0, length));
}

export interface ObjectLiteral {
  // eslint-disable-next-line
  [key: string]: any;
}
