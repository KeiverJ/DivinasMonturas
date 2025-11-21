import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="relative bg-black text-white mt-8">
      
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
              Elegancia y sofisticación en cada montura. Descubre el lujo que mereces.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group">
                <FaFacebookF className="w-5 h-5 text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group">
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group">
                <FaTwitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          
          <div>
            <h4 className="mb-4" style={{ color: "#D4AF37" }}>
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {["Inicio", "Catálogo", "Acerca de", "Mayoristas", "Política de Privacidad"].map(
                (link) => (
                  <li key={link}>
                    <button type="button" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 inline-flex items-center group bg-transparent">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link}
                      </span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          
          <div>
            <h4 className="mb-4" style={{ color: "#D4AF37" }}>
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 text-[#D4AF37] mt-0.5">✉️</span>
                <div>
                  <p className="text-gray-400">info@divinasmonturas.com</p>
                  <p className="text-gray-400">mayoristas@divinasmonturas.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 text-[#D4AF37] mt-0.5">📞</span>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-5 h-5 text-[#D4AF37] mt-0.5">📍</span>
                <p className="text-gray-400">123 Luxury Ave, Fashion District</p>
              </li>
            </ul>
          </div>

          
          <div>
            <h4 className="mb-4" style={{ color: "#D4AF37" }}>
              Horarios
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-white mb-2">Boutique</p>
                <p className="text-gray-400">Lun - Sáb: 10AM - 8PM</p>
                <p className="text-gray-400">Dom: 12PM - 6PM</p>
              </div>
              <div>
                <p className="text-white mb-2">Divina Visión</p>
                <p className="text-gray-400">Lun - Vie: 9AM - 7PM</p>
                <p className="text-gray-400">Sáb: 10AM - 4PM</p>
              </div>
              <div>
                <p className="text-white mb-2">Mayoristas</p>
                <p className="text-gray-400">Lun - Vie: 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="mb-4" style={{ color: "#D4AF37" }}>
              Suscríbete a nuestro Newsletter
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                className="px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-105"
                style={{ backgroundColor: "#D4AF37", color: "#000" }}
              >
                Suscribir
              </button>
            </div>
          </div>
        </div>

        {/* Payment Icons & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400">
            © 2025 Divinas Monturas. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>💳</span>
            <span>🔒 Pago Seguro</span>
          </div>
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
