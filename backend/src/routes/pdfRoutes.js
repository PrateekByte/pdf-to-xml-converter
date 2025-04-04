const express = require("express");
const multer = require("multer");
const pdfController = require("../controllers/pdfController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage

// Route to upload and convert PDF to XML
router.post(
  "/upload",
  authenticateUser,
  upload.single("pdf"), // Handle single file upload
  pdfController.convertPdfToXml
);

// Route to get conversion history
router.get("/history", authenticateUser, pdfController.getConversionHistory);

module.exports = router;
