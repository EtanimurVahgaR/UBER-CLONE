const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user.routes");

const express = require("express");
const app = express();

const cors = require("cors");
const connectToDb = require("./db/db");

(async () => {
  await connectToDb();
  // Rest of the app setup
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/users", userRoutes);

module.exports = app;
