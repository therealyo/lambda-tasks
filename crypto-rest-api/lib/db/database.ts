import databaseConfig from '../config/db_config';
import { CoinAsArray } from '../config/types';
import { validateMarketString } from '../utils/validator';
import { connectionRequest } from './connectionRequest';

export const writeCoinDataToDB = (coins: CoinAsArray[]) => {
    const connection = connectionRequest(databaseConfig);
    const queryString = 'INSERT INTO cryptoapi VALUES ?';
    connection.query(queryString, [coins], function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully added data to database');
        }
    });
    connection.end();
};

export const getCoinDataFromQuery = async (query: string) => {
    const connection = connectionRequest(databaseConfig);
    const result = await connection.promise().query(query);
    connection.destroy();
    return result[0];
};

const selectCoinsFromMarket = (market: string | undefined) => {
    if (market && validateMarketString(market)) {
        return `market="${market}" AND`;
    } else {
        return '';
    }
};

const selectCoinsInDateRange = (
    start: string | undefined,
    end: string | undefined
) => {
    if (start && end) {
        return `(SELECT * FROM cryptoapi WHERE (dateUpdated BETWEEN "${start.replaceAll(
            '"',
            ''
        )}" AND "${end.replaceAll('"', '')}")) AS betweenDates`;
    } else {
        return 'cryptoapi';
    }
};

const generateSymbolsQuery = (symbols: string[]) => {
    let query = '';
    for (const symbol of symbols.slice(0, -1)) {
        query += `"${symbol.toUpperCase().trim()}",`;
    }
    query += `"${symbols.at(-1)!.toUpperCase().trim()}"`;
    return query;
};

export const generateQueryString = (
    symbols: string[] | undefined,
    market: string | undefined,
    start: string | undefined,
    end: string | undefined
) => {
    if (!symbols) {
        return "Provide crypto coins' symbols to process request";
    } else {
        const dateQuery = selectCoinsInDateRange(start, end);
        const marketQuery = selectCoinsFromMarket(market);
        const symbolsQuery = generateSymbolsQuery(symbols);
        const selectQuery = market
            ? 'symbol, name, price, market, dateUpdated'
            : 'symbol, name, ROUND(AVG(price), 2) as avg_price, dateUpdated';
        const groupBy = 'GROUP BY symbol, dateUpdated';
        const orderBy =
            start && end
                ? `ORDER BY dateUpdated DESC;` // if time period provided we show all entries in this period, otherwise latest
                : `ORDER BY dateUpdated DESC LIMIT ${symbols.length};`;
        return `SELECT ${selectQuery} FROM ${dateQuery} WHERE ${marketQuery} symbol IN (${symbolsQuery}) ${groupBy} ${orderBy}`;
    }
};
