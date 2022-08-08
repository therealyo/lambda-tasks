"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const APIcontroller_1 = require("./lib/controllers/APIcontroller");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', APIcontroller_1.processRequest);
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
