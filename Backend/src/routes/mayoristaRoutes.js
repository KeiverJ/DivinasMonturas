// src/routes/mayoristaRoutes.js
import express from 'express';
import { solicitarMayorista } from '../controllers/mayoristaController.js';

const router = express.Router();

// POST /api/mayoristas
router.post('/', solicitarMayorista);

export default router;
