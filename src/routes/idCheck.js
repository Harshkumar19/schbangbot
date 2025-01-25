// src/routes/idCheck.js
const express = require("express");
const router = express.Router();
const db = require("../firebase");

// New route for the root path
router.get("/", (req, res) => {
  res.send("working!");
});

router.post("/", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send("ID is required");
  }

  try {
    const schbangDoc = await db.collection("schbang").doc(id).get();
    if (schbangDoc.exists) {
      return res.send("Hi Schbanger!");
    }

    const clientDoc = await db.collection("client").doc(id).get();
    if (clientDoc.exists) {
      return res.send("Hi Client!");
    }

    return res.send("Hey, you are unknown to us");
  } catch (error) {
    console.error("Error checking ID:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
