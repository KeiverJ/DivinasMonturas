import express from 'express';
import * as authController from '../controllers/authController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas protegidas (requieren autenticación)
router.get('/perfil', authenticateToken, authController.getPerfil);

// Rutas solo admin
router.get('/usuarios', authenticateToken, authorizeRole('admin'), authController.getUsuarios);

export default router;