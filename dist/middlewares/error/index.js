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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const http = __importStar(require("http-status-codes"));
/**
 * @export
 * @class HttpError
 * @extends {Error}
 */
class HttpError extends Error {
    /**
     * Creates an instance of HttpError
     * @params {number} [status]
     * @params {string} {message}
     * @memberof HttpError
     */
    constructor(status, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
        // @ts-ignore: Unreachable code error
        this.name = this.name;
        this.message = message || http.StatusCodes[this.status];
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=index.js.map