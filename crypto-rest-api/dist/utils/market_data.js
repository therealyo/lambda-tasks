"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinpaprika = exports.kucoin = exports.coinstats = exports.coinbase = exports.coinmarket = void 0;
exports.coinmarket = {
    baseAPI: "https://pro-api.coinmarketcap.com",
    call: "v1/cryptocurrency/listings/latest"
};
exports.coinbase = {
    baseAPI: "https://api.coinbase.com"
};
exports.coinstats = {
    baseAPI: "https://api.coinstats.app/public/",
    call: "v1/coins?currency=USD"
};
exports.kucoin = {
    baseAPI: 'https://api.kucoin.com/',
    currencies: '/api/v1/currencies',
    prices: '/api/v1/prices'
};
exports.coinpaprika = {
    baseAPI: "https://api.coinpaprika.com",
    call: "v1/tickers"
};
