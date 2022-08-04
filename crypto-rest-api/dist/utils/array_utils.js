"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAPIDataWritableToDB = exports.convertCoinObjectToArray = exports.flatArray = exports.filterArray = void 0;
const filterArray = (array) => {
    return array.filter(el => el);
};
exports.filterArray = filterArray;
const flatArray = (array) => {
    return array.flat();
};
exports.flatArray = flatArray;
const convertCoinObjectToArray = (coin) => {
    return Object.values(coin);
};
exports.convertCoinObjectToArray = convertCoinObjectToArray;
const makeAPIDataWritableToDB = (array) => {
    array = (0, exports.flatArray)(array);
    return array.map(exports.convertCoinObjectToArray);
};
exports.makeAPIDataWritableToDB = makeAPIDataWritableToDB;
