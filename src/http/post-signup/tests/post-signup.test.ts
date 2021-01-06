import sandbox from "@architect/sandbox";
import { SECOND } from "@architect/shared/constants";
import { postForm } from "@architect/shared/test-helpers";
import {
  getRandomPortNumberForSandbox,
  STATUSES,
} from "@architect/shared/utils";

const SANDBOX_PORT = getRandomPortNumberForSandbox();

// See https://arc.codes/docs/en/guides/developer-experience/local-development
describe(`Can sign up`, () => {
  beforeAll(async () => {
    await sandbox.start({ port: SANDBOX_PORT });
  });

  test(
    `Can sign up`,
    async () => {
      expect.assertions(2);
      const response = await postForm(
        `http://127.0.0.1:${SANDBOX_PORT}/signup`,
        {
          email: "unittest@example.com",
          givenName: "Unit",
          familyName: "Testerson",
          password: "BANANAS",
        }
      );

      expect(response.status).toEqual(STATUSES.Found);
      expect(response.headers.get("location")).toEqual(
        `http://127.0.0.1:${SANDBOX_PORT}/`
      );
    },
    1 * SECOND
  );

  afterAll(async () => {
    await sandbox.end();
  });
});
