import type ObjectLiteral from "./object-literal";

export function getFormValues(form: HTMLFormElement): ObjectLiteral {
  const contents = {};
  const data = new FormData(form);
  for (const pair of data.entries()) {
    const key = pair[0];
    const value = pair[1];
    contents[key] = value;
  }
  return contents;
}

export function getFormDetails(
  selector: string
): {
  values: ObjectLiteral;
  url: string;
  method: string;
} {
  const form: HTMLFormElement = document.querySelector(selector);
  const values = getFormValues(form);
  const method = form.method;
  const url = form.action;
  return {
    values,
    url,
    method,
  };
}
