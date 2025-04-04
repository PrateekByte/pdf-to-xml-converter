const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  xmlData: {
    type: String, // Store the XML data as a string
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);
