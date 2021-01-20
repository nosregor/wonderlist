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
exports.deleteListById = exports.updateListById = exports.getListById = exports.getListsByUserId = exports.createList = void 0;
const error_1 = require("../middlewares/error");
const list_1 = __importDefault(require("../repositories/list"));
/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function getListsByUserId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user._id;
        try {
            const lists = yield list_1.default.getListsByUserId(userId);
            res.status(200).json(lists);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.getListsByUserId = getListsByUserId;
/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function createList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield list_1.default.createList(req.body);
            res.status(200).json(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.createList = createList;
/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function getListById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield list_1.default.getListById(req.params.listId);
            res.status(200).json(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.getListById = getListById;
/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function updateListById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const props = {
            body: req.body,
            listId: req.params.listId,
        };
        try {
            const list = yield list_1.default.updateListById(props);
            res.status(200).json(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.updateListById = updateListById;
/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function deleteListById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield list_1.default.deleteListById(req.params.listId);
            res.status(200).json(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.deleteListById = deleteListById;
//# sourceMappingURL=list.js.map