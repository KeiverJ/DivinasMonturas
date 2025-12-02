// src/controllers/mayoristaController.js
import asyncHandler from 'express-async-handler';
import { sendMayoristaEmail } from '../services/emailService.js';

/**
 * POST /api/mayoristas
 * Recibe datos de solicitud de mayorista y envía correo
 */
export const solicitarMayorista = asyncHandler(async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;
  if (!nombre || !email || !telefono || !mensaje) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
  }
  await sendMayoristaEmail({ nombre, email, telefono, mensaje });
  res.status(200).json({ success: true, message: 'Solicitud enviada correctamente.' });
});
