const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const loanRoutes = require("./routes/loanRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config({ path: "./.env" });

// ✅ 初始化 Express
const app = express();

// ✅ 設定 CORS（開放給前端）
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ 處理 JSON body
app.use(express.json());

// ✅ API 路由掛載
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);

// ✅ 如果此檔案被直接執行（而非測試），才啟動伺服器
if (require.main === module) {
  connectDB(); // 資料庫連線
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;
