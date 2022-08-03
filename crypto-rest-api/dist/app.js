"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get('/:crypto', (req, res) => {
    console.log(req.params.crypto);
});
app.get('/:platform', (req, res) => {
    console.log(req.params.platform);
});
app.get('/:platform:crypto', (req, res) => {
    console.log(req.params.platform);
    console.log(req.params.crypto);
});
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
