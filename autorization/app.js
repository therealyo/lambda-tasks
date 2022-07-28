require("dotenv").config();
const express = require("express");
const userController = require("./controllers/UserController");
const { verifyToken, verifyRefreshToken } = require("./utils/auth");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.post("/sign_up", userController.signUp);

app.post("/login", userController.login);

app.post("/refresh", verifyRefreshToken, userController.refreshToken);

app.get("/me:id", verifyToken, userController.getMe);

app.listen(PORT, (err) => {
    if (err) console.error(err);

    console.log(`Server is started at http://localhost:${PORT}`);
});
