import getCoinbaseExchangeRates from '../coin_apis/coinbase';
import getCoinmarketExchangeRates from '../coin_apis/coinmarket';
import getCoinpaprikaExchangeRates from '../coin_apis/coinpaprika';
import getCoinstatsExchangeRates from '../coin_apis/coinstats';
import getKucoinExchangeRates from '../coin_apis/kucoin';
import { Coin } from '../config/types';

export const retrieveAllApisData = () => {
    return Promise.all([
        getCoinbaseExchangeRates(), // 149 unique coins
        getCoinmarketExchangeRates(), // 100 unique coins
        getCoinpaprikaExchangeRates(), // 2500 unique coins
        getCoinstatsExchangeRates(), // 100 unique coins
        getKucoinExchangeRates() // 768 unique coins
    ]);
};

const reduceMarketsCoinsAmount = (
    marketData: (Coin | undefined)[],
    uniqueCoins: (string | undefined)[]
) => {
    return marketData.filter(el => uniqueCoins.includes(el?.symbol));
};

const getAllCoinsInCommon = async () => {
    const coinmarketData = await getCoinmarketExchangeRates();
    return coinmarketData.map((el) => el?.symbol); // Get all unique coins in coinmarketcap
};

export const getFilteredAPIsData = async () => {
    // filter market data to only include coins from Coinmarketcap (it has least amount of coins)
    const apiData = await retrieveAllApisData();
    const uniqueCoins = await getAllCoinsInCommon();
    return apiData.map(market => reduceMarketsCoinsAmount(market, uniqueCoins));
}
