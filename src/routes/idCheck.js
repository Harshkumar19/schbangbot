const express = require("express");
const router = express.Router();
const db = require("../firebase");

// Route for checking the number
router.post("/", async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).send("Number is required");
  }

  try {
    // Check if the number exists in the 'users/schbang' collection
    const schbangDoc = await db.collection("users").doc("schbang").get();
    const schbangData = schbangDoc.exists ? schbangDoc.data() : null;

    // Check if the number matches
    if (schbangData && schbangData.number === number) {
      return res.send("S"); // Response for schbang
    }

    // Check if the number exists in the 'users/client' collection
    const clientDoc = await db.collection("users").doc("client").get();
    const clientData = clientDoc.exists ? clientDoc.data() : null;

    // Check if the number matches
    if (clientData && clientData.number === number) {
      return res.send("C"); // Response for client
    }

    return res.send("U"); // Response for unknown
  } catch (error) {
    console.error("Error checking number:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
