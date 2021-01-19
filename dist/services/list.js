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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListById = exports.updateListById = exports.getListById = exports.getListsByUserId = exports.createList = void 0;
const error_1 = require("../middlewares/error");
const listRepository = __importStar(require("../repositories/list"));
function getListsByUserId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user._id;
        try {
            const lists = yield listRepository.getListsByUserId(userId);
            res.status(200).json(lists);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.getListsByUserId = getListsByUserId;
function createList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield listRepository.createList(req.body);
            res.status(200).json(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.createList = createList;
function getListById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield listRepository.getListById(req.body);
            res.status(200).json(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.getListById = getListById;
function updateListById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield listRepository.updateListById({
                body: req.body,
                listId: req.params.listId,
            });
            res.status(200).json(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.updateListById = updateListById;
function deleteListById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield listRepository.deleteListById(req.params.listId);
            res.status(200).json(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.deleteListById = deleteListById;
//# sourceMappingURL=list.js.map