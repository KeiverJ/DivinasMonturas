import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../Components/ProductCard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function CatalogoPublico() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
    loadFilters();
  }, [page]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts({}, page, 9);
      setProducts(response.data);
      setPagination(response.paginacion);
    } catch (err) {
      console.error('Error cargando productos:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const response = await productService.getFilters();
      setFilters(response.data || {});
    } catch (err) {
      console.error('Error cargando filtros:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="text-center py-16 px-4">
        <p className="text-sm text-gray-500 mb-2">Catálogo</p>
        <h1 className="text-5xl font-serif mb-4">
          <span className="text-black">Catálogo</span> <span className="text-yellow-600">Premium</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra exclusiva colección de monturas de lujo, diseñadas para reflejar tu estilo único y sofisticado.
        </p>
      </div>

      {/* Filtros */}
      <div className="px-4 mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ▼ Filtros
        </button>

        {showFilters && (
          <div className="mt-4 bg-gray-100 p-6 rounded-lg grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Filtro por tipo */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Tipo</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    loadProductsWithFilter({ tipo: e.target.value });
                  } else {
                    loadProducts();
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Todos</option>
                {filters.tipos?.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* Filtro por categoría */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Categoría</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    loadProductsWithFilter({ categoria: e.target.value });
                  } else {
                    loadProducts();
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Todas</option>
                {filters.categorias?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Filtro por marca */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Marca</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    loadProductsWithFilter({ marca: e.target.value });
                  } else {
                    loadProducts();
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Todas</option>
                {filters.marcas?.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>
            </div>

            {/* Filtro por material */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Material</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    loadProductsWithFilter({ material: e.target.value });
                  } else {
                    loadProducts();
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Todos</option>
                {filters.materiales?.map(mat => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>

            {/* Filtro por género */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Género</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    loadProductsWithFilter({ genero: e.target.value });
                  } else {
                    loadProducts();
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Todos</option>
                {filters.generos?.map(genero => (
                  <option key={genero} value={genero}>{genero}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Grid de productos */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-12">Cargando productos...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No hay productos disponibles.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product._id} className="text-center">
                <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-200 h-80">
                  <img
                    src={product.imagenes?.principal || 'https://via.placeholder.com/300x400?text=Sin+imagen'}
                    alt={product.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                  <span className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.tipo}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">{product.categoria}</p>
                <h3 className="text-lg font-semibold text-black mb-4">{product.nombre}</h3>
                {product.disponible && (
                  <button className="border-2 border-yellow-600 text-yellow-600 px-6 py-2 rounded hover:bg-yellow-600 hover:text-white transition font-semibold">
                    Ver Detalles
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Paginación */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!pagination.hasPrevPage}
            className="border-2 border-yellow-600 text-yellow-600 px-6 py-2 rounded hover:bg-yellow-600 hover:text-white transition disabled:opacity-50"
          >
            Cargar Más Productos
          </button>
        </div>
      )}
    </div>
  );
}