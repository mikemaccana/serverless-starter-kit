import { log } from "../../shared/utils";

export function dateStringToMonth(dateString: string) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = _getMonth(date);
  const padding = month < 10 ? "0" : "";
  return `${year}${padding}${month}`;
}

export function _getMonth(date: Date) {
  return date.getMonth() + 1;
}

export function addOrIncrement(object, key) {
  if (key in object) {
    object[key]++;
  } else {
    object[key] = 1;
  }
}
