"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    list: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'List',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });
const Task = mongoose_1.model('Task', TaskSchema);
exports.Task = Task;
//# sourceMappingURL=task.js.map