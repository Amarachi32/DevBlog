import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";

console.log('=== ALL ENVIRONMENT VARIABLES ===');
console.log(JSON.stringify(process.env, null, 2));
console.log('=== END ENV VARS ===');
const PORT = process.env.PORT || 5050;
const app = express();

//app.use(cors());
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000', // for local development
    'https://devblog-frontend-staging.onrender.com', // your frontend URL
  ],
  credentials: true
}));
app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});
// A simple root endpoint to satisfy health checks
app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});
// Load the /posts routes
app.use("/posts", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
