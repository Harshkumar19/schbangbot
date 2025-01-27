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
    // Convert the input number to a number type
    const inputNumber = Number(number);

    // Check if the number exists in the 'users/client' document
    const clientDoc = await db.collection("users").doc("client").get();
    if (clientDoc.exists) {
      const clientData = clientDoc.data();
      if (Number(clientData.number) === inputNumber) {
        return res.send("C"); // Response for client
      }
    }

    // Check if the number exists in the 'users/schbang' document
    const schbangDoc = await db.collection("users").doc("schbang").get();
    if (schbangDoc.exists) {
      const schbangData = schbangDoc.data();
      if (Number(schbangData.number) === inputNumber) {
        return res.send("S"); // Response for schbang
      }
    }

    // If no matches found, return "U"
    return res.send("U");
  } catch (error) {
    console.error("Error checking number:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
