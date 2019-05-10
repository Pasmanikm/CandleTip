const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');
const { sleep } = require('../../helpers/helpers');
const { FINANCIAL_MODELING_PREP, TIINGO } = require('../../constants/external_apis.consts');

const getAllStocksSymbols = async () => {
  const { ALL_STOCKS_PATH, BASE_URL } = FINANCIAL_MODELING_PREP;
  const url = `${BASE_URL}${ALL_STOCKS_PATH}`;
  const result = await axios.get(url);
  const stocks = result.data;
  return _.map(stocks, 'Ticker');
};

const DEFAULT_TIMEFRAME = {
  startDate: moment().subtract(1, 'years').format('YYYY-M-D'),
  endDate: moment().format('YYYY-M-D')
};

// const getStockPrices = async (stockSymbol, timeFrame) => {
//   const { API_KEY, BASE_URL } = TIINGO;
//   const frequency = 'daily';

//   const { startDate, endDate } = timeFrame || DEFAULT_TIMEFRAME;

//   const url = `${BASE_URL}${frequency}/${stockSymbol}/prices?startDate=${startDate}&endDate=${endDate}\
// &format=json&resampleFreq=${frequency}&token=${API_KEY}`;

//   const result = await axios.get(url);
//   return result.data;
// };

const getStockPrices = async (stockSymbol, timeFrame) => {
  const apikey = '';

  // const url =
  // `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=demo`;
  const url = `https://api.unibit.ai/historicalstockprice/${stockSymbol}?range=3y&interval=1&AccessKey=tarhxt_CDNFr41YunPEQD5hhh_rF8RIg`;
  const result = await axios.get(url);
  return result.data['Stock price'];
};

const getStockProfile = async (stockSymbol) => {
  const { BASE_URL, PROFILE_PATH } = FINANCIAL_MODELING_PREP;
  const url = `${BASE_URL}${PROFILE_PATH}${stockSymbol}?datatype=json`;
  const result = await axios.get(url);
  return result.data[stockSymbol];
};

const serializeStockPrices = stockPrices =>
  stockPrices.map(stockPrice => _.pick(stockPrice, ['date', 'open', 'close', 'high', 'low', 'volume']));

const serializeStockProfile = stockProfile => ({
  currentPrice: stockProfile.Price,
  avgVolume: stockProfile.VolAvg,
  marketCap: stockProfile.MktCap,
  lastDividend: stockProfile.LastDiv,
  range: stockProfile.Range,
  companyName: stockProfile.companyName
});

const serializeIntoMongoObject = (stockSymbol, stockProfile, stockPrices) => {
  const prices = serializeStockPrices(stockPrices);
  const profile = serializeStockProfile(stockProfile);
  return { symbol: stockSymbol, ...profile, prices };
};

const getStockFullData = async (stockSymbol) => {
  // TODO: add a logic to check for available API's
  try {
    const stockPrices = await getStockPrices(stockSymbol);
    const stockProfile = await getStockProfile(stockSymbol);
    return serializeIntoMongoObject(stockSymbol, stockProfile, stockPrices);
  } catch (err) {
    console.log('Error getting stock data, sleeping for 1 hour');
    console.log(new Date().toUTCString());
    await sleep(1000 * 60 * 10);
    return getStockFullData(stockSymbol);
  }
};

module.exports = { getAllStocksSymbols, getStockFullData };
