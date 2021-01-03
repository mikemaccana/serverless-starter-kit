import { SECOND } from "../constants";
import redirect from "../redirect";
import { log, STATUSES } from "../utils";

describe(`Redirects`, () => {
  test(
    `Redirects work`,
    function () {
      expect(STATUSES["Found"]).toBeTruthy();
      const redirectDir = "/somedir";
      const response = redirect(redirectDir);
      expect(response).toMatchObject({
        statusCode: 302,
        headers: { Location: redirectDir },
      });
    },
    1 * SECOND
  );
});
