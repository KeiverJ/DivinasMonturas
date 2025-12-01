// src/Pages/Catalogo.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { productService } from '../services/productService.js';
import ProductModal from '../Components/ProductModal';
import { motion } from 'framer-motion';
import { FaPlus, FaFilter, FaBox, FaTags, FaEdit, FaTrash } from 'react-icons/fa';

export default function Catalogo() {
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
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    loadProducts();
    loadFilters();
  }, [page, activeFilters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getProducts(activeFilters, page, 9);
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
      console.error('Error cargando filtros:', err);
    }
  };

  const handleFilterChange = (newFilter) => {
    setActiveFilters(newFilter);
    setPage(1);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedProduct) {
        // Actualizar producto existente
        const response = await productService.updateProduct(selectedProduct._id, formData);
        setProducts(products.map(p => p._id === selectedProduct._id ? response.data : p));
      } else {
        // Crear nuevo producto
        const response = await productService.createProduct(formData);
        setProducts([response.data, ...products]);
      }
      setModalOpen(false);
      setSelectedProduct(null);
      await loadProducts(); // Recargar para tener datos actualizados
    } catch (err) {
      throw err;
    }
  };

  // Calcular estadísticas
  const totalProducts = pagination?.total || 0;
  const uniqueCategories = filters.categorias?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20">
      {/* Header Premium */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-4 overflow-hidden">
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
            Panel de Administración
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif my-4"
          >
            <span className="text-white">Gestión de</span>{' '}
            <span style={{ color: '#D4AF37' }}>Productos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
          >
            Administra el catálogo completo de monturas. Edita, elimina o añade nuevos productos al inventario.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedProduct(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <FaPlus className="w-5 h-5" />
            Añadir Nuevo Producto
          </motion.button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-7xl mx-auto px-4 mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <FaBox className="w-7 h-7" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total de Productos</p>
                <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{totalProducts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <FaTags className="w-7 h-7" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Categorías</p>
                <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{uniqueCategories}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          {error}
        </div>
      )}

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
              <label className="block font-semibold text-gray-700 mb-2 text-sm">Tipo</label>
              <select
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
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="">Todas</option>
                {filters.categorias?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm">Marca</label>
              <select
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
              <label className="block font-semibold text-gray-700 mb-2 text-sm">Material</label>
              <select
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
              <label className="block font-semibold text-gray-700 mb-2 text-sm">Género</label>
              <select
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
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#D4AF37]"></div>
            <p className="mt-4 text-gray-600 font-medium">Cargando productos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <FaBox className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 text-lg">No hay productos. Crea el primero.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(212, 175, 55, 0.25)';
                  e.currentTarget.style.border = '2px solid rgba(212, 175, 55, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.border = '2px solid transparent';
                }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent)',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[3/4]">
                  <img
                    src={product.imagenes?.principal || 'https://via.placeholder.com/300x400?text=Sin+imagen'}
                    alt={product.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-xl shadow-lg"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: '#fff',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                    {product.tipo}
                  </div>
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-xl shadow-lg"
                    style={{
                      backgroundColor: '#D4AF37',
                      color: '#000',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                    Admin
                  </div>

                  {/* Marca Badge */}
                  {product.marca && (
                    <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: '#000',
                        border: '1px solid rgba(212, 175, 55, 0.3)'
                      }}>
                      {product.marca}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider uppercase" style={{ color: '#D4AF37' }}>
                      {product.categoria}
                    </span>
                    {product.precio && (
                      <span className="text-sm font-bold text-gray-900">
                        ${product.precio?.toLocaleString?.() ?? product.precio}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                    {product.nombre}
                  </h3>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">

                  </p>

                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEditClick(product)}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 group/btn relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        color: '#D4AF37',
                        border: '1.5px solid rgba(212, 175, 55, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#D4AF37';
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.borderColor = '#D4AF37';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                        e.currentTarget.style.color = '#D4AF37';
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FaEdit className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </div>
                    </motion.button>

                    <motion.button
                      onClick={() => handleDelete(product._id)}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 group/btn relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        color: '#DC2626',
                        border: '1.5px solid rgba(220, 38, 38, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#DC2626';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = '#DC2626';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                        e.currentTarget.style.color = '#DC2626';
                        e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)';
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FaTrash className="w-3.5 h-3.5" />
                        <span>Eliminar</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Paginación */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-12 px-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(page - 1)}
            disabled={!pagination.hasPrevPage}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: pagination.hasPrevPage ? '#000' : '#ccc', color: '#fff' }}
          >
            ← Anterior
          </motion.button>

          <span className="px-6 py-3 rounded-xl font-semibold" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>
            Página {pagination.pagina} de {pagination.totalPages}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(page + 1)}
            disabled={!pagination.hasNextPage}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: pagination.hasNextPage ? '#000' : '#ccc', color: '#fff' }}
          >
            Siguiente →
          </motion.button>
        </div>
      )}

      {/* Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
        product={selectedProduct}
        filters={filters}
      />
    </div>
  );
}