require("dotenv").config();
const { MongoClient } = require("mongodb");
const dbUtils = require("../utils/database");
const { isEmptyQuery } = require("../utils/query");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");

const client = new MongoClient(`${process.env.URL}`);

exports.signUp = async (req, res) => {
    const user = req.body;

    try {
        await client.connect();

        user.refreshToken = generateRefreshToken(user);
        const addedSatus = await dbUtils.addUserToDB(client, user);

        client.close();

        res.send(addedSatus);
    } catch (err) {
        console.error(err);
    }
};

exports.login = async (req, res) => {
    const query = req.query;
    if (!isEmptyQuery(query)) {
        try {
            await client.connect();
            const user = await dbUtils.getUserFromDB(client, query);
            
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
    
    try {
        await client.connect();
        await dbUtils.updateUserInDB(client, user);
        
        client.close();
    } catch (err) {
        console.log(err);
        res.status(500).send("Unable to autorize");
    }
    
    const newToken = generateAccessToken(user);
    res.status(200).json({
        message: "Token Refreshed",
        email: user.email,
        access_token: `New token: ${newToken}`,
    });
};
