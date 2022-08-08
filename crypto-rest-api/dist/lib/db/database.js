"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQueryString = exports.getCoinDataFromQuery = exports.writeCoinDataToDB = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const db_config_1 = __importDefault(require("../config/db_config"));
const validator_1 = require("../utils/validator");
const connection = mysql2_1.default.createConnection(db_config_1.default);
const writeCoinDataToDB = (coins) => {
    const queryString = 'INSERT INTO cryptoapi VALUES ?';
    connection.query(queryString, [coins], function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Successfully added data to database');
        }
    });
    connection.end();
};
exports.writeCoinDataToDB = writeCoinDataToDB;
const getCoinDataFromQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection.promise().query(query);
    return result;
});
exports.getCoinDataFromQuery = getCoinDataFromQuery;
const selectCoinsFromMarket = (market) => {
    if (market && (0, validator_1.validateMarketString)(market)) {
        return `market="${market}" AND`;
    }
    else {
        return '';
    }
};
const selectCoinsInDateRange = (start, end) => {
    if (start && end) {
        return `(SELECT * FROM cryptoapi WHERE (dateUpdated BETWEEN "${start.replaceAll('"', '')}" AND "${end.replaceAll('"', '')}")) AS betweenDates`;
    }
    else {
        return 'cryptoapi';
    }
};
const generateSymbolsQuery = (symbols) => {
    let query = '';
    for (const symbol of symbols.slice(0, -1)) {
        query += `"${symbol.toUpperCase().trim()}",`;
    }
    query += `"${symbols.at(-1).toUpperCase().trim()}"`;
    return query;
};
const generateQueryString = (symbols, market, start, end) => {
    if (!symbols) {
        return "Provide crypto coins' symbols to process request";
    }
    else {
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
exports.generateQueryString = generateQueryString;
