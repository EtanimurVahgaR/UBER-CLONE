const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to DB");
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

module.exports = connectToDb;
