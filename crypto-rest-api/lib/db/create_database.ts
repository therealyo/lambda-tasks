import databaseConfig, { sqlConfig } from '../config/db_config';
import { connectionRequest } from './connectionRequest';

const createDatabase = () => {
    const connection = connectionRequest(sqlConfig);
    connection.query('CREATE DATABASE IF NOT EXISTS cryptoRestAPI', () => {
        console.log('Created database');
        connection.destroy();
    });
};

const createTable = () => {
    const connection = connectionRequest(databaseConfig);
    connection.query(
        'CREATE TABLE IF NOT EXISTS cryptoAPI(symbol VARCHAR(255), name VARCHAR(255), price FLOAT, market VARCHAR(255), dateUpdated TIMESTAMP)',
        () => {
            console.log('Created cryptoAPI table');
            connection.destroy();
        }
    );
};

export const createDatabaseStructure = () => {
    createDatabase();
    createTable();
};

createDatabaseStructure();
