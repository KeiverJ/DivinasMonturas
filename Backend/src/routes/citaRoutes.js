// src/routes/citaRoutes.js
import express from 'express';
import * as citaController from '../controllers/citaController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/ocupados', citaController.getHorariosOcupados);
router.post('/', citaController.crearCita);

// Rutas protegidas (solo admin/gerente)
router.get('/', authenticateToken, authorizeRole('admin', 'gerente'), citaController.obtenerCitas);
router.get('/estadisticas/dia', authenticateToken, authorizeRole('admin', 'gerente'), citaController.getEstadisticasDia);
router.get('/:id', authenticateToken, authorizeRole('admin', 'gerente'), citaController.obtenerCitaPorId);
router.put('/:id', authenticateToken, authorizeRole('admin', 'gerente'), citaController.actualizarCita);
router.delete('/:id', authenticateToken, authorizeRole('admin'), citaController.cancelarCita);

export default router;