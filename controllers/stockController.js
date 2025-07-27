const Stock = require("../models/StockModel");

// Create stock
exports.createStock = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ error: "Error creating stock", details: err.message });
  }
};

// Get all stocks
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stocks", details: err.message });
  }
};

// Get stock by ID
exports.getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ error: "Stock not found" });
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stock", details: err.message });
  }
};

// Update stock by ID
exports.updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stock) return res.status(404).json({ error: "Stock not found" });
    res.status(200).json(stock);
  } catch (err) {
    res.status(400).json({ error: "Error updating stock", details: err.message });
  }
};

// Delete stock (soft delete by setting disabled: true)
exports.deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, { disabled: true }, { new: true });
    if (!stock) return res.status(404).json({ error: "Stock not found" });
    res.status(200).json({ message: "Stock disabled successfully", stock });
  } catch (err) {
    res.status(500).json({ error: "Error disabling stock", details: err.message });
  }
};
