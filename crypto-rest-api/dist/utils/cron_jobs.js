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
const array_utils_1 = require("./array_utils");
const database_1 = require("./database");
const retrieve_api_1 = require("./retrieve_api");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = yield (0, retrieve_api_1.retrieveAllApisData)();
    const coins = (0, array_utils_1.makeAPIDataWritableToDB)(apiData);
    (0, database_1.writeCoinDataToDB)(coins);
});
main();
