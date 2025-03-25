const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" }); // 保險一點

mongoose.set("strictQuery", true);

console.log("🧪 使用的 MONGO_URI =", process.env.MONGO_URI); // 調試用

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB 連線成功");
  } catch (error) {
    console.error("❌ MongoDB 連線錯誤:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
