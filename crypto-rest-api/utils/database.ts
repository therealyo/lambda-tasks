import { connection } from "./create_database";
import { CoinAsArray } from "./types";

export const writeCoinDataToDB = (coins: CoinAsArray[]) => {
    const queryString = "INSERT INTO cryptoapi VALUES ?"
    connection.query(queryString, [coins], function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Successfully added data to database");
    })
}

export const selectCoinsBySymbols = (symbols: string[]) => {
    const queryString = "";
}

export const selectCoinsByMarket = (market: string) => {
    const queryString = "";
}

export const selectCoinsInDateRange = (start: string, end: string) => {
    const queryString = "";
}
