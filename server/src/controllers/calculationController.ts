// server/src/controllers/calculationController.ts
import { Request, Response } from "express";
import Calculation from "../models/Calculation";

export const saveCalculation = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { expression, result, type } = req.body;
    if (!expression || result === undefined) return res.status(400).json({ message: "Expression and result required" });

    const calc = await Calculation.create({ user: userId, expression, result: String(result), type: type || "scientific" });
    res.status(201).json({ message: "Calculation saved", calculation: calc });
  } catch (error) {
    console.error("❌ saveCalculation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCalculations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const calcs = await Calculation.find({ user: userId }).sort({ createdAt: -1 });
    res.json(calcs);
  } catch (error) {
    console.error("❌ getCalculations error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
