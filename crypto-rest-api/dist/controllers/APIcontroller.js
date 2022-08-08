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
const array_utils_1 = require("../lib/array_utils");
const retrieve_api_1 = require("../lib/retrieve_api");
const processRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, retrieve_api_1.getFilteredAPIsData)();
    console.log((0, array_utils_1.makeAPIDataWritableToDB)(data));
    res.json(data);
});
exports.processRequest = processRequest;
