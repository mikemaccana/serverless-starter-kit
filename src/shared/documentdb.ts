#!/usr/bin/env ts-node
import dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
import { encode as encodeQueryString } from "querystring";
import { ObjectLiteral } from "./utils";
dotenv.config();

const log = console.log.bind(console);

const USERNAME = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE = process.env.MONGODB_DATABASE;

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
  work: (database: Db) => Promise<T>
): Promise<T> {
  let client: MongoClient;
  let result: T;
  try {
    console.time("dbOperation");
    // useUnifiedTopology prevents a deprection warning
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db(DATABASE);
    result = await work(database);
    console.timeEnd("dbOperation");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return result;
}
