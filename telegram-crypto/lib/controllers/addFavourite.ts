import { User } from '../models/User';
import {
    checkExists,
    checkInFavourites,
    createUser
} from '../database/database';

const createUserAndAddCoin = async (id: number, symbol: string) => {
    await createUser(id);
    return await User.updateOne({ _id: id }, { $push: { Currencies: symbol } });
};

const addCoinToFavourite = async (id: number, symbol: string) => {
    const isInFavourites = await checkInFavourites(id, symbol);
    if (!isInFavourites) {
        return await User.updateOne(
            { _id: id },
            { $push: { Currencies: symbol } }
        );
    }
};

export const handleAddToFavourite = async (id: number, symbol: string) => {
    if (!(await checkExists(id))) {
        await createUserAndAddCoin(id, symbol);
    } else {
        await addCoinToFavourite(id, symbol);
    }
};
