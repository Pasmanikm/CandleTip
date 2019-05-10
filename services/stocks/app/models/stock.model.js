const mongoose = require('mongoose');
const StockPriceSchema = require('./stock_price.model');

const { Schema } = mongoose;

const StockSchema = new Schema({
  symbol: { type: String, required: true, unique: true, max: 10 },
  currentPrice: { type: Number, required: true },
  avgVolume: { type: Number, required: true },
  marketCap: { type: Number },
  lastDividend: { type: Number },
  range: { type: String },
  companyName: { type: String },
  prices: [StockPriceSchema.schema]
});


// Export the model
module.exports = mongoose.model('Stock', StockSchema);
