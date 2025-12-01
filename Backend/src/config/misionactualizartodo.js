import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Obtener la ruta del directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar .env desde la raíz del backend
dotenv.config({ path: join(__dirname, "../../.env") });

// Actualizar todos los nombres
const actualizarNombres = async () => {
  try {
    // Conectar a MongoDB (sin las opciones obsoletas)
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    // Obtén la colección directamente (reemplaza 'monturas' con el nombre de tu colección)
    const collection = mongoose.connection.collection("productos");

    const resultado = await collection.updateMany(
      {}, // Actualiza todos los documentos
      [
        {
          $set: {
            nombre: {
              $concat: [
                "Montura ",
                {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ["$marca", ""] },
                        { $ne: ["$marca", null] },
                      ],
                    },
                    then: "$marca",
                    else: "$categoria",
                  },
                },
              ],
            },
          },
        },
      ]
    );

    console.log(
      `✅ ${resultado.modifiedCount} documentos actualizados exitosamente`
    );

    // Mostrar algunos ejemplos de cómo quedaron
    const ejemplos = await collection.find({}).limit(5).toArray();
    console.log("\n📋 Ejemplos de nombres actualizados:");
    ejemplos.forEach((doc, i) => {
      console.log(
        `${i + 1}. ${doc.nombre} (marca: "${
          doc.marca || "vacío"
        }", categoría: "${doc.categoria}")`
      );
    });

    // Cerrar conexión
    await mongoose.connection.close();
    console.log("\n✅ Conexión cerrada");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error actualizando nombres:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Ejecutar
actualizarNombres();
