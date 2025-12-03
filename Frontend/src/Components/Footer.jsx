import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminAccess = () => {
    navigate("/login");
  };

  return (
    <footer className="relative bg-black text-white">

      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#D4AF37"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div>
            <h3 className="font-serif mb-4" style={{ color: "#D4AF37" }}>
              DIVINAS MONTURAS
            </h3>
            <p className="text-gray-400 mb-6">
              Elegancia en cada montura. Descubre el lujo que mereces.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/divinavisioncucuta1/?ref=_xav_ig_profile_page_web#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group">
                <FaFacebookF className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.instagram.com/divinavisioncucuta1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group">
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.tiktok.com/@divinavisioncucuta" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group">
                <FaTiktok className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>


          <div>
            <h4 className="mb-4" style={{ color: "#D4AF37" }}>
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                {label: "Inicio", path: "/"},
                {label: "Catálogo", path: "/catalogo"},
                {label: "Acerca de", path: "/about"},
                {label: "Mayoristas", path: "/mayoristas"}
              ].map(({label, path}) => (
                <li key={label}>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 inline-flex items-center group bg-transparent"
                    onClick={() => navigate(path)}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h4 className="mb-4" style={{ color: "#D4AF37" }}>
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 text-[#D4AF37] mt-0.5">✉️</span>
                <p className="text-gray-400">divinavision@gmail.com</p>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 text-[#D4AF37] mt-0.5">📞</span>
                <a href="https://wa.me/573134095006" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  +57 313 409 5006
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 text-[#D4AF37] mt-0.5">📍</span>
                <div>
                  <p className="text-gray-400">C.C. Alejandría Entrada 1</p>
                  <p className="text-gray-400">Local 1-309, Cúcuta</p>
                </div>
              </li>
            </ul>
          </div>


          <div>
            <h4 className="mb-4" style={{ color: "#D4AF37" }}>
              Horarios
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-white mb-2">Tienda</p>
                <p className="text-gray-400">Lun - Sáb: 8:00 AM - 6:30 PM</p>
                <p className="text-gray-400 text-sm">(Jornada continua)</p>
              </div>
              <div>
                <p className="text-white mb-2">Examen Visual</p>
                <p className="text-gray-400">Lun - Vie: 9:00 AM - 12:00 PM</p>
                <p className="text-gray-400 ml-12">2:30 PM - 6:00 PM</p>
                <p className="text-gray-400 mt-1">Sáb: 9:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright con acceso discreto al login */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Divinas Monturas. Todos los derechos reservados.{" "}
            <button
              onClick={handleAdminAccess}
              className="inline-block text-gray-600 hover:text-[#D4AF37] transition-colors duration-300 text-xs ml-1"
              aria-label="Acceso administrativo"
              title="Admin"
            >
              ©
            </button>
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-110 z-40"
        style={{ backgroundColor: "#D4AF37" }}
        aria-label="Volver arriba"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
      </button>
    </footer>
  );
}

export default Footer;