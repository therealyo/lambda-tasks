require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const dbUtils = require("../utils/database");
const { isEmptyQuery } = require("../utils/query");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");

const client = new MongoClient(`${process.env.URL}`);

exports.signUp = async (req, res) => {
    const user = req.body;

    try {
        client.connect().then(async () => {
            const db = client.db("autorization");
            const users = db.collection("users");
            user.refreshToken = generateRefreshToken(user);
            const addedStatus = await dbUtils.addUserToDB(users, user);

            console.log(addedStatus);
            client.close();
            res.send(addedStatus);
        });
    } catch (err) {
        console.error(err);
    }
};

exports.login = async (req, res) => {
    const query = req.query;
    if (!isEmptyQuery(query)) {
        try {
            client.connect().then(async () => {
                const db = client.db("autorization");
                const users = db.collection("users");
                const user = await dbUtils.getUserFromDB(users, query);

                client.close();

                if (!user || query.password !== user.password) {
                    res.status(400).json({
                        message: "Incorrect login or password",
                    });
                    return;
                }

                user.accessToken = generateAccessToken(user);

                res.status(200).json({
                    message: "Logged in",
                    email: user.email,
                    access_token: user.accessToken,
                });
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("Unable to autorize");
        }
    } else {
        res.send("Enter your credentials");
    }
};

exports.getMe = (req, res) => {
    res.status(200).json({
        request_num: req.params.id,
        data: {
            username: req.user.email,
        },
    });
};

exports.refreshToken = async (req, res) => {
    const user = req.user;
    user.refreshToken = generateRefreshToken(user);
    client.connect().then(async () => {
        const db = client.db("autorization");
        const users = db.collection("users");
        await dbUtils.updateUserInDB(users, user);
    });

    const newToken = generateAccessToken(user);
    res.status(200).json({
        message: "Token Refreshed",
        email: user.email,
        access_token: `New token: ${newToken}`,
    });
};
