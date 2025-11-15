import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";

function Navbar({ cartCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "catalogo", label: "Catálogo" },
    { id: "acerca", label: "Acerca de" },
    { id: "mayoristas", label: "Mayoristas" },
    { id: "divina-vision", label: "Divina Visión" },
    { id: "citas", label: "Citas" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg"
          : "bg-white/60 backdrop-blur-md"
      }`}
      style={{
        borderBottom: isScrolled
          ? "1px solid rgba(212, 175, 55, 0.2)"
          : "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={() => setActiveLink("inicio")}
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-serif text-black tracking-wider">
              DIVINAS
            </span>
            <span className="text-2xl font-serif ml-2" style={{ color: "#D4AF37" }}>
              MONTURAS
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActiveLink(link.id)}
                className="relative group py-2"
              >
                <span className={`text-black transition-colors duration-300 group-hover:text-[#D4AF37] ${activeLink === link.id ? 'text-[#D4AF37]' : ''}`}>{link.label}</span>
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    activeLink === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  style={{ backgroundColor: "#D4AF37" }}
                />
              </a>
            ))}
          </div>

          {/* Cart Icon */}
          <div className="hidden md:flex items-center">
            <button className="relative p-2 hover:scale-110 transition-transform duration-300 group">
              <ShoppingCart className="w-6 h-6 text-black group-hover:text-[#D4AF37] transition-colors" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white animate-bounce"
                  style={{ backgroundColor: "#D4AF37" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="w-6 h-6 text-black">
              {isMobileMenuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#D4AF37]/20">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => {
                  setActiveLink(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeLink === link.id
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-black hover:bg-gray-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
              <ShoppingCart className="w-5 h-5" />
              <span>Carrito ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

Navbar.propTypes = {
  cartCount: PropTypes.number,
};
