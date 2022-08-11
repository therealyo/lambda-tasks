import { User } from '../models/User';
import {
    checkExists
} from '../database/database';

export const handleDeleteFromFavourite = async (id: number, symbol: string) => {
    if (!(await checkExists(id))) {
        return false;
    } else {
        await User.updateOne({ _id: id }, { $pull: { Currencies: symbol } });
    }
};
