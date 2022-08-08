import axios from 'axios';
import { formatDate } from '../utils/date';
import { filterArray } from '../utils/array_utils';
import { kucoin } from '../config/market_data';
import { Coin, KucoinDataPiece, Prices } from '../config/types';

const getKucoinSymbolsAndNames = async (): Promise<KucoinDataPiece[]> => {
    const {
        data: { data }
    } = await axios({
        method: 'get',
        url: kucoin.currencies,
        baseURL: kucoin.baseAPI
    });
    return data;
};

const getKucoinPrices = async () => {
    const {
        data: { data }
    } = await axios({
        method: 'get',
        url: kucoin.prices,
        baseURL: kucoin.baseAPI
    });

    return data;
};

const getKucoinCoinPrice = async (prices: Prices, coinSymbol: string) => {
    return prices[coinSymbol] ? parseFloat(prices[coinSymbol]) : 0;
};

export const kucoinCoinsSymbolsAndNames = async () => {
    const data = await getKucoinSymbolsAndNames();
    return data.map((element: KucoinDataPiece) => {
        return {
            symbol: element.currency,
            name: element.fullName
        };
    });
};

const transformKucoinData = async (
    prices: Prices,
    coinData: { symbol: string; name: string }
): Promise<Coin | undefined> => {
    const coinPrice = await getKucoinCoinPrice(prices, coinData.symbol);
    if (coinPrice !== 0) {
        return {
            symbol: coinData.symbol,
            name: coinData.name,
            price: coinPrice,
            market: 'kucoin',
            dateUpdated: formatDate(new Date())
        };
    }
};

const getKucoinExchangeRatesUnfiltered = async () => {
    const symbols = await kucoinCoinsSymbolsAndNames();
    const prices = await getKucoinPrices();
    return await Promise.all(
        symbols.map((coinData) => transformKucoinData(prices, coinData))
    );
};

export const getKucoinExchangeRates = async (): Promise<
(Coin | undefined)[]
> => {
    const rates = await getKucoinExchangeRatesUnfiltered();
    return filterArray(rates);
};

export default getKucoinExchangeRates;
