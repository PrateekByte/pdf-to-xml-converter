const History = require("../models/historyModel");

exports.saveHistory = async (req, res) => {
  const { xmlData } = req.body;

  try {
    const historyEntry = new History({
      userId: req.user.id,
      xmlData,
    });
    await historyEntry.save();
    res.status(201).json({ message: "History saved successfully" });
  } catch (error) {
    console.error("Error saving history:", error);
    res.status(500).json({ message: "Error saving history", error });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await History.find({ userId });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Error retrieving history", error });
  }
};
