"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveAllApisData = void 0;
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
        (0, kucoin_1.default)()
    ]);
};
exports.retrieveAllApisData = retrieveAllApisData;
