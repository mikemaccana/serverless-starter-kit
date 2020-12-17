import type ObjectLiteral from "./object-literal";

export const log = console.log.bind(console);

export const select = document.querySelector.bind(document);

export const selectAll = document.querySelectorAll.bind(document);

export const print = (object: ObjectLiteral): string =>
  JSON.stringify(object, null, 2);
