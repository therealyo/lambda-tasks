const getUsersCollection = (client) => {
    const db = client.db("autorization");
    return db.collection("users");
};

const checkUserInCollection = async (collection, user) => {
    const email = user.email;
    const usersWithSameEmail = await collection.find({ email }).toArray();
    return usersWithSameEmail.length !== 0;
};

exports.getUserFromDB = async (client, user) => {
    const users = getUsersCollection(client);
    return users.findOne({ email: user.email });
};

exports.addUserToDB = async (client, user) => {
    const users = getUsersCollection(client)
    const isInDB = await checkUserInCollection(users, user);
    if (isInDB) {
        return `User with email ${user.email} already exists`;
    } else {
        await users.insertOne(user);
        return `Added ${JSON.stringify(user, null, 3)}`;
    }
};

exports.updateUserInDB = async (client, user) => {
    const users = getUsersCollection(client);
    await users.updateOne(
        { email: user.email },
        {
            $set: {
                refreshToken: user.refreshToken,
            },
        }
    );
};
