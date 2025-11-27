import React, { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, onSubmit, product = null, filters = {} }) {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'montura',
    categoria: '',
    marca: '',
    material: '',
    genero: 'unisex',
    color: [],
    disponible: true,
    descripcion: '',
  });

  const [colorInput, setColorInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        nombre: '',
        tipo: 'montura',
        categoria: '',
        marca: '',
        material: '',
        genero: 'unisex',
        color: [],
        disponible: true,
        descripcion: '',
      });
    }
    setColorInput('');
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !formData.color.includes(colorInput.trim())) {
      setFormData({
        ...formData,
        color: [...formData.color, colorInput.trim()],
      });
      setColorInput('');
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setFormData({
      ...formData,
      color: formData.color.filter(c => c !== colorToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {product ? 'Editar Montura' : 'Nueva Montura'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Ej: Montura Acetato Dama Rosa"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tipo *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="montura">Montura</option>
                <option value="lentes">Lentes</option>
                <option value="accesorios">Accesorios</option>
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Categoría *
              </label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Marca
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Género
              </label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="dama">Dama</option>
                <option value="caballero">Caballero</option>
                <option value="niño">Niño</option>
                <option value="niña">Niña</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {/* Colores */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Colores
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Escribe un color y presiona Enter"
                  list="colores"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Agregar
                </button>
                <datalist id="colores">
                  {filters.colores?.map(color => (
                    <option key={color} value={color} />
                  ))}
                </datalist>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.color.map(color => (
                  <span
                    key={color}
                    className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className="text-purple-800 hover:text-purple-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Descripción del producto"
              />
            </div>

            {/* Disponible */}
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="disponible"
                  checked={formData.disponible}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700 font-semibold">Disponible</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}