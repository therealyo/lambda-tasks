import { Coin } from "./types";

export const filterArray = (array: (Coin | undefined)[]) => {
    return array.filter(el => el);
}

export const flatArray = (array: any) => {
    return array.flat();
}

export const convertCoinObjectToArray = (coin: Coin) => {
    return Object.values(coin)
}

export const makeAPIDataWritableToDB = (array: any) => {
    array = flatArray(array);
    return array.map(convertCoinObjectToArray);
}
