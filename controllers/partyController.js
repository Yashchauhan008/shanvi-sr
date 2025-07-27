const Party = require('../models/PartyModel');

// Add a new party
exports.createParty = async (req, res) => {
  const { name } = req.body;
  try {
    const newParty = new Party({ name });
    await newParty.save();
    res.status(201).json({ message: 'Party created successfully', data: newParty });
  } catch (error) {
    console.error('Error creating party:', error);
    res.status(500).json({ error: 'Failed to create party' });
  }
};

// Get all parties
exports.getAllParties = async (req, res) => {
  try {
    const parties = await Party.find();
    res.status(200).json(parties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parties' });
  }
};

// Update a party
exports.updateParty = async (req, res) => {
  try {
    const updatedParty = await Party.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedParty) return res.status(404).json({ error: 'Party not found' });
    res.status(200).json({ message: 'Party updated', data: updatedParty });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update party' });
  }
};

// Delete a party
exports.deleteParty = async (req, res) => {
  try {
    const deleted = await Party.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Party not found' });
    res.status(200).json({ message: 'Party deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete party' });
  }
};
