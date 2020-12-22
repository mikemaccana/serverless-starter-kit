import { config as dotEnvConfig } from "dotenv";
import { dbOperation } from "../documentdb";
import { ObjectID } from "mongodb";
import { log } from "../utils";
dotEnvConfig();

describe(`MongoDB / DocumentDB client`, () => {
  it(`Connects, does operation, and disconnects`, async () => {
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
  }, 50);
});
