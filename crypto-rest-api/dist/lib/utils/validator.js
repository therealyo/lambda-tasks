"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMarketString = void 0;
const VALID_MARKETS = [
    'coinmarket',
    'coinbase',
    'coinpaprika',
    'coinstats',
    'kucoin'
];
const validateMarketString = (market) => {
    return VALID_MARKETS.includes(market);
};
exports.validateMarketString = validateMarketString;
