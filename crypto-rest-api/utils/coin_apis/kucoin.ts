import axios from 'axios';
import { formatDate, getUNIX } from '../date';
import { kucoin } from '../market_data';
import { Coin, KucoinDataPiece, Prices } from '../types';

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
): Promise<Coin> => {
    return {
        symbol: coinData.symbol,
        name: coinData.name,
        price: await getKucoinCoinPrice(prices, coinData.symbol),
        market: 'kucoin',
        dateUpdated: formatDate(new Date()),
        dateUpdatedUnix: getUNIX(new Date())
    };
};

export const getKucoinExchangeRates = async () => {
    const symbols = await kucoinCoinsSymbolsAndNames();
    const prices = await getKucoinPrices();
    return await Promise.all(
        symbols.map((coinData) => transformKucoinData(prices, coinData))
    );
};
