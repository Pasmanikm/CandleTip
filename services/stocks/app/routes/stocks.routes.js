const stocks = require('../controllers/stocks.controller');

module.exports = (app) => {
  // Get prices of a stock
  app.get('notes/prices/:stockSymbol', stocks.getPrices);

  // Retrieve stock data
  app.get('/stock', stocks.getStock);

  // TODO:
  // * Add put and delete
  // * Add security
};
