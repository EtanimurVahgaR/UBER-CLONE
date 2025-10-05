const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");

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
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
