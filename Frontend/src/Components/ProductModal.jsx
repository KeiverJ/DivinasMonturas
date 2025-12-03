import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaImage, FaTrash } from 'react-icons/fa';

export default function ProductModal({ isOpen, onClose, onSubmit, product = null, filters = {} }) {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'montura',
    categoria: '',
    marca: '',
    material: '',
    genero: 'unisex',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        tipo: product.tipo === 'lentes' ? 'gafas' : (product.tipo || 'montura'),
        categoria: product.categoria || '',
        marca: product.marca || '',
        material: product.material || '',
        genero: product.genero || 'unisex',
      });

      // Si hay imagen en el producto, mostrarla
      if (product.imagenes?.principal) {
        setImagePreview(product.imagenes.principal);
      }
    } else {
      setFormData({
        nombre: '',
        tipo: 'montura',
        categoria: '',
        marca: '',
        material: '',
        genero: 'unisex',
      });
      setImagePreview(null);
      setImageFile(null);
    }
    setError(null);
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Crear FormData para enviar imagen
      const formDataToSend = new FormData();

      // Agregar imagen si existe
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const camposEditables = ['nombre', 'tipo', 'categoria', 'marca', 'material', 'genero'];
      for (const key of camposEditables) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }

      await onSubmit(formDataToSend);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Extract button label logic
  let buttonLabel;
  if (loading) {
    buttonLabel = 'Guardando...';
  } else if (product) {
    buttonLabel = 'Actualizar Producto';
  } else {
    buttonLabel = 'Crear Producto';
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl w-full max-w-4xl sm:max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border-2 border-[rgba(212,175,55,0.2)]"
            style={{ border: '2px solid rgba(212, 175, 55, 0.2)' }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(244, 229, 184, 0.05))',
              }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-black">
                    {product ? 'Editar' : 'Nueva'}{' '}
                    <span style={{ color: '#D4AF37' }}>Montura</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {product ? 'Modifica los datos del producto' : 'Completa el formulario para agregar un nuevo producto'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-3 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    color: '#D4AF37',
                  }}
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-4 sm:px-8 py-4 sm:py-6 pb-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 pb-4">
                {/* Imagen Upload */}
                <div>
                  <label htmlFor="imagen-principal" className="block text-sm font-semibold text-gray-700 mb-3">
                    Imagen Principal *
                  </label>
                  <div className="flex gap-4">
                    {/* Preview */}
                    {imagePreview ? (
                      <div className="relative group">
                        <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-gray-200">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="imagen-principal"
                        className="w-40 h-40 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          borderColor: 'rgba(212, 175, 55, 0.3)',
                          backgroundColor: 'rgba(212, 175, 55, 0.05)',
                        }}
                      >
                        <FaImage className="w-8 h-8 mb-2" style={{ color: '#D4AF37' }} />
                        <span className="text-sm font-medium" style={{ color: '#D4AF37' }}>
                          Subir imagen
                        </span>
                        <span className="text-xs text-gray-400 mt-1">Max 5MB</span>
                        <input
                          id="imagen-principal"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Formatos aceptados: JPG, PNG, WEBP
                      </p>
                      <p className="text-xs text-gray-400">
                        Recomendamos imágenes de 800x1000px para mejor calidad
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grid de campos */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                  {/* Nombre */}
                  <div className="md:col-span-2">
                    <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full min-w-0 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none transition-all duration-300"
                      style={{
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                      placeholder="Ej: Montura Acetato Dama Rosa"
                    />
                  </div>

                  {/* Tipo */}
                  <div className="min-w-0">
                    <label htmlFor="tipo" className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo *
                    </label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      className="w-full min-w-0 px-4 py-3 rounded-xl border-2 transition-all duration-300"
                      style={{
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                    >
                      <option value="montura">Montura</option>
                      <option value="gafas">Gafas</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </div>

                  {/* Categoría */}
                  <div className="min-w-0">
                    <label htmlFor="categoria" className="block text-sm font-semibold text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <input
                      id="categoria"
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                      className="w-full min-w-0 px-4 py-3 rounded-xl border-2 transition-all duration-300"
                      style={{
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                      placeholder="Ej: Acetato dama"
                      list="categorias"
                    />
                    <datalist id="categorias">
                      {filters.categorias?.map(cat => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>

                  {/* Marca */}
                  <div className="min-w-0">
                    <label htmlFor="marca" className="block text-sm font-semibold text-gray-700 mb-2">
                      Marca
                    </label>
                    <input
                      id="marca"
                      type="text"
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      className="w-full min-w-0 px-4 py-3 rounded-xl border-2 transition-all duration-300"
                      style={{
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                      placeholder="Ej: Victoria Rose"
                      list="marcas"
                    />
                    <datalist id="marcas">
                      {filters.marcas?.map(marca => (
                        <option key={marca} value={marca} />
                      ))}
                    </datalist>
                  </div>

                  {/* Material */}
                  <div className="min-w-0">
                    <label htmlFor="material" className="block text-sm font-semibold text-gray-700 mb-2">
                      Material
                    </label>
                    <input
                      id="material"
                      type="text"
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      className="w-full min-w-0 px-4 py-3 rounded-xl border-2 transition-all duration-300"
                      style={{
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                      placeholder="Ej: acetato"
                      list="materiales"
                    />
                    <datalist id="materiales">
                      {filters.materiales?.map(mat => (
                        <option key={mat} value={mat} />
                      ))}
                    </datalist>
                  </div>

                  {/* Género */}
                  <div className="min-w-0">
                    <label htmlFor="genero" className="block text-sm font-semibold text-gray-700 mb-2">
                      Género
                    </label>
                    <select
                      id="genero"
                      name="genero"
                      value={formData.genero}
                      onChange={handleChange}
                      className="w-full min-w-0 px-4 py-3 rounded-xl border-2 transition-all duration-300"
                      style={{
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                    >
                      <option value="dama">Dama</option>
                      <option value="caballero">Caballero</option>
                      <option value="niño">Niño</option>
                      <option value="niña">Niña</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-100 bg-white">
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    color: '#000',
                  }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  {buttonLabel}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}