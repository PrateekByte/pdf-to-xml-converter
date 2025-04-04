const { convertPdfToXml } = require("../utils/pdfToXmlConverter");
const History = require("../models/historyModel");

const convertPdfToXmlHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert the uploaded PDF (buffer) to XML
    const xmlData = await convertPdfToXml(req.file.buffer);

    // Save the XML data directly to MongoDB
    const historyEntry = new History({
      userId: req.user?.id || "anonymous", // Associate with the logged-in user
      xmlData: xmlData, // Store the XML data in MongoDB
    });
    await historyEntry.save();

    res
      .status(200)
      .json({ xmlData, message: "XML data saved to the database." });
  } catch (error) {
    console.error("Error in convertPdfToXmlHandler:", error); // Log the error
    res.status(500).json({ message: "Error converting PDF to XML", error });
  }
};

const getConversionHistory = async (req, res) => {
  try {
    const userId = req.user?.id || "anonymous"; // Get user ID from req.user
    const history = await History.find({ userId }); // Fetch history for the logged-in user
    res.status(200).json(history); // Return history as JSON
  } catch (error) {
    console.error("Error retrieving conversion history:", error); // Log the error
    res
      .status(500)
      .json({ message: "Error retrieving conversion history", error });
  }
};

module.exports = {
  convertPdfToXml: convertPdfToXmlHandler,
  getConversionHistory,
};
