import cron from 'node-cron';
import { makeAPIDataWritableToDB } from './utils/array_utils';
import { writeCoinDataToDB } from './db/database';
import { getFilteredAPIsData } from './utils/retrieve_api';
import axios from 'axios';

const wakeUpServer = () => {
    axios
        .get('https://typescript-crypto-api.herokuapp.com/')
        .then(() => {
            console.log('Waked up server!');
        })
        .catch((err: Error) => {
            console.error(err);
        });
};

const saveCryptoData = async () => {
    const apiData = await getFilteredAPIsData();
    const coins = makeAPIDataWritableToDB(apiData);
    writeCoinDataToDB(coins);
};

cron.schedule('*/10 * * * *', wakeUpServer);
cron.schedule('*/5 * * * *', saveCryptoData);
