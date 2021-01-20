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
exports.signup = exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../middlewares/error");
const user_1 = __importDefault(require("../repositories/user"));
/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const body = req.body;
    try {
        const user = yield user_1.default.createUser(body);
        console.log(user);
        const token = jsonwebtoken_1.default.sign({ user: { _id: user._id } }, 'TOP_SECRET', {
            expiresIn: 3600,
        });
        res.json({
            status: 200,
            logged: true,
            token: token,
            message: 'Sign in successful',
        });
    }
    catch (error) {
        if (error.code === 500) {
            return next(new error_1.HttpError(error.message.status, error.message));
        }
        res.status(400).json({ status: 400, message: error.message });
    }
});
exports.signup = signup;
/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.getUser(req.body);
        const token = jsonwebtoken_1.default.sign({ user: { _id: user._id } }, 'TOP_SECRET');
        res.json({
            status: 200,
            logged: true,
            token: token,
            message: 'Sign in successful',
        });
    }
    catch (error) {
        if (error.code === 500) {
            return next(new error_1.HttpError(error.message.status, error.message));
        }
        res.status(400).json({ status: 400, message: error.message });
    }
});
exports.login = login;
/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.send({
            status: 401,
            logged: false,
            message: 'You are not logged in!',
        });
    }
    if (req.user) {
        delete req.headers.authorization; // destroy session on server side
        req.logout();
        res.send({
            status: 200,
            logged: false,
            message: 'Successfully logged out!',
        });
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.js.map