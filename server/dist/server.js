"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
// load env
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://advanced-calcu.netlify.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
// health
app.get("/ping", (req, res) => res.json({ message: "pong" }));
// routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const calculationRoutes_1 = __importDefault(require("./routes/calculationRoutes"));
const favoriteRoutes_1 = __importDefault(require("./routes/favoriteRoutes"));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/calculations", calculationRoutes_1.default);
app.use("/api/favorites", favoriteRoutes_1.default);
// production: serve client build
if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path_1.default.join(__dirname, "..", "..", "client", "dist");
    app.use(express_1.default.static(clientBuildPath));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(clientBuildPath, "index.html"));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
