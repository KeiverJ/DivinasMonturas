// src/Components/NavbarAdmin.jsx
import { useState, useEffect } from "react";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function NavbarAdmin() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const pathToId = {
    "/": "inicio",
    "/catalogo-admin": "catalogo",
    "/about": "acerca",
    "/mayoristas": "mayoristas",
    "/divinavision": "divina-vision",
    "/citas": "citas",
    "/nosotros": "acerca",
  };
  const activeLink = pathToId[location.pathname] || "inicio";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileMenuOpen(false);
  };

  const navLinks = [
    { id: "inicio", label: "Inicio", to: "/" },
    { id: "catalogo", label: "Gestión de Catálogo", to: "/catalogo-admin" },
    { id: "citas", label: "Citas", to: "/citas" },
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
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-serif text-black tracking-wider">
              DIVINAS
            </span>
            <span className="text-2xl font-serif ml-2" style={{ color: "#D4AF37" }}>
              MONTURAS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className="relative group py-2"
              >
                <span className={`text-black transition-colors duration-300 group-hover:text-[#D4AF37] ${activeLink === link.id ? 'text-[#D4AF37]' : ''}`}>
                  {link.label}
                </span>
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    activeLink === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  style={{ backgroundColor: "#D4AF37" }}
                />
              </Link>
            ))}

            {/* Redes sociales */}
            <a href="https://www.instagram.com/divinasmonturas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Divinas Monturas" className="hover:text-[#D4AF37] transition-colors text-xl">
              <FaInstagram />
            </a>
            <a href="https://web.facebook.com/divinavisioncucuta1/?locale=es_LA&_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook Divina Visión" className="hover:text-[#D4AF37] transition-colors text-xl">
              <FaFacebook />
            </a>
            <a href="https://www.tiktok.com/@divinavisioncucuta" target="_blank" rel="noopener noreferrer" aria-label="TikTok Divina Visión" className="hover:text-[#D4AF37] transition-colors text-xl">
              <FaTiktok />
            </a>
          </div>

          {/* Profile Menu Desktop */}
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
            >
              <User className="w-5 h-5 text-black" />
              <span className="text-black font-semibold text-sm">{user?.nombre}</span>
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "#D4AF37", color: "black" }}>
                {user?.rol}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-[#D4AF37]/20 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-black">{user?.nombre}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 flex items-center space-x-2 hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-semibold">Cerrar Sesión</span>
                </button>
              </div>
            )}
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
            {/* Perfil en mobile */}
            <div className="bg-[#D4AF37]/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-black">{user?.nombre}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
              <span className="text-xs px-3 py-1 rounded-full inline-block mt-2" style={{ backgroundColor: "#D4AF37", color: "black" }}>
                {user?.rol}
              </span>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeLink === link.id
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-black hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
              <a href="https://www.instagram.com/divinasmonturas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Divinas Monturas" className="hover:text-[#D4AF37] transition-colors text-2xl">
                <FaInstagram />
              </a>
              <a href="https://web.facebook.com/divinavisioncucuta1/?locale=es_LA&_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook Divina Visión" className="hover:text-[#D4AF37] transition-colors text-2xl">
                <FaFacebook />
              </a>
              <a href="https://www.tiktok.com/@divinavisioncucuta" target="_blank" rel="noopener noreferrer" aria-label="TikTok Divina Visión" className="hover:text-[#D4AF37] transition-colors text-2xl">
                <FaTiktok />
              </a>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-red-50 text-red-600 mt-4 font-semibold hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarAdmin;