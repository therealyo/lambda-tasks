import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
    host: 'localhost',
    user: 'root',
    database: 'restAPI',
    password: `${process.env.DBPASSWORD}`
};

export default databaseConfig;
