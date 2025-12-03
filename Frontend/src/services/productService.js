// src/services/productService.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/productos`;

export const productService = {
  // Obtener token del localStorage
  getAuthHeader(isFormData = false) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // No agregar Content-Type para FormData (el browser lo hace automáticamente)
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
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
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener productos");
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
        throw new Error("Producto no encontrado");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Crear producto
  async createProduct(productData) {
    try {
      // Detectar si productData es FormData o un objeto normal
      const isFormData = productData instanceof FormData;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: this.getAuthHeader(isFormData),
        body: isFormData ? productData : JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear producto");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Actualizar producto
  async updateProduct(id, productData) {
    try {
      // Detectar si productData es FormData o un objeto normal
      const isFormData = productData instanceof FormData;

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: this.getAuthHeader(isFormData),
        body: isFormData ? productData : JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al actualizar producto");
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
        method: "DELETE",
        headers: this.getAuthHeader(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar producto");
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
        throw new Error("Error al obtener filtros");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },
};
