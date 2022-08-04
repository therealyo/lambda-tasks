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
exports.getCoinstatsExchangeRates = void 0;
const axios_1 = __importDefault(require("axios"));
const date_1 = require("../date");
const market_data_1 = require("../market_data");
const getCoinstatsData = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { coins } } = yield (0, axios_1.default)({
        method: 'get',
        url: market_data_1.coinstats.call,
        baseURL: market_data_1.coinstats.baseAPI
    });
    return coins;
});
const transformCoinstatsData = (coin) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.price,
        market: 'coinstats',
        dateUpdated: (0, date_1.formatDate)(new Date()),
        dateUpdatedUnix: (0, date_1.getUNIX)(new Date())
    };
});
const getCoinstatsExchangeRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getCoinstatsData();
    return yield Promise.all(data.map(transformCoinstatsData));
});
exports.getCoinstatsExchangeRates = getCoinstatsExchangeRates;
exports.default = exports.getCoinstatsExchangeRates;
