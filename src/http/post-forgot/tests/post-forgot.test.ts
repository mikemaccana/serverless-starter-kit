import sandbox from "@architect/sandbox";
import { createPerson } from "@architect/shared/authentication";
import { SECOND, SECONDS } from "@architect/shared/constants";
import { postForm } from "@architect/shared/test-helpers";
import { STATUSES } from "@architect/shared/utils";

// See https://arc.codes/docs/en/guides/developer-experience/local-development
describe(`Can reset forgotten password`, () => {
  beforeAll(async () => {
    await sandbox.start();
  });

  test(
    `Can reset forgotten password`,
    async () => {
      expect.assertions(2);
      const person = await createPerson({
        email: "yolo@swag.com",
        givenName: "Yolo",
        familyName: "Swaggins",
        password: "bananas",
      });
      const response = await postForm("http://127.0.0.1:3333/forgot", {
        email: person.email,
      });

      expect(response.status).toEqual(STATUSES.Found);
      expect(response.headers.get("location")).toEqual(
        "http://127.0.0.1:3333/forgot/sent"
      );
    },
    2 * SECONDS
  );

  afterAll(async () => {
    await sandbox.end();
  });
});
