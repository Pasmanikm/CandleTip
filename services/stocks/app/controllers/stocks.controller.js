const StockSchema = require('../models/stock.model');

// Get prices for a specific symbol
const getPrices = (req, res) => {};

const getStock = (req, res) => {
  StockSchema.findOne({ symbol: 'symbol' });
};

const getAllStocks = (req, res) => {};

const addPrices = (req, res) => {};

const addStock = (req, res) => {};

module.exports = { getPrices, getStock, getAllStocks, addPrices, addStock };
