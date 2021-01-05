import arc from "@architect/functions";
import sandbox from "@architect/sandbox";
import { SECOND } from "@architect/shared/constants";
import { log } from "@architect/shared/utils";
import tiny from "tiny-json-http";

describe(`Can sign up`, () => {
  beforeAll(async () => {
    await sandbox.start();
  });

  test(
    `Can sign up`,
    async () => {
      expect.assertions(1);
      const response = await tiny.post({
        url: "http://localhost:3333/signup",
        data: {
          email: "unittest@example.com",
          givenName: "Unit",
          familyName: "Testerson",
        },
      });
      expect(response.headers).toBeTruthy(); //.toMatchObject({});
    },
    1 * SECOND
  );
});
