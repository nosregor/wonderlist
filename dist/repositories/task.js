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
const list_1 = require("../models/list");
const task_1 = require("../models/task");
const TaskRepository = {
    createTask(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = props.list;
                const task = (yield task_1.Task.create(props));
                yield list.tasks.push(task);
                const savedList = yield list.save();
                return list_1.List.findById(savedList._id).populate('tasks');
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    getTaskFromList(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield list_1.List.findById({
                    _id: props.listId,
                }).populate('tasks');
                if (!list) {
                    return [];
                }
                const task = list.tasks.filter((task) => String(task._id) === props.taskId);
                return task;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    updateTaskFromList(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield task_1.Task.findByIdAndUpdate(props.taskId, {
                    $set: props.body,
                }, { new: true });
                const list = yield list_1.List.findById({
                    _id: props.listId,
                    'tasks._id': props.taskId,
                }).populate('tasks');
                return list;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    deleteTaskFromList(taskId, user) {
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
    },
};
exports.default = TaskRepository;
//# sourceMappingURL=task.js.map