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
exports.isAuthenticated = void 0;
require("dotenv/config");
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = require("../models/user");
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
// Verifying the JWT
/**
 * @description
 * determines, if the jwt_token in the request header is valid.
 * It verifies the token using jsonwebtoken. The result is attached to the
 * request as req.user = {}
 */
passport_1.default.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'TOP_SECRET',
}, (jwtToken, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: { _id }, } = jwtToken;
        const users = yield user_1.User.findOne({
            _id: _id,
        });
        return done(null, users, jwtToken);
    }
    catch (error) {
        done(error, null);
    }
})));
/**
 * @description Login Required middleware.
 * Verify incoming user using the passport JWT strategy.
 */
exports.isAuthenticated = passport_1.default.authenticate('jwt', {
    session: false,
    failWithError: true,
});
//# sourceMappingURL=passportJwt.js.map