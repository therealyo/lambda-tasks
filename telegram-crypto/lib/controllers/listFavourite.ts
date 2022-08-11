import axios from 'axios';
import { User } from '../models/User';

const getFavouritesData = async (coins: string[]) => {
    const { data } = await axios.get(
        `https://typescript-crypto-api.herokuapp.com/?crypto=${coins.join(',')}`
    );
    return data;
};

const transfromCoinDataToStrings = async (favourites: any) => {
    const coins = await getFavouritesData(favourites);
    return coins.map((coin: any) => {
        return `/${coin.symbol}  $${coin.avg_price}`;
    });
};

export const handleListFavourite = async (id: number) => {
    const listFavourites = (await User.findOne({ _id: id }))?.Currencies;
    const coinsData = await transfromCoinDataToStrings(listFavourites!);
    return coinsData.join('\n');
};
