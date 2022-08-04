"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKucoinExchangeRates = exports.kucoinCoinsSymbolsAndNames = void 0;
const axios_1 = __importDefault(require("axios"));
const date_1 = require("../date");
const array_utils_1 = require("../array_utils");
const market_data_1 = require("../market_data");
const getKucoinSymbolsAndNames = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { data } } = yield (0, axios_1.default)({
        method: 'get',
        url: market_data_1.kucoin.currencies,
        baseURL: market_data_1.kucoin.baseAPI
    });
    return data;
});
const getKucoinPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { data } } = yield (0, axios_1.default)({
        method: 'get',
        url: market_data_1.kucoin.prices,
        baseURL: market_data_1.kucoin.baseAPI
    });
    return data;
});
const getKucoinCoinPrice = (prices, coinSymbol) => __awaiter(void 0, void 0, void 0, function* () {
    return prices[coinSymbol] ? parseFloat(prices[coinSymbol]) : 0;
});
const kucoinCoinsSymbolsAndNames = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getKucoinSymbolsAndNames();
    return data.map((element) => {
        return {
            symbol: element.currency,
            name: element.fullName
        };
    });
});
exports.kucoinCoinsSymbolsAndNames = kucoinCoinsSymbolsAndNames;
const transformKucoinData = (prices, coinData) => __awaiter(void 0, void 0, void 0, function* () {
    const coinPrice = yield getKucoinCoinPrice(prices, coinData.symbol);
    if (coinPrice !== 0) {
        return {
            symbol: coinData.symbol,
            name: coinData.name,
            price: coinPrice,
            market: 'kucoin',
            dateUpdated: (0, date_1.formatDate)(new Date()),
            dateUpdatedUnix: (0, date_1.getUNIX)(new Date())
        };
    }
});
const getKucoinExchangeRatesUnfiltered = () => __awaiter(void 0, void 0, void 0, function* () {
    const symbols = yield (0, exports.kucoinCoinsSymbolsAndNames)();
    const prices = yield getKucoinPrices();
    return yield Promise.all(symbols.map((coinData) => transformKucoinData(prices, coinData)));
});
const getKucoinExchangeRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const rates = yield getKucoinExchangeRatesUnfiltered();
    return (0, array_utils_1.filterArray)(rates);
});
exports.getKucoinExchangeRates = getKucoinExchangeRates;
exports.default = exports.getKucoinExchangeRates;
