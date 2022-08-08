import axios from 'axios';
import { formatDate } from '../utils/date';
import { coinstats } from '../config/market_data';
import { Coin } from '../config/types';

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
        dateUpdated: formatDate(new Date())
    };
};

export const getCoinstatsExchangeRates = async (): Promise<
    (Coin | undefined)[]
> => {
    const data = await getCoinstatsData();
    return await Promise.all(data.map(transformCoinstatsData));
};

export default getCoinstatsExchangeRates;
