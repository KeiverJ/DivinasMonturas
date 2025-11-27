// src/services/productService.js
const API_URL = 'http://localhost:5000/api/productos';

export const productService = {
  // Obtener token del localStorage
  getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  },

  // Obtener todos los productos
  async getProducts(filters = {}, page = 1, limit = 12) {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...filters,
      });

      const response = await fetch(`${API_URL}?${params}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Crear producto
  async createProduct(productData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear producto');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Actualizar producto
  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeader(),
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar producto');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Eliminar producto
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeader(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar producto');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Obtener filtros disponibles
  async getFilters() {
    try {
      const response = await fetch(`${API_URL}/filtros/disponibles`);

      if (!response.ok) {
        throw new Error('Error al obtener filtros');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },
};