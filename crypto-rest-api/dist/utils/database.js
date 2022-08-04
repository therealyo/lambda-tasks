"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCoinsInDateRange = exports.selectCoinsByMarket = exports.selectCoinsBySymbols = exports.writeCoinDataToDB = void 0;
const create_database_1 = require("./create_database");
const writeCoinDataToDB = (coins) => {
    const queryString = "INSERT INTO cryptoapi VALUES ?";
    create_database_1.connection.query(queryString, [coins], function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Successfully added data to database");
    });
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
