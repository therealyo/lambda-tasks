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
exports.getCoinbaseExchangeRates = void 0;
const axios_1 = __importDefault(require("axios"));
const date_1 = require("../date");
const array_utils_1 = require("../array_utils");
const market_data_1 = require("../market_data");
const kucoin_1 = require("./kucoin");
const getCoinbaseDataAboutCoin = (coin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: { data } } = yield (0, axios_1.default)({
            method: 'get',
            url: `/v2/prices/${coin.symbol}-USD/buy`,
            baseURL: market_data_1.coinbase.baseAPI
        });
        return data;
    }
    catch (err) { }
});
const createCoinbaseCoinData = (coin) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getCoinbaseDataAboutCoin(coin);
    if (data) {
        return {
            symbol: coin.symbol,
            name: coin.name,
            price: parseFloat(data.amount),
            market: 'coinbase',
            dateUpdated: (0, date_1.formatDate)(new Date())
        };
    }
});
const getCoinbaseDataAllCoins = () => __awaiter(void 0, void 0, void 0, function* () {
    const symbols = yield (0, kucoin_1.kucoinCoinsSymbolsAndNames)();
    return yield Promise.all(symbols.map(createCoinbaseCoinData));
});
const getCoinbaseExchangeRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getCoinbaseDataAllCoins();
    return (0, array_utils_1.filterArray)(data);
});
exports.getCoinbaseExchangeRates = getCoinbaseExchangeRates;
exports.default = exports.getCoinbaseExchangeRates;
