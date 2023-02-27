const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./Database/DbConnector");
const router = require("./Routes/Coupon");
const bodyParser = require("body-parser");

dotenv.config();
connectDb();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/coupon", router);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("server is running");
});
