// Cargar variables de entorno ANTES de importar cualquier módulo que las use
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar .env explícitamente y verificar
const result = dotenv.config({ path: join(__dirname, ".env") });

if (result.error) {
  console.error("Error cargando .env:", result.error);
  } else {
  console.info("✅ Variables de entorno cargadas correctamente");
}

// IMPORTANTE: Importar DESPUÉS de cargar dotenv
const { default: app } = await import("./src/app.js");
const { connectDatabase, disconnectDatabase } = await import(
  "./src/config/database.js"
);
const { default: config } = await import("./src/config/config.js");

const startServer = async () => {
  try {
    await connectDatabase();

    // Solo iniciar servidor si NO estamos en Vercel
    if (process.env.VERCEL !== "1") {
      const server = app.listen(config.port, () => {
        console.info(`Servidor iniciado — puerto: ${config.port}, entorno: ${config.nodeEnv}`);
      });

      process.on("SIGINT", async () => {
        console.info("\n⏹️  Cerrando servidor...");
        server.close(async () => {
          await disconnectDatabase();
          process.exit(0);
        });
      });
    }
  } catch (error) {
    console.error("❌ Error al iniciar servidor:", error.message);
    process.exit(1);
  }
};

startServer();

// IMPORTANTE: Exportar la app para Vercel
export default app;
