import axios from 'axios';
import { formatDate, getUNIX } from '../date';
import { coinbase } from '../market_data';
import { kucoinCoinsSymbolsAndNames } from './kucoin';

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
            dateUpdated: formatDate(new Date()),
            dateUpdatedUnix: getUNIX(new Date())
        };
    }
};

const getCoinbaseDataAllCoins = async () => {
    const symbols = await kucoinCoinsSymbolsAndNames();
    return await Promise.all(symbols.map(createCoinbaseCoinData));
};

const removeUndefinedFromCoinbaseData = async () => {
    const data = await getCoinbaseDataAllCoins();
    return data.filter(el => el);
}

export const getCoinbaseExchangeRates = async () => {
    return await removeUndefinedFromCoinbaseData();
}
