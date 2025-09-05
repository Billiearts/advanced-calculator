// server/src/controllers/favoriteController.ts
import { Request, Response } from "express";
import Favorite from "../models/Favorite";

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { calculationId, note } = req.body;
    if (!calculationId) return res.status(400).json({ message: "calculationId required" });

    const favorite = await Favorite.create({ user: userId, calculation: calculationId, note });
    res.status(201).json({ message: "Favorite saved", favorite });
  } catch (error) {
    console.error("❌ addFavorite error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const favorites = await Favorite.find({ user: userId }).populate("calculation").sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    console.error("❌ getFavorites error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const removed = await Favorite.findOneAndDelete({ _id: id, user: userId });
    if (!removed) return res.status(404).json({ message: "Favorite not found" });
    res.json({ message: "Favorite removed" });
  } catch (error) {
    console.error("❌ removeFavorite error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
