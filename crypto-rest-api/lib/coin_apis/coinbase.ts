import axios from 'axios';
import { formatDate } from '../utils/date';
import { filterArray } from '../utils/array_utils';
import { coinbase } from '../config/market_data';
import { kucoinCoinsSymbolsAndNames } from './kucoin';
import { Coin } from '../config/types';

const getCoinbaseDataAboutCoin = async (coin: {
    symbol: string;
    name: string;
}) => {
    try {
        const {
            data: { data }
        } = await axios({
            method: 'get',
            url: `/v2/prices/${coin.symbol}-USD/buy`,
            baseURL: coinbase.baseAPI
        });
        return data;
    } catch (err) {}
};

const createCoinbaseCoinData = async (coin: {
    symbol: string;
    name: string;
}) => {
    const data = await getCoinbaseDataAboutCoin(coin);
    if (data) {
        return {
            symbol: coin.symbol,
            name: coin.name,
            price: parseFloat(data.amount),
            market: 'coinbase',
            dateUpdated: formatDate(new Date())
        };
    }
};

const getCoinbaseDataAllCoins = async () => {
    const symbols = await kucoinCoinsSymbolsAndNames();
    return await Promise.all(symbols.map(createCoinbaseCoinData));
};

export const getCoinbaseExchangeRates = async (): Promise<
    (Coin | undefined)[]
> => {
    const data = await getCoinbaseDataAllCoins();
    return filterArray(data);
};

export default getCoinbaseExchangeRates;
