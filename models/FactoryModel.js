const mongoose = require('mongoose');

const factorySchema = new mongoose.Schema({
  name: String,
  party_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  stock_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
});

module.exports = mongoose.model('Factory', factorySchema);
