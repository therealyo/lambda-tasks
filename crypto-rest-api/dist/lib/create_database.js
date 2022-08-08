"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseStructure = void 0;
const mysql_1 = __importDefault(require("mysql"));
const db_config_1 = __importStar(require("./db_config"));
const createDatabase = () => {
    const connection = mysql_1.default.createConnection(db_config_1.sqlConfig);
    connection.query('CREATE DATABASE IF NOT EXISTS cryptoRestAPI');
    console.log("Created database");
    connection.end();
};
const createTable = () => {
    const connection = mysql_1.default.createConnection(db_config_1.default);
    connection.query('CREATE TABLE IF NOT EXISTS cryptoAPI(symbol VARCHAR(255), name VARCHAR(255), price FLOAT, market VARCHAR(255), dateUpdated TIMESTAMP)');
    console.log("Created cryptoAPI table");
    connection.end();
};
const createDatabaseStructure = () => {
    createDatabase();
    createTable();
};
exports.createDatabaseStructure = createDatabaseStructure;
(0, exports.createDatabaseStructure)();
