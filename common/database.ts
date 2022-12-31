import * as mongodb from "mongodb";
import * as dotenv from "dotenv";
import debug from "debug";
import { z } from "zod";
import { PackageManifest } from "../api/api";

export const collections: {
  manifests?: mongodb.Collection<PackageManifest>;
} = {};

const debugLog: debug.IDebugger = debug("app");

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DB_CONN_STRING: string;
      DB_NAME: string;
      DB_COLLECTION_NAME: string;
    }
  }
}

export async function connectToDatabase() {
  dotenv.config();

  const client: mongodb.MongoClient = new mongodb.MongoClient(
    process.env.DB_CONN_STRING
  );
  console.log(process.env.DB_CONN_STRING);
  await client.connect();
  const db: mongodb.Db = client.db(process.env.DB_NAME);
  const manifestsCollection = db.collection<PackageManifest>(
    process.env.DB_COLLECTION_NAME
  );
  collections.manifests = manifestsCollection;
  debugLog(`Connected to database`);
}
