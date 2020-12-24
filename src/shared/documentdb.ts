#!/usr/bin/env ts-node
import dotenv from "dotenv";
import {
  Db as Database,
  MongoClient,
  Cursor,
  UpdateWriteOpResult,
} from "mongodb";
import { encode as encodeQueryString } from "querystring";
import { ObjectLiteral } from "./utils";
dotenv.config();

const log = console.log.bind(console);

const USERNAME = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE = process.env.MONGODB_DATABASE;

export const HARD_CODE_TEST_DATABASE_NAME_WHEN_DESTROYING = "unit_tests";

if (!USERNAME) {
  throw new Error(`Missing MONGODB_USER in .env file`);
}

if (!PASSWORD) {
  throw new Error(`Missing MONGODB_PASSWORD in .env file`);
}

if (!DATABASE) {
  throw new Error(`Missing MONGODB_DATABASE in .env file`);
}

function getMongoConnectionString(
  username: string,
  password: string,
  host: string,
  database: string,
  options
) {
  let connectionString = `mongodb://localhost/${DATABASE}?`;
  connectionString += encodeQueryString(options);
  return connectionString;
}

const uri = getMongoConnectionString(
  USERNAME,
  PASSWORD,
  "localhost",
  DATABASE,
  // From https://docs.mongodb.com/drivers/node/quick-start
  {
    retryWrites: true,
    w: "majority",
  }
);

// Great article on generics:
// https://www.digitalocean.com/community/tutorials/typescript-generics-in-typescript
export async function dbOperation<T>(
  work: (database: Database) => Promise<T>
): Promise<T> {
  let client: MongoClient;
  let result: T;
  try {
    // useUnifiedTopology prevents a deprection warning
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db(DATABASE);
    result = await work(database);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}

export async function destroyDatabase(): Promise<void> {
  await dbOperation(async function (database) {
    await database.dropDatabase();
  });
}

async function cursorToDocuments(cursor: Cursor): Promise<ObjectLiteral[]> {
  const documents = [];
  // http://mongodb.github.io/node-mongodb-native/3.2/api/Cursor.html
  await cursor.forEach(function (document) {
    // If the item is null then the cursor is exhausted/empty and closed
    if (!document) {
      return;
    }
    documents.push(document);
  });
  return documents;
}

export async function addOrUpdate(
  database: Database,
  collection: string,
  document: ObjectLiteral
): Promise<UpdateWriteOpResult> {
  return database.collection(collection).updateOne(
    {
      _id: document._id,
    },
    // See https://docs.mongodb.com/manual/reference/operator/update/
    { $set: document },
    {
      upsert: true,
    }
  );
}

export async function getAllDocuments(
  database: Database,
  collection: string
): Promise<ObjectLiteral[]> {
  const cursor = await database.collection(collection).find();
  return cursorToDocuments(cursor);
}
