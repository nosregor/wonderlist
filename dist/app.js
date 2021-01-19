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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http = __importStar(require("http-status-codes"));
const routes_1 = __importDefault(require("./routes"));
const sendHttpError_1 = require("./middlewares/error/sendHttpError");
const error_1 = require("./middlewares/error");
const app = express_1.default();
exports.app = app;
// * Application-Level Middleware * //
// Third-Party Middleware
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
// express middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// providing a Connect/Express middleware that can be used to enable CORS with various options
app.use(cors_1.default());
// custom errors
app.use(sendHttpError_1.sendHttpErrorModule);
// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
        ' Content-Type, Accept,' +
        ' Authorization,' +
        ' Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// * Routes * //
app.use('/auth', routes_1.default.auth);
app.use('/health', routes_1.default.health);
app.use('/users', routes_1.default.user);
app.use('/lists', routes_1.default.list);
app.use('/docs', routes_1.default.docs);
/**
 * @description No results returned mean the object is not found
 * @constructs
 */
app.use((req, res, next) => {
    res.status(404).send(http.StatusCodes[404]); // NOT FOUND
});
app.use(
// @ts-ignore: Unreachable code error
(error, req, res, next) => {
    if (typeof error === 'number') {
        error = new error_1.HttpError(error); // next(404)
    }
    console.error(error);
    if (error instanceof error_1.HttpError) {
        res.sendHttpError(error);
    }
    else {
        if (app.get('env') === 'development') {
            console.error(error);
            error = new error_1.HttpError(500, error.message);
            res.sendHttpError(error);
        }
        else {
            error = new error_1.HttpError(500);
            res.sendHttpError(error, error.message);
        }
    }
});
//# sourceMappingURL=app.js.map