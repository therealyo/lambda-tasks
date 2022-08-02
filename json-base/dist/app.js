"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserController_1 = require("./controllers/UserController");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
const mongoPath = `mongodb+srv://therealyo:${process.env.PASSWORD}@cluster0.sgzob.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default.connect(mongoPath, () => {
    console.log("Connected to database");
});
app.get("/", (req, res) => {
    res.send("Add your personal route");
});
app.get("/:path", UserController_1.serveGetRequest);
app.post("/:path", UserController_1.servePostRequest);
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
