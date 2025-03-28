const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", loanController.createLoan);
router.get("/", loanController.getAllLoans);
router.put("/:id", loanController.updateLoan);
router.delete("/:id", loanController.deleteLoan);

module.exports = router;
