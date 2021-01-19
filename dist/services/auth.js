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
exports.signup = exports.login = void 0;
const userRepository = __importStar(require("../repositories/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // used to create, sign, and verify tokens
const error_1 = require("../middlewares/error");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.createUser(req.body);
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
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userRepository.getUser(req.body);
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
}
exports.login = login;
//# sourceMappingURL=auth.js.map