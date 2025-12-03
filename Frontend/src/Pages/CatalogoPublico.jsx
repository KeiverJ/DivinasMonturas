import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../Components/ProductCard';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';

export default function CatalogoPublico() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    loadProducts();
    loadFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, activeFilters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts(activeFilters, page, 9);
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

  const handleFilterChange = (newFilter) => {
    setActiveFilters(newFilter);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="text-center py-16 px-4 mt-10">
        <h1 className="text-5xl font-serif mb-4">
          <span className="text-black">Nuestro</span> <span className="text-yellow-600">Catálogo</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra exclusiva colección de monturas de lujo, diseñadas para reflejar tu estilo único y sofisticado.
        </p>
      </div>

      {/* Filtros mejorados */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: '#000' }}
        >
          <FaFilter className="w-4 h-4" />
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </motion.button>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white p-6 rounded-2xl grid grid-cols-1 md:grid-cols-5 gap-4 shadow-lg border border-gray-100"
          >
            <div>
              <label htmlFor="tipo-select" className="block font-semibold text-gray-700 mb-2 text-sm">Tipo</label>
              <select
                id="tipo-select"
                onChange={(e) => {
                  if (e.target.value) {
                    handleFilterChange({ ...activeFilters, tipo: e.target.value });
                  } else {
                    const { tipo, ...rest } = activeFilters;
                    handleFilterChange(rest);
                  }
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="">Todos</option>
                {filters.tipos?.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="categoria-select" className="block font-semibold text-gray-700 mb-2 text-sm">Categoría</label>
              <select
                id="categoria-select"
                onChange={(e) => {
                  if (e.target.value) {
                    handleFilterChange({ ...activeFilters, categoria: e.target.value });
                  } else {
                    const { categoria, ...rest } = activeFilters;
                    handleFilterChange(rest);
                  }
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="">Todas</option>
                {filters.categorias?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="marca-select" className="block font-semibold text-gray-700 mb-2 text-sm">Marca</label>
              <select
                id="marca-select"
                onChange={(e) => {
                  if (e.target.value) {
                    handleFilterChange({ ...activeFilters, marca: e.target.value });
                  } else {
                    const { marca, ...rest } = activeFilters;
                    handleFilterChange(rest);
                  }
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="">Todas</option>
                {filters.marcas?.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="material-select" className="block font-semibold text-gray-700 mb-2 text-sm">Material</label>
              <select
                id="material-select"
                onChange={(e) => {
                  if (e.target.value) {
                    handleFilterChange({ ...activeFilters, material: e.target.value });
                  } else {
                    const { material, ...rest } = activeFilters;
                    handleFilterChange(rest);
                  }
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="">Todos</option>
                {filters.materiales?.map(mat => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="genero-select" className="block font-semibold text-gray-700 mb-2 text-sm">Género</label>
              <select
                id="genero-select"
                onChange={(e) => {
                  if (e.target.value) {
                    handleFilterChange({ ...activeFilters, genero: e.target.value });
                  } else {
                    const { genero, ...rest } = activeFilters;
                    handleFilterChange(rest);
                  }
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="">Todos</option>
                {filters.generos?.map(genero => (
                  <option key={genero} value={genero}>{genero}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid de productos */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {(() => {
          if (loading) {
            return <div className="text-center py-12">Cargando productos...</div>;
          }
          if (products.length === 0) {
            return <div className="text-center py-12 text-gray-600">No hay productos disponibles.</div>;
          }
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  name={product.nombre}
                  brand={product.marca || 'Sin marca'}
                  image={product.imagenes?.principal || 'https://via.placeholder.com/400x400?text=Sin+imagen'}
                  category={product.categoria}
                  tipo={product.tipo}
                />
              ))}
            </div>
          );
        })()}
      </div>
      
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-12 px-4 text-center">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!pagination.hasPrevPage}
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white text-center"
          >
            ← Anterior
          </button>

          <span className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold bg-yellow-50 text-yellow-600 border border-yellow-200 text-center flex items-center justify-center">
            Página {pagination.pagina} de {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={!pagination.hasNextPage}
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white text-center"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}