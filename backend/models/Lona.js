const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  borrowerName: { type: String, required: true },
  amount: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: { type: String },
  address: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Loan", loanSchema);
