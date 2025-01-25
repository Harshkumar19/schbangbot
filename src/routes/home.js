const express = require("express");
const router = express.Router();

// Route for the root path
router.get("/", (req, res) => {
  res.send("working sirji!");
});

module.exports = router;
