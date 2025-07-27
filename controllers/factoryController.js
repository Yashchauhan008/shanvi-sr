const Factory = require('../models/FactoryModel');

// Create a new factory
exports.createFactory = async (req, res) => {
  try {
    const { name, party_id } = req.body;
    const factory = new Factory({ name, party_id });
    await factory.save();
    res.status(201).json({ message: 'Factory created successfully', factory });
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ error: 'Failed to create factory' });
  }
};

// Get all factories
exports.getAllFactories = async (req, res) => {
  try {
    const factories = await Factory.find().populate('party_id ');
    res.status(200).json(factories);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch factories' });
  }
};

// Get a single factory by ID
exports.getFactoryById = async (req, res) => {
  try {
    const factory = await Factory.findById(req.params.id).populate('party_id ');
    if (!factory) return res.status(404).json({ error: 'Factory not found' });
    res.status(200).json(factory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch factory' });
  }
};

// Update a factory
exports.updateFactory = async (req, res) => {
  try {
    const { name, party_id, stock_id } = req.body;
    const updated = await Factory.findByIdAndUpdate(
      req.params.id,
      { name, party_id },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Factory not found' });
    res.status(200).json({ message: 'Factory updated', factory: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update factory' });
  }
};

// Delete a factory
exports.deleteFactory = async (req, res) => {
  try {
    const deleted = await Factory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Factory not found' });
    res.status(200).json({ message: 'Factory deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete factory' });
  }
};
