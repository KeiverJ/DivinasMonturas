import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSun, FaShieldAlt, FaStar, FaGem, FaInstagram, FaWhatsapp } from "react-icons/fa";


import { productService } from "../services/productService";
import logoDV from "../../public/logoDV.jpg";

function DivinaVision() {
  const benefits = [
    {
      icon: FaSun,
      title: "Protección UV Certificada",
      description: "100% protección contra rayos UV400 para cuidar tus ojos con estilo"
    },
    {
      icon: FaGem,
      title: "Diseños Exclusivos",
      description: "Colección curada de gafas premium que definen tendencias"
    },
    {
      icon: FaShieldAlt,
      title: "Calidad Premium",
      description: "Materiales de primera calidad y acabados impecables"
    },
    {
      icon: FaStar,
      title: "Estilo Único",
      description: "Desde clásicos atemporales hasta las últimas tendencias"
    },
  ];

  // Estado para colecciones (gafas de sol)
  const [collections, setCollections] = useState([]);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [errorCollections, setErrorCollections] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoadingCollections(true);
      setErrorCollections(null);
      try {
        // Solo tipo lentes (gafas de sol)
        const res = await productService.getProducts({ tipo: "lentes" }, 1, 4);
        // Mapear a formato esperado
        const mapped = res.data.map(product => ({
          name: product.nombre,
          description: product.categoria || "Gafas de sol",
          image: product.imagenes?.principal || "",
          price: product.precio ? `Desde $${product.precio}` : ""
        }));
        // Mezclar aleatoriamente el array
        const shuffled = mapped.sort(() => Math.random() - 0.5);
        setCollections(shuffled);
      } catch (err) {
        setErrorCollections("No se pudieron cargar las gafas de sol");
      } finally {
        setLoadingCollections(false);
      }
    };
    fetchCollections();
  }, []);

  const instagramPosts = [
    "https://www.instagram.com/p/DRAFqBPlXIw/",
    "https://www.instagram.com/p/DQ9kga7inSv/",
    "https://www.instagram.com/p/DPwK1shDfGy/",
    "https://www.instagram.com/p/DRDdPZTCSqG/",
  ];

  const navigate = useNavigate();

  // Cargar el script de Instagram para los embeds
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="divina-vision" className="min-h-screen">

      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-40 md:pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/DivinaVisionLocal.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto bg-white rounded-full overflow-hidden border-4 shadow-xl"
              style={{
                borderColor: "#EF7272",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)"
              }}
            >
              <img src={logoDV} alt="Divina Visión" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight"
          >
            DIVINA VISIÓN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 font-light"
          >
            Boutique Premium de Gafas de Sol
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base md:text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Estilo, protección y elegancia en cada diseño
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex gap-4 justify-center flex-wrap mb-12"
          >
            <button
              type="button"
              onClick={() => navigate('/catalogo?tipo=lentes')}
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 bg-[#EF7272] text-white shadow-lg hover:shadow-xl hover:bg-[#e35a5a] hover:scale-105"
            >
              Ver Colección
            </button>
            <button
              type="button"
              onClick={() => navigate('/contacto')}
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 border-white/70 text-white hover:bg-white hover:text-[#1A628F] hover:scale-105"
            >
              Contáctanos
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="pt-8 border-t border-white/20"
          >
            <p className="text-white/70 text-sm mb-3">En alianza con</p>
            <p className="text-[#D4AF37] text-2xl md:text-3xl font-bold tracking-wide">
              DIVINAS MONTURAS
            </p>
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              ¿Por Qué Elegir <span style={{ color: "#1A628F" }}>Divina Visión?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gafas de sol premium que combinan protección, calidad y estilo inigualable
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 mx-auto"
                  style={{ backgroundColor: "rgba(26, 98, 143, 0.1)" }}
                >
                  <benefit.icon className="w-8 h-8" style={{ color: "#1A628F" }} />
                </div>
                <h3 className="text-lg mb-2 text-black font-semibold">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Colecciones Destacadas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Colecciones <span style={{ color: "#1A628F" }}>Destacadas</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros estilos más populares y encuentra el tuyo
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loadingCollections ? (
              <div className="col-span-4 text-center text-gray-500">Cargando gafas de sol...</div>
            ) : errorCollections ? (
              <div className="col-span-4 text-center text-red-500">{errorCollections}</div>
            ) : collections.length === 0 ? (
              <div className="col-span-4 text-center text-gray-500">No hay gafas de sol disponibles.</div>
            ) : (
              collections.map((collection, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: "linear-gradient(to top, rgba(26, 98, 143, 0.8), transparent)" }}
                    >
                      <a
                        href={`https://wa.me/573134095006?text=Hola! Estoy interesado en las gafas ${collection.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:bg-[#128C7E] hover:scale-105"
                      >
                        <FaWhatsapp className="w-6 h-6" />
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>
                  <h3 className="mb-2 text-black font-semibold text-lg">{collection.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{collection.description}</p>
                  <p className="text-[#1A628F] font-semibold">{collection.price}</p>
                </motion.div>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/catalogo?tipo=lentes', { state: { tipo: 'lentes' } })}
              className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: "#1A628F", color: "white" }}
            >
              Ver Catálogo Completo
            </button>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Visítanos en <span style={{ color: "#1A628F" }}>Cúcuta</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encuentra tu estilo perfecto en nuestra boutique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-black mb-6">Horarios</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Lunes a Sábado</p>
                  <p className="text-black font-medium text-lg">8:00 AM - 6:30 PM</p>
                  <p className="text-gray-500 text-xs mt-1">(Jornada continua)</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-black mb-6">Contáctanos</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-black mb-2">📍 Ubicación</p>
                  <p className="text-gray-700 text-sm">C.C. Alejandría Local 1-3-4A</p>
                  <p className="text-gray-600 text-sm">Calle 9 Entrada 1, Cúcuta</p>
                </div>
                <div>
                  <p className="font-semibold text-black mb-2">📞 WhatsApp</p>
                  <a
                    href="https://wa.me/573134095006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1A628F] hover:underline text-sm font-medium"
                  >
                    +57 313 409 5006
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-black mb-2">📸 Instagram</p>
                  <a
                    href="https://www.instagram.com/divinavisioncucuta1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EF7272] hover:underline text-sm font-medium inline-flex items-center gap-2"
                  >
                    <FaInstagram />
                    @divinavisioncucuta1
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Síguenos en <span style={{ color: "#EF7272" }}>Instagram</span>
            </h2>
            <a
              href="https://www.instagram.com/divinavisioncucuta1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-medium hover:opacity-80 transition-all duration-300"
              style={{ color: "#EF7272" }}
            >
              <FaInstagram className="w-6 h-6" />
              <span>@divinavisioncucuta1</span>
            </a>
            <p className="text-gray-600 mt-3">Descubre nuestras últimas colecciones y tendencias</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {instagramPosts.map((postUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-center"
              >
                <div
                  className="w-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                  style={{
                    maxWidth: '540px',
                    paddingBottom: '130%',
                    height: 0
                  }}
                >
                  <iframe
                    src={`${postUrl}embed/`}
                    className="border-0 absolute top-0 left-0 w-full h-full"
                    style={{
                      minHeight: '600px'
                    }}
                    scrolling="no"
                    allowTransparency="true"
                    allow="encrypted-media"
                    title={`Instagram Post ${index + 1}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-10"
          >
            <a
              href="https://www.instagram.com/divinavisioncucuta1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#EF7272", color: "white" }}
            >
              Seguir en Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-2xl text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1A628F, #0D3B5C)" }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "#EF7272" }}
            />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "#D4AF37" }}
            />
            <div className="relative z-10 text-center">
              <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Encuentra tu <span style={{ color: "#EF7272" }}>Estilo</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Visítanos y descubre la colección perfecta de gafas de sol para ti
              </p>
              <button
                onClick={() => navigate('/catalogo?tipo=lentes')}
                className="inline-block px-8 py-4 rounded-lg transition-all duration-300 bg-[#EF7272] text-white font-semibold hover:scale-105 hover:shadow-lg"
              >
                Explorar Colección
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default DivinaVision;
