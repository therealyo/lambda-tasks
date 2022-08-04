import databaseConfig from './db_config';
import mysql from 'mysql';

export const connection = mysql.createConnection(databaseConfig);

export const createDatabase = () => {
    connection.query(
        'CREATE TABLE IF NOT EXISTS cryptoAPI(symbol VARCHAR(255), name VARCHAR(255), price FLOAT, market VARCHAR(255), dateUpdated TIMESTAMP, dateUpdatedUnix BIGINT)'
    );
    console.log("Created cryptoAPI table");
};

createDatabase();
