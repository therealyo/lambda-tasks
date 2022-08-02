import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export const getRouteData = async (route: string) => {
    return await User.findOne({ path: route });
};

export const updateRouteDate = async (route: string, data: string) => {
    return await User.updateOne(
        { path: route },
        {
            $set: {
                stored: JSON.stringify(data, null, 3),
            },
        }
    );
};

export const createRouteData = async (route: string, data: string) => {
    const user = new User({
        path: route,
        stored: JSON.stringify(data, null, 3),
    });

    return await user.save();
};
