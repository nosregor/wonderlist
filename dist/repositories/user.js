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
const user_1 = require("../models/user");
const UserRepository = {
    /**
     * @description Get all users from the database.
     * @throws {Error} If there is something wrong with the request.
     */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_1.User.find({});
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param { IUser } body
     * @returns { Promise<IUser> }
     * @memberof UserRepository
     */
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_1.User({
                    email: body.email,
                    password: body.password,
                });
                const query = yield user_1.User.findOne({
                    email: body.email,
                });
                if (query) {
                    throw new Error('This email already exists');
                }
                const saved = yield user.save();
                return saved;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    },
    /**
     * @param { IUser } body
     * @returns { Promise<IUser> }
     * @memberof UserRepository
     */
    getUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            try {
                const user = yield user_1.User.findOne({
                    email: email,
                });
                const isValidPassword = user && (yield user.isValidPassword(password));
                if (!isValidPassword) {
                    throw new Error('Invalid password or email');
                }
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    },
};
exports.default = UserRepository;
//# sourceMappingURL=user.js.map