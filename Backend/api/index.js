import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

// Importar rutas
import authRoutes from "../src/routes/authRoutes.js";
import productRoutes from "../src/routes/productRoutes.js";
import citaRoutes from "../src/routes/citaRoutes.js";
import mayoristaRoutes from "../src/routes/mayoristaRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Health check - CAMBIADO: sin /api
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API funcionando",
  });
});

// Rutas - CAMBIADO: sin /api al inicio
app.use("/auth", authRoutes);
app.use("/productos", productRoutes);
app.use("/citas", citaRoutes);
app.use("/mayoristas", mayoristaRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

export default app;
