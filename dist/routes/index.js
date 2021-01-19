"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const health_1 = __importDefault(require("./health"));
const docs_1 = __importDefault(require("./docs"));
const list_1 = __importDefault(require("./list"));
const user_1 = __importDefault(require("./user"));
exports.default = {
    auth: auth_1.default,
    docs: docs_1.default,
    health: health_1.default,
    list: list_1.default,
    user: user_1.default,
};
//# sourceMappingURL=index.js.map