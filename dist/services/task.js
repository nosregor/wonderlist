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
exports.deleteTaskById = exports.updateTaskById = exports.getTaskById = exports.createTask = void 0;
const error_1 = require("../middlewares/error");
const listRepository = __importStar(require("../repositories/list"));
const taskRepository = __importStar(require("../repositories/task"));
function createTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user._id;
        try {
            let list = yield listRepository.getListById(req.params.listId);
            console.log(list);
            if (!list) {
                next(new error_1.HttpError(404, `List ${req.params.listId} not found`));
            }
            const task = yield taskRepository.createTask(list, req.body);
            res.status(200).json(task);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.createTask = createTask;
function getTaskById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user._id;
        try {
            const task = yield taskRepository.getTaskFromList(req.params.listId, req.params.taskId);
            return res.send(task);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.getTaskById = getTaskById;
function updateTaskById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user._id;
        try {
            const list = yield taskRepository.updateTaskFromList(req.params.listId, req.params.taskId, req.body);
            return res.send(list);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.updateTaskById = updateTaskById;
function deleteTaskById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user._id;
        try {
            let list = yield listRepository.getListById(req.params.listId);
            if (!list) {
                next(new error_1.HttpError(404, `List ${req.params.listId} not found`));
            }
            const task = yield taskRepository.deleteTaskFromList(req.params.taskId, req.user);
            res.status(200).json(task);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.deleteTaskById = deleteTaskById;
//# sourceMappingURL=task.js.map