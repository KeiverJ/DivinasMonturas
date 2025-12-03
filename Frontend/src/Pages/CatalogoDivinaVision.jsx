import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { productService } from '../services/productService.js';
import ProductModal from '../Components/ProductModal';
import ProductCard from '../Components/ProductCard';
import { motion } from 'framer-motion';
import { FaPlus, FaFilter, FaBox, FaTags, FaEdit, FaTrash, FaWhatsapp } from 'react-icons/fa';

export default function CatalogoDivinaVision() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ tipo: 'gafas' });

  useEffect(() => {
    // Siempre usar paginación estándar (20 productos por página)
    loadProducts(page, 20);
    loadFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, activeFilters]);

  const loadProducts = async (pageToUse = 1, limitToUse = 20) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getProducts(activeFilters, pageToUse, limitToUse);
      setProducts(response.data);
      setPagination(response.paginacion);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const response = await productService.getFilters();
      setFilters(response.data || {});
    } catch (err) {
      // Error cargando filtros
    }
  };

  // Solo permitir cambiar filtros distintos a tipo
  const handleFilterChange = (newFilter) => {
    // Si la categoría es vacía (TODAS), no la incluyas en el filtro
    const { categoria, ...rest } = newFilter;
    const filtersToSet = categoria ? { ...rest, categoria, tipo: 'gafas' } : { ...rest, tipo: 'gafas' };
    setActiveFilters(filtersToSet);
    setPage(1);
  };

  // Filtrar productos por categoría (aceptando variantes de mayúsculas/minúsculas y tildes)
  const normalizar = (str) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

  const esSolAAA = (cat) => {
    const c = normalizar(cat);
    return c === 'sol aaa';
  };
  const esSolEconomicas = (cat) => {
    const c = normalizar(cat);
    return c === 'sol economicas';
  };

  const filterByCategoria = (product) => {
    const categoria = product.categoria?.trim();
    if (!activeFilters.categoria || activeFilters.categoria === '') {
      // Mostrar ambas categorías sin importar variantes
      return esSolAAA(categoria) || esSolEconomicas(categoria);
    }
    // Si hay filtro, comparar normalizado
    if (normalizar(activeFilters.categoria) === 'sol aaa') return esSolAAA(categoria);
    if (normalizar(activeFilters.categoria) === 'sol economicas') return esSolEconomicas(categoria);
    return false;
  };

  // DEBUG extra: mostrar productos filtrados por cada categoría
  // Eliminado debug de productos por categoría


  return (
<div className="min-h-screen bg-linear-to-b from-[#1A628F]/10 via-white to-[#1A628F]/10 pt-20">
      {/* Header Divina Visión */}
      <div className="relative bg-linear-to-br from-[#1A628F] via-[#0D3B5C] to-[#1A628F] text-white py-20 px-4 overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}
          >
            Catálogo Divina Visión
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif my-4"
          >
            <span className="text-white">Gafas de </span>{' '}
            <span style={{ color: '#D4AF37' }}>Sol</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-200 max-w-2xl mx-auto mb-8 text-lg"
          >
            Descubre la colección exclusiva de gafas de sol Divina Visión. Estilo, protección y elegancia.
          </motion.p>
        </div>
      </div>


      {/* Estadísticas ocultas */}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          {error}
        </div>
      )}

      {/* Filtros solo por categoría */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-8 py-4 mt-8 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 bg-[#1A628F]"
        >
          <FaFilter className="w-4 h-4" />
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </motion.button>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white p-6 rounded-2xl grid grid-cols-1 gap-4 shadow-lg border border-gray-100"
          >
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm">Categoría</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleFilterChange({ ...activeFilters, categoria: e.target.value });
                  } else {
                    const { categoria, ...rest } = activeFilters;
                    handleFilterChange(rest);
                  }
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1A628F] transition-colors"
                value={activeFilters.categoria || ''}
              >
                <option value="">Todas</option>
                {Array.from(new Set(
                  (filters.categorias || [])
                    .filter(cat => {
                      // Solo mostrar categorías que existan en productos tipo 'gafas'
                      return products.some(p => p.categoria === cat && p.tipo === 'gafas');
                    })
                )).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid de productos usando ProductCard */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#D4AF37]"></div>
            <p className="mt-4 text-gray-600 font-medium">Cargando gafas de sol...</p>
          </div>
        ) : products.filter(filterByCategoria).length === 0 ? (
          <div className="text-center py-20">
            <FaBox className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 text-lg">No hay gafas de sol disponibles.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.filter(filterByCategoria).map(product => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className=""
                >
                  <ProductCard
                    name={product.nombre}
                    brand={product.marca || ''}
                    image={product.imagenes?.principal || '/no-image.jpg'}
                    category={product.categoria}
                    borderColor="#1A628F"
                  />
                  {user && (
                    <div className="flex gap-2 mt-2">
                      <button
                        className="flex-1 px-4 py-2 rounded-lg bg-[#1A628F] text-white font-semibold hover:bg-[#0D3B5C] transition-all"
                        onClick={() => {
                          setSelectedProduct(product);
                          setModalOpen(true);
                        }}
                      >
                        <FaEdit className="inline mr-1" /> Editar
                      </button>
                      <button
                        className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-700 transition-all"
                        onClick={async () => {
                          if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                            try {
                              await productService.deleteProduct(product._id);
                              setProducts(products.filter(p => p._id !== product._id));
                            } catch (err) {
                              setError(err.message);
                            }
                          }
                        }}
                      >
                        <FaTrash className="inline mr-1" /> Eliminar
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Paginación */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mb-12 px-4 mt-12 text-center">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 sm:px-7 py-2 sm:py-3 text-sm sm:text-base rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md border-2 text-center"
                  style={{
                    background: pagination.hasPrevPage ? '#1A628F' : '#ccc',
                    color: '#fff',
                    borderColor: '#1A628F',
                  }}
                >
                  ← Anterior
                </motion.button>

                <span
                  className="px-4 sm:px-7 py-2 sm:py-3 text-sm sm:text-base rounded-2xl font-semibold shadow border-2 text-center flex items-center justify-center"
                  style={{
                    background: '#fff',
                    color: '#1A628F',
                    borderColor: '#1A628F',
                  }}
                >
                  Página {pagination.pagina} de {pagination.totalPages}
                </span>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-4 sm:px-7 py-2 sm:py-3 text-sm sm:text-base rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md border-2 text-center"
                  style={{
                    background: pagination.hasNextPage ? '#1A628F' : '#ccc',
                    color: '#fff',
                    borderColor: '#1A628F',
                  }}
                >
                  Siguiente →
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal para crear/editar producto */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={async (formData) => {
          try {
            if (selectedProduct) {
              // Actualizar producto existente
              const response = await productService.updateProduct(selectedProduct._id, formData);
              setProducts(products.map(p => p._id === selectedProduct._id ? response.data : p));
            } else {
              // Crear nuevo producto
              const response = await productService.createProduct({ ...formData, tipo: 'gafas' });
              setProducts([response.data, ...products]);
            }
            setModalOpen(false);
            setSelectedProduct(null);
            await loadProducts();
          } catch (err) {
            setError(err.message);
          }
        }}
        product={selectedProduct}
        categorias={filters.categorias || []}
        marcas={filters.marcas || []}
        materiales={filters.materiales || []}
        generos={filters.generos || []}
      />
    </div>
  );
}
