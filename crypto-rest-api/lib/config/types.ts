export type KucoinDataPiece = {
    currency: string;
    name: string;
    fullName: string;
};

export type Params = {};

export type ReqBody = {};

export type ResBody = {};

export type ReqQuery = {
    crypto: string | undefined;
    market: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
};

export type CoinmarketDataPiece = {
    id: string;
    name: string;
    symbol: string;
    quote: {
        USD: {
            price: number;
        };
    };
};

export type CoinpaprikaDataPiece = {
    id: string;
    name: string;
    symbol: string;
    quotes: {
        USD: {
            price: number;
        };
    };
};

export type Coin = {
    symbol: string;
    name: string;
    price: number;
    market: string;
    dateUpdated: string;
};

export type CoinAsArray = [string, string, number, string, string];

export type Prices = {
    [key: string]: string;
};
