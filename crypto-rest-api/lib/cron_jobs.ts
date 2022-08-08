import { makeAPIDataWritableToDB } from './utils/array_utils';
import { writeCoinDataToDB } from './db/database';
import { getFilteredAPIsData } from './utils/retrieve_api';

const main = async () => {
    const apiData = await getFilteredAPIsData();
    const coins = makeAPIDataWritableToDB(apiData);
    writeCoinDataToDB(coins);
};

main();
