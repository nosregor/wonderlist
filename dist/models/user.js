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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        default: '',
        index: true,
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // tslint:disable-line
        const user = this;
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            user.password = hash;
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
/**
 * Method for comparing passwords
 */
UserSchema.methods.isValidPassword = function (userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = this;
            const compare = yield bcrypt_1.default.compare(userPassword, user.password);
            return compare;
        }
        catch (error) {
            return error;
        }
    });
};
exports.User = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=user.js.map