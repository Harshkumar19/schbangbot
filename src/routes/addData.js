const express = require("express");
const router = express.Router();
const db = require("../firebase");

// Route to add data to the database
router.get("/", async (req, res) => {
  try {
    // Check if the 'schbang' collection exists and add the document with ID '123'
    const schbangRef = db.collection("schbang").doc("123");
    await schbangRef.set({ name: "Sample Schbang" }); // Add any data you want

    // Check if the 'client' collection exists and add the document with ID '456'
    const clientRef = db.collection("client").doc("456");
    await clientRef.set({ name: "Sample Client" }); // Add any data you want

    res.send("Data added: ID 123 in schbang and ID 456 in client.");
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
