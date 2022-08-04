import getCoinbaseExchangeRates from './coin_apis/coinbase';
import getCoinmarketExchangeRates from './coin_apis/coinmarket';
import getCoinpaprikaExchangeRates from './coin_apis/coinpaprika';
import getCoinstatsExchangeRates from './coin_apis/coinstats';
import getKucoinExchangeRates from './coin_apis/kucoin';

export const retrieveAllApisData = () => {
    return Promise.all([
        getCoinbaseExchangeRates(),
        getCoinmarketExchangeRates(),
        getCoinpaprikaExchangeRates(),
        getCoinstatsExchangeRates(),
        getKucoinExchangeRates()
    ]);
};
