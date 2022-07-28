require("dotenv").config();
const jwt = require("jsonwebtoken");

const MIN_TIME = 30;
const MAX_TIME = 60;

const generateExpireTime = () => {
    return Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1) + MIN_TIME);
};

exports.generateAccessToken = (user) => {
    const expTime = generateExpireTime();
    return jwt.sign(
        {
            user_id: user._id,
            email: user.email,
            password: user.password,
        },
        process.env.SECRET,
        {
            expiresIn: `${expTime}s`,
        }
    );
};

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        {
            user_id: user._id,
            email: user.email,
            password: user.password,
        },
        process.env.SECRET_REFRESH,
        {
            expiresIn: "2d",
        }
    );
};

exports.verifyRefreshToken = (req, res, next) => {
    try {
        const token = (
            req.body.refreshToken ||
            req.query.refreshToken ||
            req.headers["x-refresh-token"]
        ).replace(/Bearer\s?/, "");

        if (!token) {
            return res.status(403).send("No refresh token provided");
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_REFRESH);
            req.user = decoded;
            return next();
        } catch (err) {
            return res.status(401).send("Refresh token does not match");
        }
    } catch (err) {
        return res.status(403).send("Token must be provided");
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        const token = (
            req.body.accessToken ||
            req.query.accessToken ||
            req.headers["x-access-token"] ||
            req.headers["authorization"]
        ).replace(/Bearer\s?/, "");

        if (!token) {
            return res.status(403).send("Token required for authentication");
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded;
            return next();
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).send("Expired Token");
            } else {
                return res.status(401).send("Invalid Token");
            }
        }
    } catch (err) {
        return res.status(403).send("Token must be provided");
    }
};
