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
exports.getCoinpaprikaExchangeRates = void 0;
const axios_1 = __importDefault(require("axios"));
const date_1 = require("../utils/date");
const market_data_1 = require("../config/market_data");
const getCoinpaprikaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield (0, axios_1.default)({
        method: 'get',
        url: market_data_1.coinpaprika.call,
        baseURL: market_data_1.coinpaprika.baseAPI
    });
    return data;
});
const transformCoinpaprikaCoinData = (coin) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.quotes.USD.price,
        market: 'coinpaprika',
        dateUpdated: (0, date_1.formatDate)(new Date())
    };
});
const getCoinpaprikaExchangeRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getCoinpaprikaData();
    return yield Promise.all(data.map(transformCoinpaprikaCoinData));
});
exports.getCoinpaprikaExchangeRates = getCoinpaprikaExchangeRates;
exports.default = exports.getCoinpaprikaExchangeRates;
