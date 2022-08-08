"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = exports.databaseConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.databaseConfig = {
    host: 'localhost',
    user: 'root',
    database: 'cryptoRestAPI',
    password: `${process.env.DBPASSWORD}`
};
exports.sqlConfig = {
    host: 'localhost',
    user: 'root',
    password: `${process.env.DBPASSWORD}`
};
exports.default = exports.databaseConfig;
