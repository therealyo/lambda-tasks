import axios from 'axios';
import { formatDate, getUNIX } from '../date';
import { coinpaprika } from '../market_data';
import { Coin, CoinpaprikaDataPiece } from '../types';

const getCoinpaprikaData = async () => {
    const { data } = await axios({
        method: 'get',
        url: coinpaprika.call,
        baseURL: coinpaprika.baseAPI
    });
    return data;
};

const transformCoinpaprikaCoinData = async (
    coin: CoinpaprikaDataPiece
): Promise<Coin> => {
    return {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.quotes.USD.price,
        market: 'coinpaprika',
        dateUpdated: formatDate(new Date()),
        dateUpdatedUnix: getUNIX(new Date())
    };
};

export const getCoinpaprikaExchangeRates = async () => {
    const data = await getCoinpaprikaData();
    return await Promise.all(data.map(transformCoinpaprikaCoinData));
};
