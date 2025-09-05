// server/src/server.ts
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";

// load env
dotenv.config();

connectDB();

const app = express();
app.use(
  cors({
    origin: ["https://advanced-calcu.netlify.app"], 
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// health
app.get("/health", (req, res) => res.json({ message: "pong" }));

// routes
import authRoutes from "./routes/authRoutes";
import calculationRoutes from "./routes/calculationRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

app.use("/api/auth", authRoutes);
app.use("/api/calculations", calculationRoutes);
app.use("/api/favorites", favoriteRoutes);

// production: serve client build
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "..", "client", "dist");
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

