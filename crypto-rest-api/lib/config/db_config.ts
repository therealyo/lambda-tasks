import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
    host: 'localhost',
    user: 'root',
    database: 'cryptoRestAPI',
    password: `${process.env.DBPASSWORD}`
};

export const herokuDatabase = {
    host: "us-cdbr-east-06.cleardb.net",
    user: "bf2382f10cc33b",
    password: `${process.env.PASSWORD}`,
    database: "heroku_467e0bce49ba628"
}

export const sqlConfig = {
    host: 'localhost',
    user: 'root',
    password: `${process.env.DBPASSWORD}`
};

export default databaseConfig;
