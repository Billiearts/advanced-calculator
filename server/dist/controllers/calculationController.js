"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalculations = exports.saveCalculation = void 0;
const Calculation_1 = __importDefault(require("../models/Calculation"));
const saveCalculation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { expression, result, type } = req.body;
        if (!expression || result === undefined)
            return res.status(400).json({ message: "Expression and result required" });
        const calc = await Calculation_1.default.create({ user: userId, expression, result: String(result), type: type || "scientific" });
        res.status(201).json({ message: "Calculation saved", calculation: calc });
    }
    catch (error) {
        console.error("❌ saveCalculation error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.saveCalculation = saveCalculation;
const getCalculations = async (req, res) => {
    try {
        const userId = req.user.id;
        const calcs = await Calculation_1.default.find({ user: userId }).sort({ createdAt: -1 });
        res.json(calcs);
    }
    catch (error) {
        console.error("❌ getCalculations error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getCalculations = getCalculations;
