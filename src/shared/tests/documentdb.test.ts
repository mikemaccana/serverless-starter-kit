import { config as dotEnvConfig } from "dotenv";
import {
  addOrUpdate,
  dbOperation,
  destroyDatabase,
  getAllDocuments,
  getDatabasenameForTests,
} from "../documentdb";
import { Db, ObjectID } from "mongodb";
import { log } from "../utils";
import { Person } from "../person";
import { MILLISECONDS } from "../constants";
import path from "path";

const now = Date.now();

const person: Person = {
  givenName: "Mike",
  familyName: "MacCana",
  email: "mike.maccana@gmail.com",
  created: now,
  updated: now,
};

dotEnvConfig();

describe(`MongoDB / DocumentDB client`, () => {
  it(`Gets the correct database name for tests`, () => {
    expect(getDatabasenameForTests()).toEqual("documentdb-test");
  });

  it(
    `Connects, does operation, and disconnects`,
    async () => {
      expect.assertions(1);
      const result = await dbOperation(async function (database) {
        const movieCollection = database.collection("movies");
        await movieCollection.insertOne({ title: "Back to the Future 2" });
        const movie = await movieCollection.findOne({
          title: "Back to the Future 2",
        });
        return movie;
      });

      expect(result).toMatchObject({
        _id: expect.any(ObjectID),
        title: "Back to the Future 2",
      });
    },
    100 * MILLISECONDS
  );

  test(
    `clear test DB`,
    async function () {
      expect.assertions(0);
      destroyDatabase();
    },
    50 * MILLISECONDS
  );

  test(
    `Can save a document to DocumentDB`,
    async function () {
      expect.assertions(1);
      await dbOperation(async function (database: Db) {
        const updatedPerson = await addOrUpdate(database, "people", person);
        expect(updatedPerson).toBeTruthy();
      });
    },
    100 * MILLISECONDS
  );

  test(
    `Can update an existing doc`,
    async function () {
      expect.assertions(1);
      person.email = "mike@mikemaccana.com";
      await dbOperation(async function (database: Db) {
        await addOrUpdate(database, "people", person);
        const people = await getAllDocuments(database, "people");
        expect(people).toHaveLength(1);
      });
    },
    50 * MILLISECONDS
  );
});
