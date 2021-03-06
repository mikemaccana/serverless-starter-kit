import {
  authenticate,
  createPerson,
  makePasswordResetToken,
  resetPasswordWithToken,
  setPasswordResetToken,
  _checkPassword,
  _makeHashedPassword,
} from "../authentication";
import { SECONDS } from "../constants";
import { Person } from "../person";
import { getRandomUrlSafeString, log } from "../utils";

const PLAINTEXT_PASSWORD = "bananas";

const newPassword = "ZOMG NEW PASSWORD";

async function createDemoPerson() {
  return createPerson({
    email: "joe@smith.com",
    givenName: "Joe",
    familyName: "Smith",
    password: PLAINTEXT_PASSWORD,
  });
}

describe(`Authentication`, () => {
  let passwordResetToken: string | null = null;

  test(`Basic bcrypt works`, async () => {
    const hashedPassword = await _makeHashedPassword(PLAINTEXT_PASSWORD);
    const result = await _checkPassword(PLAINTEXT_PASSWORD, hashedPassword);
    expect(result).toBeTruthy();
  });

  test(`Can get a random URL safe string`, async () => {
    const string: string = await getRandomUrlSafeString(69);
    expect(string).toHaveLength(69);
  });

  test(`can make a person`, async () => {
    const demoPerson: Person = await createDemoPerson();
    expect(demoPerson).toMatchObject({
      _id: expect.any(String),
      created: expect.any(Number),
      email: "joe@smith.com",
      familyName: "Smith",
      givenName: "Joe",
      // brcypt hashed passwords always include this
      password: expect.stringContaining("$2b$12$"),
      passwordResetToken: null,
      passwordResetTokenExpires: null,
      updated: expect.any(Number),
    });
  });

  test(`can login with a hashed password`, async () => {
    const demoPerson: Person = await createDemoPerson();
    const successfulLoginResult: boolean = await authenticate(
      demoPerson,
      PLAINTEXT_PASSWORD
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
