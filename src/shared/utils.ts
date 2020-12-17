import { STATUS_CODES } from "http";

export const SECONDS = 1000;

export const STATUSES = Object.fromEntries(
  Object.entries(STATUS_CODES).map((entry) => [entry[1], Number(entry[0])])
);

export const CONTENT_TYPES = {
  html: "text/html; charset=utf8",
  // JSON doesn't need a charset - it's assumed to be in UTF-8
  json: "application/json",
};

export async function asyncForEach<T>(
  array: T[],
  iterator: (item: T, index: number, array: T[]) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await iterator(array[index], index, array);
  }
}

export const wait = async (timeInMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
};

export async function repeat<T>(
  func: () => Promise<T>,
  count: number
): Promise<T[]> {
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

export const stringify = (input: object): string => {
  return JSON.stringify(input, null, 2);
};

export function deepClone(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}

export const dateFromNow = function (adjustmentMs: number) {
  const now: number = new Date().valueOf();
  return new Date(now + adjustmentMs);
};

export interface ObjectLiteral {
  [key: string]: any;
}
