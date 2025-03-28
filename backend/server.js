const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const loanRoutes = require("./routes/loanRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config({ path: "./.env" });


const app = express();


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);


if (require.main === module) {
  connectDB(); 
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;
