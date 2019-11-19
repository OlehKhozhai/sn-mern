const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Mongoose connected...");
  } catch (e) {
    process.exit(1);
    console.log("error---", e.message);
  }
};

module.exports = connectDB;
