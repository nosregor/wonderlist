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
exports.List = void 0;
const mongoose_1 = require("mongoose");
const task_1 = require("./task");
const ListSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    tasks: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Task',
        },
    ],
}, { timestamps: true });
//https://xjavascript.com/view/3705349/cascade-style-delete-in-mongoose
//https://dev.to/kwabenberko/implementing-sql--like-cascades-in-mongoose-bap
ListSchema.pre('remove', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield task_1.Task.deleteMany({
                _id: {
                    $in: this.tasks,
                },
            });
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const List = mongoose_1.model('List', ListSchema);
exports.List = List;
//# sourceMappingURL=list.js.map