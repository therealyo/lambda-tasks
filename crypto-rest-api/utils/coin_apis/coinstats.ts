import axios from 'axios';
import { formatDate, getUNIX } from '../date';
import { coinstats } from '../market_data';
import { Coin } from '../types';

const getCoinstatsData = async () => {
    const {
        data: { coins }
    } = await axios({
        method: 'get',
        url: coinstats.call,
        baseURL: coinstats.baseAPI
    });
    return coins;
};

const transformCoinstatsData = async (coin: Coin): Promise<Coin> => {
    return {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.price,
        market: 'coinstats',
        dateUpdated: formatDate(new Date()),
        dateUpdatedUnix: getUNIX(new Date())
    };
};

export const getCoinstatsExchangeRates = async () => {
    const data = await getCoinstatsData();
    return await Promise.all(data.map(transformCoinstatsData));
};
