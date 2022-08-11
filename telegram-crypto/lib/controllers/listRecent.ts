import axios from 'axios';
import { Crypto } from '../config/types';

const getRecentHype = async () => {
    const { data } = await axios.get(
        'https://typescript-crypto-api.herokuapp.com/hype'
    );
    return data;
};

const transformCoinsToStrings = async () => {
    const data = await getRecentHype();
    return data.map((coin: Crypto) => {
        return `/${coin.symbol}  $${coin.price}`;
    });
};

export const listRecent = async () => {
    const coinsAsStrings = await transformCoinsToStrings();
    return 'top30 Most valuable currencies: \n' + coinsAsStrings.join('\n');
};
