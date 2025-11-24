// src/services/productService.js
// Lógica de negocio con nuevas categorías

import Product from '../models/Product.js';

class ProductService {
  
  /**
   * Crear un nuevo producto
   */
  async createProduct(productData, userId) {
    try {
      const producto = new Product({
        ...productData,
        creadoPor: userId,
      });
      
      await producto.save();
      
      return await producto.populate('creadoPor', 'nombre email');
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }
  
  /**
   * Obtener productos con filtros y paginación
   * Filtros soportados: tipo, categoria, marca, material, genero, color, disponible, busqueda
   */
  async getProductos(filters = {}, page = 1, limit = 12) {
    try {
      const query = {};
      
      // Filtros básicos
      if (filters.tipo) query.tipo = filters.tipo;
      if (filters.categoria) query.categoria = filters.categoria;
      if (filters.marca) query.marca = filters.marca;
      if (filters.material) query.material = filters.material;
      if (filters.genero) query.genero = filters.genero;
      if (filters.color) query.color = { $in: [filters.color] };
      if (filters.disponible !== undefined) query.disponible = filters.disponible;
      
      // Búsqueda por texto
      if (filters.busqueda) {
        query.$text = { $search: filters.busqueda };
      }
      
      // Paginación
      const total = await Product.countDocuments(query);
      const totalPages = Math.ceil(total / limit);
      const pageNum = Math.max(1, page);
      const skip = (pageNum - 1) * limit;
      
      const productos = await Product
        .find(query)
        .populate('creadoPor', 'nombre email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      return {
        productos,
        paginacion: {
          total,
          pagina: pageNum,
          limite: limit,
          totalPages,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        }
      };
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }
  
  /**
   * Obtener un producto por ID
   */
  async getProductoById(productoId) {
    try {
      const producto = await Product
        .findById(productoId)
        .populate('creadoPor', 'nombre email');
      
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      
      return producto;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }
  
  /**
   * Actualizar un producto
   */
  async updateProducto(productoId, updateData) {
    try {
      const producto = await Product.findByIdAndUpdate(
        productoId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).populate('creadoPor', 'nombre email');
      
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      
      return producto;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }
  
  /**
   * Eliminar un producto
   */
  async deleteProducto(productoId) {
    try {
      const producto = await Product.findByIdAndDelete(productoId);
      
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      
      return { 
        mensaje: 'Producto eliminado correctamente',
        productoId: producto._id 
      };
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }
  
  /**
   * Obtener filtros disponibles para búsqueda avanzada
   * Retorna categorías, marcas, materiales, géneros y colores únicos
   */
  async getAvailableFilters() {
    try {
      const [tipos, categorias, marcas, materiales, generos, colores] = await Promise.all([
        Product.distinct('tipo'),
        Product.distinct('categoria'),
        Product.distinct('marca'),
        Product.distinct('material'),
        Product.distinct('genero'),
        Product.distinct('color'),
      ]);
      
      return {
        tipos: tipos.filter(Boolean),
        categorias: categorias.filter(Boolean),
        marcas: marcas.filter(Boolean),
        materiales: materiales.filter(Boolean),
        generos: generos.filter(Boolean),
        colores: colores.filter(Boolean),
      };
    } catch (error) {
      throw new Error(`Error al obtener filtros: ${error.message}`);
    }
  }
}

export default new ProductService();