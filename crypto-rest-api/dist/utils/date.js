"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUNIX = exports.formatDate = void 0;
const formatDate = (date) => {
    return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
};
exports.formatDate = formatDate;
const getUNIX = (date) => {
    return date.getTime();
};
exports.getUNIX = getUNIX;
