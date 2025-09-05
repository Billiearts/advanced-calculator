// server/src/routes/calculationRoutes.ts
import { Router } from "express";
import { saveCalculation, getCalculations } from "../controllers/calculationController";
import authMiddleware from "../middleware/authMiddleware";
const router = Router();
router.post("/", authMiddleware, saveCalculation);
router.get("/", authMiddleware, getCalculations);
export default router;
