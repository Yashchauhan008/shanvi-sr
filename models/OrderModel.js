const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  paletSize: String,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  date: Date,
  production_house_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductionHouse' },
  factory_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Factory' },
  party_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  items: [ItemSchema],
  film_white: { type: Number, required: true },
  film_blue: { type: Number, required: true },
  patti_role: { type: Number, required: true },
  angle_board_24: { type: Number, required: true },
  angle_board_32: { type: Number, required: true },
  angle_board_36: { type: Number, required: true },
  angle_board_39: { type: Number, required: true },
  angle_board_48: { type: Number, required: true },
  cap_hit: { type: Number, required: true },
  cap_simple: { type: Number, required: true },
  firmshit: { type: Number, required: true },
  thermocol: { type: Number, required: true },
  mettle_angle: { type: Number, required: true },
  black_cover: { type: Number, required: true },
  packing_clip: { type: Number, required: true },
  patiya: { type: Number, required: true },
  plypatia: { type: Number, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);
