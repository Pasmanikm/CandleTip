const mongoose = require('mongoose');
const StockPriceSchema = require('./stock_price.model');

const { Schema } = mongoose;

const StockSchema = new Schema({
  symbol: { type: String, required: true, max: 10 },
  avgVolume: { type: Number, required: true },
  range: { type: String },
  companyName: { type: String },
  prices: [StockPriceSchema]
});


// Export the model
module.exports = mongoose.model('Stock', StockSchema);
