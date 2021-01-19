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
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const index_1 = __importDefault(require("../config/index"));
// READ: https://mongoosejs.com/docs/connections.html
const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 5,
};
const MONGO_URI = `${index_1.default.database.MONGO_URI}`;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // handlers;
    mongoose_1.connection.on('connecting', () => {
        console.log('MongoDB :: connecting');
    });
    mongoose_1.connection.on('error', (error) => {
        console.log('MongoDB :: connection ${error}');
    });
    mongoose_1.connection.on('connected', () => {
        console.log(`MongoDB :: connecting to ${MONGO_URI}`);
    });
    mongoose_1.connection.on('open', () => {
        console.log(`MongoDB :: connection opened`);
    });
    mongoose_1.connection.on('reconnected', () => {
        console.log('MongoDB :: connection reconnected');
    });
    mongoose_1.connection.on('reconnectFailed', () => {
        console.log('MongoDB :: connection reconnectFailed');
    });
    mongoose_1.connection.on('disconnected', () => {
        console.log('MongoDB :: connection disconnected');
    });
    mongoose_1.connection.on('fullsetup', () => {
        console.log('MongoDB :: reconnecting...%d');
    });
    try {
        const db = yield mongoose_1.connect(MONGO_URI, connectOptions);
    }
    catch (error) {
        throw error;
    }
});
exports.connectDB = connectDB;
//# sourceMappingURL=index.js.map