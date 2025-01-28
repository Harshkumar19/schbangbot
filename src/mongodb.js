const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables

const uri = process.env.MONGODB_URI; // MongoDB connection string
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();

const db = client.db(process.env.MONGODB_DB_NAME); // Specify your database name
module.exports = db;
