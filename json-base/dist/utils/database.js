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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteData = exports.updateRouteDate = exports.getRouteData = void 0;
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getRouteData = (route) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({ path: route });
});
exports.getRouteData = getRouteData;
const updateRouteDate = (route, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.updateOne({ path: route }, {
        $set: {
            stored: JSON.stringify(data, null, 3),
        },
    });
});
exports.updateRouteDate = updateRouteDate;
const createRouteData = (route, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default({
        path: route,
        stored: JSON.stringify(data, null, 3),
    });
    return yield user.save();
});
exports.createRouteData = createRouteData;
