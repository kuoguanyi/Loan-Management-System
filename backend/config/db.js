const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" }); 

mongoose.set("strictQuery", true);

console.log(" Using MONGO_URI =", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" ongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
