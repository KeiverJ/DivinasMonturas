// src/controllers/mayoristaController.js
import asyncHandler from "express-async-handler";
import { sendMayoristaEmail } from "../services/emailService.js";

/**
 * POST /api/mayoristas
 * Recibe datos de solicitud de mayorista y envía correo
 */
export const solicitarMayorista = asyncHandler(async (req, res) => {
  console.log("📩 Solicitud de mayorista recibida:", req.body);

  const { nombre, email, telefono, mensaje } = req.body;

  if (!nombre || !email || !telefono || !mensaje) {
    console.log("❌ Campos faltantes");
    return res
      .status(400)
      .json({ success: false, message: "Todos los campos son obligatorios." });
  }

  // Intentar enviar email
  try {
    console.log("📧 Intentando enviar email mayorista a:", email);
    await sendMayoristaEmail({ nombre, email, telefono, mensaje });
    console.log("✅ Email mayorista enviado correctamente");
  } catch (emailError) {
    console.error("❌ Error enviando email mayorista:", emailError);
    console.error("Detalles del error:", emailError.message);
    // No fallar el request, pero informar al usuario
    return res.status(200).json({
      success: true,
      message: "Solicitud recibida, pero hubo un problema enviando el email.",
    });
  }

  res
    .status(200)
    .json({ success: true, message: "Solicitud enviada correctamente." });
});
