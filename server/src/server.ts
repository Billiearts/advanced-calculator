import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/authRoutes";
import calculationRoutes from "./routes/calculationRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

// Import middleware
import authMiddleware from "./middleware/authMiddleware";

// Initialize dotenv
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://advanced-calcu.app"], // adjust your frontend URLs
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected:", MONGO_URI.split("/").pop()))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/calculations", authMiddleware, calculationRoutes);
app.use("/api/favorites", authMiddleware, favoriteRoutes);

// Test protected route
app.get("/api/protected", authMiddleware, (req: Request, res: Response) => {
  res.json({ message: "Protected route accessed", user: (req as any).user });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
