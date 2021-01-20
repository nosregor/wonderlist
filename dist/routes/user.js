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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // used to create, sign, and verify tokens
const userService = __importStar(require("../services/user"));
const passportJwt_1 = require("../middlewares/passportJwt");
const router = express_1.Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    userService.getUsers(req, res, next);
}));
// SIGNUP
router.post('/signup', passport_1.default.authenticate('signup', { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: 'Signup successful',
        user: req.user,
    });
}));
// LOGIN
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.email };
                const token = jsonwebtoken_1.default.sign({ user: body }, 'TOP_SECRET', {
                    expiresIn: 3600,
                });
                return res.json({
                    success: true,
                    token,
                    status: 'You are successfully logged in!',
                });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
}));
// user logout
router.get('/logout', passportJwt_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.default = router;
//# sourceMappingURL=user.js.map