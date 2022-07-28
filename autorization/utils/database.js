const checkUserInDB = async (collection, user) => {
    const email = user.email;
    const usersWithSameEmail = await collection.find({ email }).toArray();
    return usersWithSameEmail.length !== 0;
};

const getUserFromDB = async (collection, user) => {
    return collection.findOne({ email: user.email });
};

const addUserToDB = async (collection, user) => {
    const isInDB = await checkUserInDB(collection, user);
    if (isInDB) {
        return `User with email ${user.email} already exists`;
    } else {
        await collection.insertOne(user);
        return `Added ${JSON.stringify(user, null, 3)}`;
    }
};

const updateUserInDB = async (collection, user) => {
    await collection.updateOne({email: user.email}, {
        $set: {
            refreshToken: user.refreshToken
        }
    })
}

module.exports = {
    checkUserInDB,
    getUserFromDB,
    addUserToDB,
    updateUserInDB
};
