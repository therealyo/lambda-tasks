import mysql from 'mysql';
import databaseConfig, { sqlConfig } from '../config/db_config';

const createDatabase = () => {
    const connection = mysql.createConnection(sqlConfig);
    connection.query(
        'CREATE DATABASE IF NOT EXISTS cryptoRestAPI'
    )
    console.log("Created database");
    connection.end();
}

const createTable = () => {
    const connection = mysql.createConnection(databaseConfig);
    connection.query(
        'CREATE TABLE IF NOT EXISTS cryptoAPI(symbol VARCHAR(255), name VARCHAR(255), price FLOAT, market VARCHAR(255), dateUpdated TIMESTAMP)'
    );
    console.log("Created cryptoAPI table");
    connection.end();
};

export const createDatabaseStructure = () => {
    createDatabase();
    createTable();
}

createDatabaseStructure();
