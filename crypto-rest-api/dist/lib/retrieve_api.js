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
exports.getFilteredAPIsData = exports.retrieveAllApisData = void 0;
const coinbase_1 = __importDefault(require("./coin_apis/coinbase"));
const coinmarket_1 = __importDefault(require("./coin_apis/coinmarket"));
const coinpaprika_1 = __importDefault(require("./coin_apis/coinpaprika"));
const coinstats_1 = __importDefault(require("./coin_apis/coinstats"));
const kucoin_1 = __importDefault(require("./coin_apis/kucoin"));
const retrieveAllApisData = () => {
    return Promise.all([
        (0, coinbase_1.default)(),
        (0, coinmarket_1.default)(),
        (0, coinpaprika_1.default)(),
        (0, coinstats_1.default)(),
        (0, kucoin_1.default)() // 768 unique coins
    ]);
};
exports.retrieveAllApisData = retrieveAllApisData;
const reduceMarketsCoinsAmount = (marketData, uniqueCoins) => {
    return marketData.filter(el => uniqueCoins.includes(el === null || el === void 0 ? void 0 : el.symbol));
};
const getAllCoinsInCommon = () => __awaiter(void 0, void 0, void 0, function* () {
    const coinmarketData = yield (0, coinmarket_1.default)();
    return coinmarketData.map((el) => el === null || el === void 0 ? void 0 : el.symbol); // Get all unique coins in coinmarketcap
});
const getFilteredAPIsData = () => __awaiter(void 0, void 0, void 0, function* () {
    // filter market data to only include coins from Coinmarketcap (it has least amount of coins)
    const apiData = yield (0, exports.retrieveAllApisData)();
    const uniqueCoins = yield getAllCoinsInCommon();
    return apiData.map(market => reduceMarketsCoinsAmount(market, uniqueCoins));
});
exports.getFilteredAPIsData = getFilteredAPIsData;
