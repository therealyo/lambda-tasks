import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
    host: 'localhost',
    user: 'root',
    database: 'cryptoRestAPI',
    password: `${process.env.DBPASSWORD}`
};

export const sqlConfig = {
    host: 'localhost',
    user: 'root',
    password: `${process.env.DBPASSWORD}`
};

export default databaseConfig;
