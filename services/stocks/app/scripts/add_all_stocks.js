const mongoose = require('mongoose');
const { sleep } = require('../helpers/helpers');
const { getAllStocksSymbols, getStockFullData } = require('../services/external_apis/stocks_extral_apis.service');
const StockSchema = require('../models/stock.model');
const dbConfig = require('../config/db.config');

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

const insertStock = async (stockData) => {
  const stock = StockSchema(stockData);
  try {
    await stock.save();
    console.log(`Successfully added ${stockData.symbol} to DB`);
  } catch (err) {
    if (err.code === 11000) {
      console.log(`${stockData.symbol}`);
    } else {
      throw new Error(`Error saving ${stockData.symbol}`);
    }
  }
};

const main = async () => {
  const allStockSymbols = await getAllStocksSymbols();
  const badStocks = ['SPY', 'CMCSA', 'KMI', 'INTC', 'MU', 'GDX'];
  const goodStockSymbols = allStockSymbols.filter(symb => !badStocks.includes(symb));

  for (let i = 0; i < goodStockSymbols.length; i += 1) {
    const stockFullData = await getStockFullData(goodStockSymbols[i]);
    await insertStock(stockFullData);
    await sleep(5 * 1000);
  }
};
console.log('ma ze ahara aze?');

main();
