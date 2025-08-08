const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservationSchema = new Schema({
  name: { type: String, unique: true },
  status: { type: String, enum: ['reserved','for_sale','sold'], default: 'reserved' },
  price: Number,
  owner: String,
  metadata: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
