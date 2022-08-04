import axios from 'axios';
import dotenv from 'dotenv';
import { formatDate, getUNIX } from '../date';
import { coinmarket } from '../market_data';
import { Coin, CoinmarketDataPiece } from '../types';

dotenv.config();

const KEY = process.env.COINMARKETKEY;

const getCoinmarketData = async () => {
    const {
        data: { data }
    } = await axios({
        method: 'get',
        url: coinmarket.call,
        baseURL: coinmarket.baseAPI,
        headers: {
            'X-CMC_PRO_API_KEY': `${KEY}`,
            Accept: 'application/json'
        }
    });
    return data;
};

const transofrmCoinmarketData = async (
    coin: CoinmarketDataPiece
): Promise<Coin> => {
    return {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.quote.USD.price,
        market: 'coinmarket',
        dateUpdated: formatDate(new Date()),
        dateUpdatedUnix: getUNIX(new Date())
    };
};

export const getCoinmarketExchangeRates = async () => {
    const data = await getCoinmarketData();
    return await Promise.all(data.map(transofrmCoinmarketData));
};
