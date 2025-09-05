"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/routes/favoriteRoutes.ts
const express_1 = require("express");
const favoriteController_1 = require("../controllers/favoriteController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.default, favoriteController_1.addFavorite);
router.get("/", authMiddleware_1.default, favoriteController_1.getFavorites);
router.delete("/:id", authMiddleware_1.default, favoriteController_1.removeFavorite);
exports.default = router;
