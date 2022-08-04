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
exports.getKucoinExchangeRates = exports.getKucoinPrices = exports.getKucoinSymbolsAndNames = void 0;
const axios_1 = __importDefault(require("axios"));
const date_1 = require("./date");
const kucoinBase = 'https://api.kucoin.com/';
const getKucoinSymbolsAndNames = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, axios_1.default)({
        method: 'get',
        url: '/api/v1/currencies',
        baseURL: kucoinBase
    });
    return data.data.data.map((el) => {
        return {
            symbol: el.currency,
            name: el.fullName
        };
    });
});
exports.getKucoinSymbolsAndNames = getKucoinSymbolsAndNames;
const getKucoinPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, axios_1.default)({
        method: 'get',
        url: '/api/v1/prices',
        baseURL: kucoinBase
    });
    return data.data.data;
});
exports.getKucoinPrices = getKucoinPrices;
const getKucoinExchangeRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const symbols = yield (0, exports.getKucoinSymbolsAndNames)();
    const prices = yield (0, exports.getKucoinPrices)();
    symbols.forEach((element) => {
        if (prices[`${element.symbol}`]) {
            element.price = parseFloat(prices[`${element.symbol}`]);
            element.dateUpdated = (0, date_1.formatDate)(new Date());
            element.dateUpdatedUnix = (0, date_1.getUNIX)(new Date());
        }
    });
    return symbols;
});
exports.getKucoinExchangeRates = getKucoinExchangeRates;
