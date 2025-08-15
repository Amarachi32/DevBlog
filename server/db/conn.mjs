import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

let uri;
if (process.env.NODE_ENV === "production") {
  uri = process.env.ATLAS_URI;
} else if (process.env.NODE_ENV === "staging") {
  uri = process.env.ATLAS_URI_STAGING;
} else {
  // Fallback for local development
  uri = process.env.ATLAS_URI_LOCAL;
}
const client = new MongoClient(uri);
//const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

//let db = conn.db("sample_training");
let db;
if (process.env.NODE_ENV === "production") {
  db = conn.db("production_db_name");
} else if (process.env.NODE_ENV === "staging") {
  db = conn.db("staging_db_name");
} else {
  db = conn.db("local_db_name");
}

export default db;