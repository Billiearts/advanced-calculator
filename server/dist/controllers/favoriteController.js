"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.getFavorites = exports.addFavorite = void 0;
const Favorite_1 = __importDefault(require("../models/Favorite"));
const addFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { calculationId, note } = req.body;
        if (!calculationId)
            return res.status(400).json({ message: "calculationId required" });
        const favorite = await Favorite_1.default.create({ user: userId, calculation: calculationId, note });
        res.status(201).json({ message: "Favorite saved", favorite });
    }
    catch (error) {
        console.error("❌ addFavorite error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.addFavorite = addFavorite;
const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await Favorite_1.default.find({ user: userId }).populate("calculation").sort({ createdAt: -1 });
        res.json(favorites);
    }
    catch (error) {
        console.error("❌ getFavorites error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getFavorites = getFavorites;
const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const removed = await Favorite_1.default.findOneAndDelete({ _id: id, user: userId });
        if (!removed)
            return res.status(404).json({ message: "Favorite not found" });
        res.json({ message: "Favorite removed" });
    }
    catch (error) {
        console.error("❌ removeFavorite error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.removeFavorite = removeFavorite;
