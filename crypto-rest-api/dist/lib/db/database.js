"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCoinsInDateRange = exports.selectCoinsByMarket = exports.selectCoinsBySymbols = exports.writeCoinDataToDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const db_config_1 = __importDefault(require("../config/db_config"));
const connection = mysql_1.default.createConnection(db_config_1.default);
const writeCoinDataToDB = (coins) => {
    const queryString = "INSERT INTO cryptoapi VALUES ?";
    connection.query(queryString, [coins], function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Successfully added data to database");
    });
    connection.end();
};
exports.writeCoinDataToDB = writeCoinDataToDB;
const selectCoinsBySymbols = (symbols) => {
    const queryString = "";
};
exports.selectCoinsBySymbols = selectCoinsBySymbols;
const selectCoinsByMarket = (market) => {
    const queryString = "";
};
exports.selectCoinsByMarket = selectCoinsByMarket;
const selectCoinsInDateRange = (start, end) => {
    const queryString = "";
};
exports.selectCoinsInDateRange = selectCoinsInDateRange;
