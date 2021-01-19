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
exports.deleteListById = exports.updateListById = exports.getListById = exports.getListsByUserId = exports.createList = void 0;
const list_1 = require("../models/list");
function createList(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore: Unreachable code error
            return list_1.List.create(body);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createList = createList;
function getListsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return list_1.List.find({ user: userId });
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getListsByUserId = getListsByUserId;
function getListById(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return list_1.List.findById(params).populate('tasks');
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getListById = getListById;
// @ts-ignore: Unreachable code error
function updateListById({ body, listId }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = { _id: listId };
            const update = {
                $set: body,
            };
            const options = { new: true };
            return list_1.List.findByIdAndUpdate(filter, update, options);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.updateListById = updateListById;
function deleteListById(listId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield list_1.List.findById(listId);
            if (list) {
                yield list.remove();
            }
            return list;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.deleteListById = deleteListById;
//# sourceMappingURL=list.js.map