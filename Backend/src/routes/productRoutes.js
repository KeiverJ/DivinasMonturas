import express from 'express';
import * as productController from '../controllers/productController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
import { uploadSingleImage, handleMulterError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

/**
 * RUTAS PÚBLICAS (Todos pueden ver catálogo)
 */

// Obtener filtros disponibles - Colocar ANTES de :id para evitar conflictos
router.get('/filtros/disponibles', productController.obtenerFiltrosDisponibles);

// Obtener todos los productos con filtros y paginación
router.get('/', productController.obtenerProductos);

// Obtener producto por ID
router.get('/:id', productController.obtenerProductoPorId);

/**
 * RUTAS PRIVADAS (Solo personal autenticado con rol admin o gerente)
 */

// Crear producto
router.post('/', authenticateToken, authorizeRole('admin', 'gerente'), uploadSingleImage, handleMulterError, productController.crearProducto);

// Actualizar producto
router.put('/:id', authenticateToken, authorizeRole('admin', 'gerente'), uploadSingleImage, handleMulterError, productController.actualizarProducto);

// Eliminar producto (solo admin)
router.delete('/:id', authenticateToken, authorizeRole('admin'), productController.eliminarProducto);

export default router;