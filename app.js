const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

const itemRoute = require("./routes/item");
const categoryRoute = require("./routes/category");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.use("/api/item", itemRoute);
app.use("/api/category", categoryRoute);
app.use("/use/user", authRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = {
  app,
};
