// src/controllers/productController.js
// Manejo de requests HTTP con nuevas categorías

import { asyncHandler } from '../middleware/errorHandler.js';
import productService from '../services/productService.js';
import { validateCreateProduct, validateUpdateProduct } from '../validators/productValidator.js';

/**
 * POST /api/productos
 * Crear un nuevo producto
 */
export const crearProducto = asyncHandler(async (req, res) => {
  const { error, value } = validateCreateProduct(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validación fallida',
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // Agregar imagen si existe
  const imageFile = req.file;

  const producto = await productService.createProduct(value, '507f1f77bcf86cd799439011', imageFile);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Producto creado exitosamente',
    data: producto
  });
});

/**
 * GET /api/productos
 * Obtener productos con filtros y paginación
 * 
 * Filtros disponibles:
 * - page: número de página (default: 1)
 * - limit: productos por página (default: 12)
 * - tipo: montura, lentes, accesorios
 * - categoria: Vivao, Acetato dama, Montura flex, etc
 * - marca: Victoria Rose, Mistic, Gorillaz, etc
 * - material: acetato, metálica, tr90, aluminio, flex, etc
 * - genero: dama, caballero, niño, niña, unisex
 * - busqueda: búsqueda por texto
 */
export const obtenerProductos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    tipo,
    categoria,
    marca,
    material,
    genero,
    busqueda
  } = req.query;
  
  const filters = {
    ...(tipo && { tipo }),
    ...(categoria && { categoria }),
    ...(marca && { marca }),
    ...(material && { material }),
    ...(genero && { genero }),
    ...(busqueda && { busqueda }),
  };
  
  const resultado = await productService.getProductos(
    filters,
    parseInt(page),
    parseInt(limit)
  );
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Productos obtenidos exitosamente',
    data: resultado.productos,
    paginacion: resultado.paginacion
  });
});

/**
 * GET /api/productos/:id
 * Obtener un producto específico por ID
 */
export const obtenerProductoPorId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const producto = await productService.getProductoById(id);
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Producto obtenido exitosamente',
    data: producto
  });
});

/**
 * PUT /api/productos/:id
 * Actualizar un producto
 */
export const actualizarProducto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { error, value } = validateUpdateProduct(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validación fallida',
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // Agregar imagen si existe
  const imageFile = req.file;

  const producto = await productService.updateProducto(id, value, imageFile);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Producto actualizado exitosamente',
    data: producto
  });
});

/**
 * DELETE /api/productos/:id
 * Eliminar un producto
 */
export const eliminarProducto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const resultado = await productService.deleteProducto(id);
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: resultado.mensaje,
    data: { id: resultado.productoId }
  });
});

/**
 * GET /api/productos/filtros/disponibles
 * Obtener todos los filtros disponibles para búsqueda avanzada
 */
export const obtenerFiltrosDisponibles = asyncHandler(async (req, res) => {
  const filtros = await productService.getAvailableFilters();
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Filtros obtenidos exitosamente',
    data: filtros
  });
});