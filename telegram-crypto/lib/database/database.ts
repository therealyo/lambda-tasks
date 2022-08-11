import { User } from "../models/User";

export const checkInFavourites = async (id: number, symbol: string) => {
    const inFavourites = await User.findOne({ _id: id });
    return inFavourites!.Currencies.includes(symbol);
};

export const checkExists = async (id: number) => {
    return await User.findOne({ _id: id });
}

export const createUser = async (id: number) => {
    const user = new User({
        _id: id,
        Currencies: []
    });
    return await user.save();
}
