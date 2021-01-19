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
exports.isAuthenticated = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const http = __importStar(require("http-status-codes"));
const error_1 = require("./error");
/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const user = jwt.verify(token, 'TOP_SECRET');
            req.user = user;
            return next();
        }
        catch (error) {
            return next(new error_1.HttpError(401, http.StatusCodes[401]));
        }
    }
    return next(new error_1.HttpError(400, 'No token provided'));
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=jwtAuth.js.map