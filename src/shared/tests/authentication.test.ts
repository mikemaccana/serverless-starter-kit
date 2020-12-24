import { SECONDS } from "../../http/any-catchall/node_modules/@architect/shared/utils";
import {
  authenticate,
  createPerson,
  makePasswordResetToken,
  resetPasswordWithToken,
  setPassword,
  setPasswordResetToken,
} from "../authentication";
import { Person } from "../person";
import { getRandomUrlSafeString, log } from "../utils";

async function createDemoPerson() {
  return createPerson("Joe", "Smith", "joe@smith.com");
}

const newPassword = "ZOMG NEW PASSWORD";

describe(`Authentication`, () => {
  let passwordResetToken: string | null = null;

  test(`Can get a random URL safe string`, async () => {
    const string: string = await getRandomUrlSafeString(69);
    expect(string).toHaveLength(69);
  });

  test(`can make a person with a hashed password`, async () => {
    const SECRET = "bananas";
    const demoPerson: Person = await createDemoPerson();
    await setPassword(demoPerson, SECRET);
    const successfulLoginResult: boolean = await authenticate(
      demoPerson,
      SECRET
    );

    expect(successfulLoginResult).toBeTruthy();
    const badLoginResult: boolean = await authenticate(
      demoPerson,
      "WRONG PASSWORD"
    );
    expect(badLoginResult).toBeFalsy();
  });

  test(`Can make a password reset token`, async function () {
    passwordResetToken = await makePasswordResetToken();
    expect(passwordResetToken?.length).toBeGreaterThan(12);
  });

  test(
    `Can give a person a password reset token`,
    async function () {
      const demoPerson: Person = await createDemoPerson();
      const updatedPerson = await setPasswordResetToken(
        demoPerson,
        passwordResetToken
      );
      // TODO: add tests for expiry date etc
      expect(updatedPerson).toBeTruthy();
    },
    3 * SECONDS
  );

  test(
    `Can reset a password with a valid password reset token`,
    async function () {
      const person = await resetPasswordWithToken(
        passwordResetToken,
        newPassword
      );
      expect(person).toBeTruthy();
    },
    3 * SECONDS
  );

  test(
    `A fake password reset token won't work`,
    async function () {
      return expect(
        resetPasswordWithToken("bad token", newPassword)
      ).rejects.toThrow("Invalid or expired token");
    },
    3 * SECONDS
  );
});
