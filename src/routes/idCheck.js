const express = require("express");
const router = express.Router();
const db = require("../mongodb");

// Route for checking the number
router.post("/", async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).send("Number is required");
  }

  try {
    const inputNumber = Number(number);

    // Check if the number exists in the 'client' collection
    const clientData = await db.collection("users").findOne({ _id: "client" });
    if (clientData && Number(clientData.number) === inputNumber) {
      return res.send({ userStatus: "C" }); // Response for client
    }

    // Check if the number exists in the 'schbang' collection
    const schbangData = await db
      .collection("users")
      .findOne({ _id: "schbang" });
    if (schbangData && Number(schbangData.number) === inputNumber) {
      return res.send({ userStatus: "S" }); // Response for schbang
    }

    // If no matches found, return "U"
    return res.send({ userStatus: "U" });
  } catch (error) {
    console.error("Error checking number:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
