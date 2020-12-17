import { log } from "../../shared/utils";

export function dateStringToMonth(dateString: string) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = _getMonth(date);
  return `${year}${padMonth(month)}`;
}

function padMonth(month: number) {
  const padding = month < 10 ? "0" : "";
  return `${padding}${month}`;
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

export function getNextMonth(yearAndMonth: string) {
  let year = Number(yearAndMonth.substring(0, 4));
  let month = Number(yearAndMonth.substring(4, 6));
  if (month === 12) {
    year++;
    month = 1;
  } else {
    month++;
  }
  return `${year}${padMonth(month)}`;
}
