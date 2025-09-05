"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/routes/calculationRoutes.ts
const express_1 = require("express");
const calculationController_1 = require("../controllers/calculationController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.default, calculationController_1.saveCalculation);
router.get("/", authMiddleware_1.default, calculationController_1.getCalculations);
exports.default = router;
