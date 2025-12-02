import { useState } from "react";
import PropTypes from "prop-types";
import { FaWhatsapp } from "react-icons/fa";

function ProductCard({ name, brand, image, category, borderColor = "#D4AF37" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? `0 20px 40px ${borderColor}33` // 20% opacity
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      tabIndex={0}
      role="group"
      aria-label={`Tarjeta de producto: ${name}`}
    >

      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm">
          <span className="text-xs text-white">{category}</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1">{brand}</p>
        <h3 className="mb-3 text-black font-semibold">{name}</h3>
        <div className="flex items-center justify-end">
          <button
            className="px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,139,34,0.3)] hover:scale-105 flex items-center gap-2"
            style={{ backgroundColor: "#228B22", color: "#fff" }}
            onClick={() => {
              const mensaje = `
¡Hola!

Estoy interesado en obtener más información sobre este producto:

*${name}*
Marca: *${brand}*
Categoría: *${category}*

📸 Aquí puedes ver la imagen del producto:
${image}

¡Quedo atento/a!
  `;

              const url = `https://wa.me/573203713761?text=${encodeURIComponent(mensaje)}`;
              window.open(url, "_blank");
            }}>
            <FaWhatsapp className="w-4 h-4" />
            <span className="text-sm font-medium">WhatsApp</span>
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
        style={{
          border: `2px solid ${borderColor}`,
        }}
      />
    </div>
  );
}


ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
};

export default ProductCard;