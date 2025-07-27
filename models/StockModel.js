const mongoose = require('mongoose');

const PalateSchema = new mongoose.Schema({
  paletSize: String,
  quantity: { type: Number, default: 0 }
});

const stockSchema = new mongoose.Schema({
  film_white: { type: Number, required: true, default: 0 },
  film_blue: { type: Number, required: true, default: 0 },
  patti_role: { type: Number, required: true, default: 0 },
  palates: [PalateSchema],
  angle_board_24: { type: Number, required: true, default: 0 },
  angle_board_32: { type: Number, required: true, default: 0 },
  angle_board_36: { type: Number, required: true, default: 0 },
  angle_board_39: { type: Number, required: true, default: 0 },
  angle_board_48: { type: Number, required: true, default: 0 },
  cap_hit: { type: Number, required: true, default: 0 },
  cap_simple: { type: Number, required: true, default: 0 },
  firmshit: { type: Number, required: true, default: 0 },
  thermocol: { type: Number, required: true, default: 0 },
  mettle_angle: { type: Number, required: true, default: 0 },
  black_cover: { type: Number, required: true, default: 0 },
  packing_clip: { type: Number, required: true, default: 0 },
  patiya: { type: Number, required: true, default: 0 },
  plypatia: { type: Number, required: true, default: 0 },

  // Additional field
  disabled: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.models.Stock || mongoose.model('Stock', stockSchema);
