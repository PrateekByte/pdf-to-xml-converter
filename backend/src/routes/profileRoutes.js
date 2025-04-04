const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

const router = express.Router();

// Route to get user profile
router.get("/", authenticateUser, profileController.getProfile);

// Route to update user profile
router.put("/", authenticateUser, profileController.updateProfile);

// Route to update user password
router.put("/password", authenticateUser, profileController.updatePassword);

module.exports = router;
