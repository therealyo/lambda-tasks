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
exports.servePostRequest = exports.serveGetRequest = void 0;
const database_1 = require("../utils/database");
const serveGetRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield (0, database_1.getRouteData)(req.params.path);
        if (userData) {
            const response = JSON.parse(userData.stored);
            res.status(200).json(response);
        }
        else {
            res.status(404).send("Route does not exist");
        }
    }
    catch (err) {
        console.error(err);
        res.send(500).send("Error Occurred");
    }
});
exports.serveGetRequest = serveGetRequest;
const servePostRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield (0, database_1.getRouteData)(req.params.path))) {
            yield (0, database_1.createRouteData)(req.params.path, req.body);
        }
        else {
            yield (0, database_1.updateRouteDate)(req.params.path, req.body);
        }
        res.status(200).send(`Successfully added data to ${req.params.path}`);
    }
    catch (err) {
        console.error(err);
        res.send(500).send("Error Occurred");
    }
});
exports.servePostRequest = servePostRequest;
