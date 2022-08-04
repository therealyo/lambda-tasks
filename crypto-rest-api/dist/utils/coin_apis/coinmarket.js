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
exports.getCoinmarketExchangeRates = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const date_1 = require("../date");
const market_data_1 = require("../market_data");
dotenv_1.default.config();
const KEY = process.env.COINMARKETKEY;
const getCoinmarketData = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { data } } = yield (0, axios_1.default)({
        method: 'get',
        url: market_data_1.coinmarket.call,
        baseURL: market_data_1.coinmarket.baseAPI,
        headers: {
            'X-CMC_PRO_API_KEY': `${KEY}`,
            Accept: 'application/json'
        }
    });
    return data;
});
const transofrmCoinmarketData = (coin) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.quote.USD.price,
        market: 'coinmarket',
        dateUpdated: (0, date_1.formatDate)(new Date()),
        dateUpdatedUnix: (0, date_1.getUNIX)(new Date())
    };
});
const getCoinmarketExchangeRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getCoinmarketData();
    return yield Promise.all(data.map(transofrmCoinmarketData));
});
exports.getCoinmarketExchangeRates = getCoinmarketExchangeRates;
exports.default = exports.getCoinmarketExchangeRates;
