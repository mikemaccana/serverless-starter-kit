import { config as dotEnvConfig } from "dotenv";
import { log } from "../utils";
import { Person } from "../person";
import { formDecode } from "../get-form-data";

dotEnvConfig();

describe(`Form decoding`, () => {
  it(`Decodes HTML form data`, () => {
    const string =
      "Z2l2ZW5OYW1lPU1pa2UmZmFtaWx5TmFtZT1NYWNDYW5hJmVtYWlsPW1pa2UubWFjY2FuYSU0MGdtYWlsLmNvbSZwYXNzd29yZD1kc2ZzZGYmaXNUZXJtc0FuZENvbmRpdGlvbnNBZ3JlZWQ9b24=";
    expect(formDecode(string)).toMatchObject({
      givenName: "Mike",
      familyName: "MacCana",
      email: "mike.maccana@gmail.com",
      password: "dsfsdf",
      isTermsAndConditionsAgreed: "on",
    });
  });
});
