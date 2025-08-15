// import { MongoClient } from "mongodb";

// const connectionString = process.env.ATLAS_URI_STAGING || process.env.ATLAS_URI || null;

// let uri;
// if (process.env.NODE_ENV === "production") {
//   uri = process.env.ATLAS_URI;
// } else if (process.env.NODE_ENV === "staging") {
//   uri = process.env.ATLAS_URI_STAGING;
// } else {
//   // Fallback for local development
//   uri = process.env.ATLAS_URI_LOCAL;
// }
// const client = new MongoClient(uri);
// //const client = new MongoClient(connectionString);

// let conn;
// try {
//   conn = await client.connect();
// } catch(e) {
//   console.error(e);
// }

// //let db = conn.db("sample_training");
// let db;
// if (process.env.NODE_ENV === "production") {
//   db = conn.db("production_db_name");
// } else if (process.env.NODE_ENV === "staging") {
//   db = conn.db("staging_db_name");
// } else {
//   db = conn.db("local_db_name");
// }

// export default db;

import { MongoClient } from "mongodb";

// Support multiple environment variables with fallback
const connectionString = process.env.ATLAS_URI_STAGING || 
                         process.env.ATLAS_URI || 
                         null;

console.log("=== Database Connection Info ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("ATLAS_URI_STAGING exists:", !!process.env.ATLAS_URI_STAGING);
console.log("ATLAS_URI_STAGING value:", process.env.ATLAS_URI_STAGING || "NOT SET");
console.log("ATLAS_URI exists:", !!process.env.ATLAS_URI);
console.log("ATLAS_URI value:", process.env.ATLAS_URI || "NOT SET");
console.log("Final connection string:", connectionString ? "✅ Found" : "❌ Not found");

if (!connectionString) {
  console.error("❌ No database connection string found!");
  console.error("Please set either ATLAS_URI_STAGING or ATLAS_URI environment variable");
  
  // List available environment variables for debugging
  const envVars = Object.keys(process.env)
    .filter(key => key.includes('ATLAS') || key.includes('MONGO') || key.includes('DATABASE'))
    .map(key => `${key}: ${process.env[key] ? 'SET' : 'NOT SET'}`);
  
  if (envVars.length > 0) {
    console.log("Available DB environment variables:", envVars);
  } else {
    console.log("No DB-related environment variables found");
  }
  
  process.exit(1);
}

if (!connectionString.startsWith('mongodb://') && !connectionString.startsWith('mongodb+srv://')) {
  console.error("❌ Invalid connection string format!");
  console.error("Expected format: mongodb:// or mongodb+srv://");
  process.exit(1);
}

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("🔄 Connecting to MongoDB...");
  conn = await client.connect();
  console.log("✅ Successfully connected to MongoDB");
} catch(e) {
  console.error("❌ MongoDB connection failed:", e.message);
  process.exit(1);
}

// Use different database names based on environment if needed
const environment = process.env.NODE_ENV || 'development';
const dbName = environment === 'production' ? 'sample_training' : `sample_training_${environment}`;

console.log(`📚 Using database: ${dbName}`);
let db = conn.db(dbName);

export default db;