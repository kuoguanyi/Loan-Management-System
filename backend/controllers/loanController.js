const User = require("../models/User");
const Loan = require("../models/Loan");

exports.createLoan = async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: "Loan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
