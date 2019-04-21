const mongoose = require('mongoose');

const { Schema } = mongoose;

const StockPriceSchema = new Schema({
  date: { type: Date, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  open: { type: Number, required: true },
  close: { type: Number, required: true },
  volume: { type: Number, required: true }
});

module.exports = mongoose.model('StockPrice', StockPriceSchema);
