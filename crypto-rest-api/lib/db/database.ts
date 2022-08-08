import mysql from 'mysql2';
import { CoinAsArray } from '../config/types';
import databaseConfig from '../config/db_config';
import { validateMarketString } from '../utils/validator';

const connection = mysql.createConnection(databaseConfig);

export const writeCoinDataToDB = (coins: CoinAsArray[]) => {
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
    const result = await connection.promise().query(query);
    return result;
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
        const orderBy = 'ORDER BY dateUpdated DESC;';
        return `SELECT ${selectQuery} FROM ${dateQuery} WHERE ${marketQuery} symbol IN (${symbolsQuery}) ${groupBy} ${orderBy}`;
    }
};
