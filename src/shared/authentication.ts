import { connect, Db, UpdateWriteOpResult } from "mongodb";
import { warn } from "../http/any-catchall/node_modules/@architect/shared/utils";
import { addOrUpdate, dbOperation } from "./documentdb";
import { Person } from "./person";
import uuid from "uuid";

import bcrypt from "bcrypt";

import { ObjectLiteral } from "../http/any-catchall/node_modules/@architect/shared/utils";
import {
  dateFromNow,
  dateFromNowNumber,
  getRandomBytes,
  log,
  makeStringUrlSafe,
} from "./utils";
import { DAY } from "./constants";

// See https://www.npmjs.com/package/bcrypt
const AMOUNT_OF_BCRYPT_ROUNDS = 4096;
const BCRYPT_SALT_ROUNDS = Math.log2(AMOUNT_OF_BCRYPT_ROUNDS);

export async function _makeHashedPassword(
  plainTextPassword: string
): Promise<string> {
  return bcrypt.hash(plainTextPassword, BCRYPT_SALT_ROUNDS);
}

// Shared functionality used when setting and resetting passwords
export async function _setPassword(
  database: Db,
  person: Person,
  suppliedPassword: string
): Promise<UpdateWriteOpResult> {
  const hashedPassword = await _makeHashedPassword(suppliedPassword);

  person.password = hashedPassword;
  person.passwordResetToken = null;
  person.passwordResetTokenExpires = null;
  return addOrUpdate(database, "people", person);
}

export async function setPassword(
  person: Person,
  suppliedPassword: string
): Promise<UpdateWriteOpResult> {
  return await dbOperation(async function (database) {
    return await _setPassword(database, person, suppliedPassword);
  });
}

export async function resetPasswordWithToken(
  suppliedResetToken: string,
  suppliedPassword: string
): Promise<UpdateWriteOpResult> {
  const now = Date.now();
  return dbOperation(async function (database) {
    const personDetails: ObjectLiteral = await database
      .collection("people")
      .findOne({
        passwordResetToken: suppliedResetToken,
        passwordResetTokenExpires: { $gte: now },
      });
    if (!personDetails) {
      throw new Error("Invalid or expired token");
    }

    return await _setPassword(
      database,
      personDetails as Person,
      suppliedPassword
    );
  });
}

export async function createPerson(
  email: string,
  givenName: string,
  familyName: string
): Promise<Person> {
  const person: Person = {
    email,
    givenName,
    familyName,
    _id: uuid.v4(),
    created: Date.now(),
    updated: Date.now(),
  };

  await dbOperation(async function (database) {
    const updatedPerson = await addOrUpdate(database, "people", person);
  });

  return person;
}

export async function getPersonByEmail(email: string): Promise<Person> {
  return dbOperation(async function (database) {
    return database.collection("people").findOne({ email });
  });
}

export async function authenticate(
  person: Person,
  suggestedPassword: string
): Promise<boolean> {
  return bcrypt.compare(suggestedPassword, person.password);
}

export async function authenticateWithEmail(
  email: string,
  suggestedPassword: string
): Promise<boolean> {
  const person = await getPersonByEmail(email);
  return authenticate(person, suggestedPassword);
}

// Return some random URL safe text
export async function makePasswordResetToken(): Promise<string> {
  const buffer = await getRandomBytes(20);
  return makeStringUrlSafe(buffer.toString("hex"));
}

// Shared functionality for setting and resetting password reset tokens
export async function _setPasswordResetToken(
  database: Db,
  person: Person,
  token: string
): Promise<UpdateWriteOpResult> {
  const expiryDate = dateFromNowNumber(1 * DAY);
  person.passwordResetToken = token;
  person.passwordResetTokenExpires = expiryDate;
  return await addOrUpdate(database, "people", person);
}

export async function setPasswordResetToken(
  person: Person,
  token: string
): Promise<UpdateWriteOpResult> {
  const expiryDate = dateFromNow(1 * DAY);
  return dbOperation(async function (database) {
    return _setPasswordResetToken(database, person, token);
  });
}

export async function setPasswordResetTokenForEmail(
  email: string,
  token: string
): Promise<UpdateWriteOpResult> {
  return dbOperation(async function (database) {
    const person: Person = await database
      .collection("people")
      .findOne({ email });
    if (!person) {
      throw new Error(`Could not find person with email '${email}'`);
    }
    return _setPasswordResetToken(database, person, token);
  });
}
