const express = require("express");
const router = express.Router();
const db = require("../mongodb");

// Route to add data to the database
router.get("/", async (req, res) => {
  try {
    // Add a document to the 'users' collection for 'schbang'
    await db.collection("users").updateOne(
      { _id: "schbang" },
      { $set: { number: "9354992217" } }, // Updated number for schbang
      { upsert: true }
    );

    // Add a document to the 'users' collection for 'client'
    await db.collection("users").updateOne(
      { _id: "client" },
      { $set: { number: "9619297739" } }, // Updated number for client
      { upsert: true }
    );

    res.send("Data added: ID schbang and client updated.");
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
