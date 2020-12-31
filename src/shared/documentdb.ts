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
import path from "path";

dotenv.config();

const log = console.log.bind(console);

const ONLY_DESTROY_DATABASES_WITH_THIS_STRING_INCLUDED = "test";

function getMongoConnectionString(
  username: string,
  password: string,
  host: string,
  database: string,
  options
) {
  let connectionString = `mongodb://localhost/${database}?`;
  connectionString += encodeQueryString(options);
  return connectionString;
}

export function getDatabasenameForTests(): string {
  // 'expect' will be provided by tests
  if (!(global as any).expect) {
    return null;
  }
  const testPathFull = expect?.getState().testPath;
  return path.parse(testPathFull).name.replace(".", "-");
}

// We could get these later, but we override process.env.MONGODB_DATABASE in unit tests
const USERNAME = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE = getDatabasenameForTests() || process.env.MONGODB_DATABASE;

if (!USERNAME) {
  throw new Error(`Missing MONGODB_USER in .env file`);
}

if (!PASSWORD) {
  throw new Error(`Missing MONGODB_PASSWORD in .env file`);
}

if (!DATABASE) {
  throw new Error(`Missing MONGODB_DATABASE in .env file`);
}

// Great article on generics:
// https://www.digitalocean.com/community/tutorials/typescript-generics-in-typescript
export async function dbOperation<T>(
  work: (database: Database) => Promise<T>
): Promise<T> {
  let client: MongoClient;
  let result: T;

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
    const databaseName = database.databaseName;
    if (
      !databaseName.includes(ONLY_DESTROY_DATABASES_WITH_THIS_STRING_INCLUDED)
    ) {
      throw new Error(
        `Refusing to delete database '${databaseName}' as it does not include '${ONLY_DESTROY_DATABASES_WITH_THIS_STRING_INCLUDED}'`
      );
    }
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
