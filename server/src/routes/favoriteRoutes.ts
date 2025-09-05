// server/src/routes/favoriteRoutes.ts
import { Router } from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController";
import authMiddleware from "../middleware/authMiddleware";
const router = Router();
router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorites);
router.delete("/:id", authMiddleware, removeFavorite);
export default router;
