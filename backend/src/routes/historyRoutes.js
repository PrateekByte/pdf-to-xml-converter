const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const authenticateUser = require("../middleware/authMiddleware");

// Route to get conversation history
router.get("/", authenticateUser, historyController.getHistory);

// Route to save a new conversation
router.post("/", authenticateUser, historyController.saveHistory);

module.exports = router;
