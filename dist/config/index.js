"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
console.log(process.env.NODE_ENV);
function getStringEnv(variable, defaultValue) {
    const val = process.env[variable];
    if (!val) {
        throw new Error(`${variable} not found. Set ${variable} environment variable.`);
    }
    return val;
}
const NODE_ENV = getStringEnv('NODE_ENV', 'development');
const NAME = 'wonderlist';
const PORT = getStringEnv('PORT', '3000');
const SECRET = getStringEnv('SECRET', 'TOP_SECRET');
const MONGO_URI = getStringEnv('MONGO_URI', 'mongodb://localhost:27017/wonderlist-database');
const development = {
    name: NAME,
    port: PORT,
    database: {
        MONGO_URI: MONGO_URI,
    },
    secret: SECRET,
};
const production = {
    name: NAME,
    port: PORT,
    database: {
        MONGO_URI: MONGO_URI,
    },
    secret: SECRET,
};
const test = {
    name: NAME,
    port: PORT,
    database: {
        MONGO_URI: MONGO_URI,
    },
    secret: SECRET,
};
const config = { test, development, production };
exports.default = config[NODE_ENV];
//# sourceMappingURL=index.js.map