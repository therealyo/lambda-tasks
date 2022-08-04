import { makeAPIDataWritableToDB } from "./array_utils";
import { writeCoinDataToDB } from "./database";
import { retrieveAllApisData } from "./retrieve_api";

const main = async () => {
    const apiData = await retrieveAllApisData();
    const coins = makeAPIDataWritableToDB(apiData);
    writeCoinDataToDB(coins);
}

main();
