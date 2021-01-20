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
exports.deleteTaskById = exports.updateTaskById = exports.getTaskById = exports.createTask = void 0;
const error_1 = require("../middlewares/error");
const list_1 = __importDefault(require("../repositories/list"));
const task_1 = __importDefault(require("../repositories/task"));
/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function createTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let list = yield list_1.default.getListById(req.params.listId);
            if (!list) {
                next(new error_1.HttpError(404, `List ${req.params.listId} not found`));
            }
            const body = req.body;
            const task = yield task_1.default.createTask({ list, body });
            res.status(200).json(task);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.createTask = createTask;
/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function getTaskById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { listId, taskId } = req.params;
        try {
            const task = yield task_1.default.getTaskFromList({
                listId,
                taskId,
            });
            return res.send(task);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.getTaskById = getTaskById;
/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function updateTaskById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { listId, taskId } = req.params;
        const { body } = req.body;
        try {
            const list = yield task_1.default.updateTaskFromList({
                listId,
                taskId,
                body,
            });
            return res.send(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.updateTaskById = updateTaskById;
/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
function deleteTaskById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let list = yield list_1.default.getListById(req.params.listId);
            if (!list) {
                next(new error_1.HttpError(404, `List ${req.params.listId} not found`));
            }
            const task = yield task_1.default.deleteTaskFromList(req.params.taskId, req.user);
            res.status(200).json(task);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.deleteTaskById = deleteTaskById;
//# sourceMappingURL=task.js.map