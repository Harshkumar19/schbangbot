const express = require("express");
const bodyParser = require("body-parser");
const idCheckRoute = require("./routes/idCheck");
const addDataRoute = require("./routes/addData");
const homeRoute = require("./routes/home");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/check-id", idCheckRoute);
app.use("/add", addDataRoute);
app.use("/", homeRoute);
app.use("/aaaa");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
