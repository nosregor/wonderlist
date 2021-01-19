"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (_req, res) => {
    res.send({ message: 'Service is healthy', date: new Date() });
});
exports.default = router;
//# sourceMappingURL=health.js.map