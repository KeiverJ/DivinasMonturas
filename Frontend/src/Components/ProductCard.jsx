

import { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaShoppingCart, FaHeart } from "react-icons/fa";

function ProductCard({ name, brand, price, image, category }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? "0 20px 40px rgba(212, 175, 55, 0.2)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      tabIndex={0}
      role="group"
      aria-label={`Tarjeta de producto: ${name}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
        >
          <FaHeart className={`w-5 h-5 transition-colors ${isLiked ? "text-[#D4AF37]" : "text-gray-600"}`} />
        </button>
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm">
          <span className="text-xs text-white">{category}</span>
        </div>
        {/* Quick Action Buttons */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <button className="px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 flex items-center gap-2 group/btn">
            <FaEye className="w-4 h-4 text-gray-700 group-hover/btn:text-[#D4AF37]" />
            <span className="text-sm text-gray-700 group-hover/btn:text-[#D4AF37]">
              Vista Rápida
            </span>
          </button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1">{brand}</p>
        <h3 className="mb-3 text-black">{name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl" style={{ color: "#D4AF37" }}>
              ${price?.toLocaleString?.() ?? price}
            </span>
          </div>
          <button
            className="px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 flex items-center gap-2"
            style={{ backgroundColor: "#D4AF37", color: "#000" }}
          >
            <FaShoppingCart className="w-4 h-4" />
            <span className="text-sm">Añadir</span>
          </button>
        </div>
      </div>
      {/* Gold Border on Hover */}
      <div
        className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          border: "2px solid #D4AF37",
        }}
      />
    </div>
  );
}


ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ProductCard;
