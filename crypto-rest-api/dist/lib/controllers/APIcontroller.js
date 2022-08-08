"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRequest = void 0;
const database_1 = require("../db/database");
const processRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log(req.query.crypto);
    // console.log(req.query.market);
    const queryString = (0, database_1.generateQueryString)((_a = req.query.crypto) === null || _a === void 0 ? void 0 : _a.split(","), req.query.market, req.query.startDate, req.query.endDate);
    try {
        const data = (yield (0, database_1.getCoinDataFromQuery)(queryString))[0];
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).send(queryString);
    }
});
exports.processRequest = processRequest;
