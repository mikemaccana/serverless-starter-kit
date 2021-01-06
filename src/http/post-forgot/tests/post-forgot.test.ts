import sandbox from "@architect/sandbox";
import { createPerson } from "@architect/shared/authentication";
import { SECOND, SECONDS } from "@architect/shared/constants";
import { postForm } from "@architect/shared/test-helpers";
import {
  getRandomPortNumberForSandbox,
  STATUSES,
} from "@architect/shared/utils";

const SANDBOX_PORT = getRandomPortNumberForSandbox();

// See https://arc.codes/docs/en/guides/developer-experience/local-development
describe(`Can reset forgotten password`, () => {
  beforeAll(async () => {
    await sandbox.start({ port: SANDBOX_PORT });
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
      const response = await postForm(
        `http://127.0.0.1:${SANDBOX_PORT}/forgot`,
        {
          email: person.email,
        }
      );

      // TODO: should be Found (as we're returning a redirect). Investigate and fix.
      expect(response.status).toEqual(STATUSES.OK);
      expect(response.headers.get("location")).toEqual(
        `http://127.0.0.1:${SANDBOX_PORT}/forgot/sent`
      );
    },
    1 * SECOND
  );

  afterAll(async () => {
    await sandbox.end();
  });
});
