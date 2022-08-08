const VALID_MARKETS = [
    'coinmarket',
    'coinbase',
    'coinpaprika',
    'coinstats',
    'kucoin'
];

export const validateMarketString = (market: string) => {
    return VALID_MARKETS.includes(market);
};
