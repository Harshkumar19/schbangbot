const express = require("express");
const router = express.Router();
const db = require("../mongodb");

// Function to generate random numbers with a prefix
const generateRandomNumbers = (prefix, count) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * 10000000000); // Generate a random 10-digit number
    numbers.push(`${prefix}${randomNumber}`);
  }
  return numbers;
};

// Route to renew the database
router.get("/renew", async (req, res) => {
  try {
    // Drop the existing database
    await db.dropDatabase();

    // Create new collections and add random numbers
    const clientNumbers = generateRandomNumbers("919", 10);
    const schbangNumbers = generateRandomNumbers("919", 10);

    await db.collection("users").insertMany([
      { _id: "client", numbers: clientNumbers },
      { _id: "schbang", numbers: schbangNumbers },
    ]);
    // Create the 'work' collection and add random work details
    const workDetails = [];
    for (let i = 0; i < 10; i++) {
      workDetails.push({
        title: `Descriptive Work Title ${i + 1}`,
        brand: `Brand Name ${i + 1}`,
        description: `Brief description of work ${i + 1}`,
        tags: [`Tag${i + 1}`, `Tag${i + 2}`],
        link: `http://example.com/work${i + 1}`,
      });
    }

    await db.collection("work").insertMany(workDetails);
    res.send("Database renewed and data added.");
  } catch (error) {
    console.error("Error renewing database:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get all client and schbang numbers
router.get("/numbers", async (req, res) => {
  try {
    const clientData = await db.collection("users").findOne({ _id: "client" });
    const schbangData = await db
      .collection("users")
      .findOne({ _id: "schbang" });

    if (!clientData || !schbangData) {
      return res.status(404).send("Client or Schbang data not found.");
    }

    res.send({
      clientNumbers: clientData.numbers,
      schbangNumbers: schbangData.numbers,
    });
  } catch (error) {
    console.error("Error fetching numbers:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get the latest 5 works
router.get("/getlatestwork", async (req, res) => {
  try {
    const latestWorks = await db
      .collection("work")
      .find({})
      .sort({ _id: -1 }) // Assuming _id is an ObjectId, this will sort by creation time
      .limit(5)
      .toArray();

    // Wrap the response in an object with the variable name 'work'
    res.send({ work: latestWorks });
  } catch (error) {
    console.error("Error fetching latest works:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
