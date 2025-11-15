
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaSlidersH, FaTimes } from "react-icons/fa";
import ProductCard from "../Components/ProductCard";

function Catalogo() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    shape: [],
    material: [],
    color: [],
    price: "all",
    gender: "all",
    brand: [],
  });
  const [sortBy, setSortBy] = useState("featured");

  const products = [
    {
      id: 1,
      name: "Aviator Classic Gold",
      brand: "DIVINAS Premium",
      price: 299,
      image: "https://images.unsplash.com/photo-1762706334838-ea8425b43116?w=800",
      category: "Sunglasses",
      shape: "aviator",
      material: "metal",
      color: "gold",
      gender: "unisex",
    },
    {
      id: 2,
      name: "Elegance Frame",
      brand: "DIVINAS Classic",
      price: 349,
      image: "https://images.unsplash.com/photo-1671960610018-f2fdebbe5b47?w=800",
      category: "Optical",
      shape: "round",
      material: "acetate",
      color: "black",
      gender: "women",
    },
    {
      id: 3,
      name: "Luxury Cat Eye",
      brand: "DIVINAS Signature",
      price: 399,
      image: "https://images.unsplash.com/photo-1760337871482-9dd93e75fa88?w=800",
      category: "Sunglasses",
      shape: "cat-eye",
      material: "acetate",
      color: "tortoise",
      gender: "women",
    },
    {
      id: 4,
      name: "Executive Square",
      brand: "DIVINAS Premium",
      price: 329,
      image: "https://images.unsplash.com/photo-1682664175900-7771b38e1585?w=800",
      category: "Optical",
      shape: "square",
      material: "titanium",
      color: "silver",
      gender: "men",
    },
    {
      id: 5,
      name: "Modern Wayfarer",
      brand: "DIVINAS Urban",
      price: 279,
      image: "https://images.unsplash.com/photo-1762706334838-ea8425b43116?w=800",
      category: "Sunglasses",
      shape: "wayfarer",
      material: "acetate",
      color: "black",
      gender: "unisex",
    },
    {
      id: 6,
      name: "Vintage Round",
      brand: "DIVINAS Heritage",
      price: 359,
      image: "https://images.unsplash.com/photo-1671960610018-f2fdebbe5b47?w=800",
      category: "Optical",
      shape: "round",
      material: "metal",
      color: "gold",
      gender: "unisex",
    },
  ];

  const filterOptions = {
    shape: ["Aviator", "Round", "Square", "Cat-Eye", "Wayfarer", "Geometric"],
    material: ["Acetate", "Metal", "Titanium", "Wood", "Carbon Fiber"],
    color: ["Black", "Gold", "Silver", "Tortoise", "Crystal", "Blue"],
    price: [
      { label: "Todos", value: "all" },
      { label: "Menos de $200", value: "0-200" },
      { label: "$200 - $300", value: "200-300" },
      { label: "$300 - $400", value: "300-400" },
      { label: "Más de $400", value: "400+" },
    ],
    gender: [
      { label: "Todos", value: "all" },
      { label: "Hombres", value: "men" },
      { label: "Mujeres", value: "women" },
      { label: "Unisex", value: "unisex" },
    ],
    brand: ["DIVINAS Premium", "DIVINAS Classic", "DIVINAS Signature", "DIVINAS Urban", "DIVINAS Heritage"],
  };

  const activeFilterCount = Object.values(selectedFilters).reduce((count, filter) => {
    if (Array.isArray(filter)) return count + filter.length;
    if (filter !== "all") return count + 1;
    return count;
  }, 0);

  return (
    <div id="catalogo" className="min-h-screen pt-32 md:pt-36 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Catálogo <span style={{ color: "#D4AF37" }}>Exclusivo</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestra colección completa de monturas de lujo, diseñadas para destacar tu estilo único.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:w-auto w-full bg-black hover:bg-black/90 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
          >
            <FaFilter className="w-4 h-4" />
            Filtros
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#D4AF37", color: "#000" }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex-1 flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
            >
              <option value="featured">Destacados</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="newest">Más Recientes</option>
              <option value="popular">Más Populares</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 rounded-xl bg-white border-2 border-[#D4AF37]/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="flex items-center gap-2" style={{ color: "#D4AF37" }}>
                <FaSlidersH className="w-5 h-5" />
                Filtros Avanzados
              </h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Shape Filter */}
              <div>
                <h4 className="mb-3 text-black">Forma</h4>
                <div className="space-y-2">
                  {filterOptions.shape.map((shape) => (
                    <label key={shape} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                        // Falta lógica de filtro
                      />
                      <span className="text-gray-700 group-hover:text-[#D4AF37] transition-colors">
                        {shape}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Material Filter */}
              <div>
                <h4 className="mb-3 text-black">Material</h4>
                <div className="space-y-2">
                  {filterOptions.material.map((material) => (
                    <label key={material} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                        // Falta lógica de filtro
                      />
                      <span className="text-gray-700 group-hover:text-[#D4AF37] transition-colors">
                        {material}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Color Filter */}
              <div>
                <h4 className="mb-3 text-black">Color</h4>
                <div className="space-y-2">
                  {filterOptions.color.map((color) => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                        // Falta lógica de filtro
                      />
                      <span className="text-gray-700 group-hover:text-[#D4AF37] transition-colors">
                        {color}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Price Filter */}
              <div>
                <h4 className="mb-3 text-black">Precio</h4>
                <div className="space-y-2">
                  {filterOptions.price.map((price) => (
                    <label key={price.value} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        value={price.value}
                        className="w-4 h-4 border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                        // Falta lógica de filtro
                      />
                      <span className="text-gray-700 group-hover:text-[#D4AF37] transition-colors">
                        {price.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Gender Filter */}
              <div>
                <h4 className="mb-3 text-black">Género</h4>
                <div className="space-y-2">
                  {filterOptions.gender.map((gender) => (
                    <label key={gender.value} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="gender"
                        value={gender.value}
                        className="w-4 h-4 border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                        // Falta lógica de filtro
                      />
                      <span className="text-gray-700 group-hover:text-[#D4AF37] transition-colors">
                        {gender.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Brand Filter */}
              <div>
                <h4 className="mb-3 text-black">Marca</h4>
                <div className="space-y-2">
                  {filterOptions.brand.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                        // Falta lógica de filtro
                      />
                      <span className="text-gray-700 group-hover:text-[#D4AF37] transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="flex-1 bg-[#D4AF37] hover:bg-[#C4A137] text-black rounded-lg py-2 font-semibold">Aplicar Filtros</button>
              <button className="flex-1 border border-[#D4AF37] rounded-lg py-2 font-semibold">Limpiar Todo</button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button
            className="px-8 py-4 rounded-lg border-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
            style={{ borderColor: "#D4AF37", color: "#D4AF37" }}
          >
            Cargar Más Productos
          </button>
        </div>
      </div>
    </div>
  );
}

export default Catalogo;
