"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = exports.connection = void 0;
const db_config_1 = __importDefault(require("./db_config"));
const mysql_1 = __importDefault(require("mysql"));
exports.connection = mysql_1.default.createConnection(db_config_1.default);
const createDatabase = () => {
    exports.connection.query('CREATE TABLE IF NOT EXISTS cryptoAPI(symbol VARCHAR(255), name VARCHAR(255), price FLOAT, market VARCHAR(255), dateUpdated TIMESTAMP, dateUpdatedUnix BIGINT)');
    console.log("Created cryptoAPI table");
};
exports.createDatabase = createDatabase;
(0, exports.createDatabase)();
