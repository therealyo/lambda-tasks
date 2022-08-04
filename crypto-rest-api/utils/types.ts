export type KucoinDataPiece = {
    currency: string,
    name: string,
    fullName: string,
}

export type CoinmarketDataPiece = {
    id: string,
    name: string,
    symbol: string,
    quote: {
        USD: {
            price: number
        }
    }
}

export type CoinpaprikaDataPiece = {
    id: string,
    name: string,
    symbol: string,
    quotes: {
        USD: {
            price: number
        }
    }
}

export type Coin = {
    symbol: string,
    name: string,
    price: number,
    market: string,
    dateUpdated: string,
    dateUpdatedUnix: number
}

export type Prices = {
    [key: string]: string
}
