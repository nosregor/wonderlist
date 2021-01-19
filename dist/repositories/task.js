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
exports.deleteTaskFromList = exports.updateTaskFromList = exports.getTaskFromList = exports.createTask = void 0;
const list_1 = require("../models/list");
const task_1 = require("../models/task");
function createTask(list, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = (yield task_1.Task.create(body));
            yield list.tasks.push(task);
            const savedList = yield list.save();
            return list_1.List.findById(savedList._id).populate('tasks');
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createTask = createTask;
function getTaskFromList(listId, taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield list_1.List.findById({
                _id: listId,
            }).populate('tasks');
            if (!list) {
                return [];
            }
            const task = list.tasks.filter((task) => String(task._id) === taskId);
            return task;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getTaskFromList = getTaskFromList;
function updateTaskFromList(listId, taskId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield task_1.Task.findByIdAndUpdate(taskId, {
                $set: body,
            }, { new: true });
            const list = yield list_1.List.findById({
                _id: listId,
                'tasks._id': taskId,
            }).populate('tasks');
            return list;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.updateTaskFromList = updateTaskFromList;
function deleteTaskFromList(taskId, user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = { user: user };
            const update = { $pull: { tasks: taskId } };
            const options = { new: true };
            const list = yield list_1.List.findOneAndUpdate(filter, 
            // @ts-ignore: Unreachable code error
            update, options).populate('user');
            return list;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.deleteTaskFromList = deleteTaskFromList;
//# sourceMappingURL=task.js.map