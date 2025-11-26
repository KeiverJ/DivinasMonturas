import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaEye, FaGlasses, FaShieldAlt, FaStar, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaInstagram, FaCreditCard, FaPercentage } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

import logoDV from "../../public/logoDV.jpg";

function DivinaVision() {
  const services = [
    {
      icon: FaEye,
      title: "Examen Visual Computarizado",
      description: "Valoración completa de Optometría con tecnología de vanguardia",
      price: "$70.000",
      priceNote: "$35.000 con compra de montura y lentes"
    },
    {
      icon: FaGlasses,
      title: "Monturas de Calidad",
      description: "Diseños variados desde opciones sencillas hasta monturas premium",
      price: "Desde $35.000",
      priceNote: "Monturas de calidad desde $90.000"
    },
    {
      icon: FaShieldAlt,
      title: "Cristales Personalizados",
      description: "Lentes según tu fórmula y recomendación del optometrista",
      price: "Desde $80.000",
      priceNote: "Varía según fórmula y necesidades"
    },
  ];

  const paymentMethods = [
    {
      name: "Nequi",
      logo: "/logos/nequi.jpg" 
    },
    {
      name: "Bancolombia",
      logo: "/logos/bancolombia.jpg" 
    },
    {
      name: "Daviplata",
      logo: "/logos/daviplata.png"
    },
    {
      name: "Sistecredito",
      logo: "/logos/sistecredito.png" 
    },
    {
      name: "Addi",
      logo: "/logos/addi.png" 
    },
  ];

  const team = [
    { name: "Equipo de Optometría", role: "Profesionales Certificados", credentials: "Expertos en salud visual y atención personalizada", image: "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=400" },
    { name: "Especialistas en Monturas", role: "Asesores de Imagen", credentials: "Te ayudamos a encontrar el estilo perfecto para ti", image: "https://images.unsplash.com/photo-1758206524001-56b1b1ec72cf?w=400" },
    { name: "Servicio al Cliente", role: "Atención Personalizada", credentials: "Comprometidos con tu satisfacción y comodidad", image: "https://images.unsplash.com/photo-1694892463534-dade2296283d?w=400" },
  ];

  const testimonials = [
    { name: "Cliente Satisfecho", comment: "Excelente atención y productos de calidad. Los precios son muy accesibles y el servicio es impecable.", rating: 5 },
    { name: "Cliente Frecuente", comment: "La mejor óptica de Cúcuta. Gran variedad de monturas y el examen visual es muy completo.", rating: 5 },
  ];

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

    // Procesar los embeds cuando el script se carga
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

      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
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
            Centro Óptico
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base md:text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            "Todo un mundo por ver".
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex gap-4 justify-center flex-wrap mb-12"
          >
            <button
              type="button"
              onClick={() => navigate('/citas')}
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 bg-[#EF7272] text-white shadow-lg hover:shadow-xl hover:bg-[#e35a5a] hover:scale-105"
            >
              Agendar Consulta
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('servicios');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 border-white/70 text-white hover:bg-white hover:text-[#1A628F] hover:scale-105"
            >
              Ver Servicios
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

      <section className="py-20 bg-white" id="servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Nuestros <span style={{ color: "#1A628F" }}>Servicios</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cuidado visual completo con la más alta tecnología y profesionalismo
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border-2 border-gray-100 hover:border-[#1A628F] transition-all duration-300 hover:shadow-xl group"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ backgroundColor: "rgba(26, 98, 143, 0.1)" }}
                >
                  <service.icon className="w-7 h-7" style={{ color: "#1A628F" }} />
                </div>
                <h3 className="mb-2 text-black font-semibold">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <p style={{ color: "#1A628F" }} className="text-2xl font-bold mb-2">{service.price}</p>
                {service.priceNote && (
                  <p className="text-sm text-gray-500 italic">{service.priceNote}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Nuestro <span style={{ color: "#1A628F" }}>Equipo</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profesionales certificados comprometidos con tu salud visual
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4" style={{ border: "3px solid #EF7272" }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(26, 98, 143, 0.7), transparent)" }}
                  />
                </div>
                <h3 className="mb-1 text-black">{member.name}</h3>
                <p className="mb-2" style={{ color: "#1A628F" }}>{member.role}</p>
                <p className="text-sm text-gray-600">{member.credentials}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Testimonios de <span style={{ color: "#1A628F" }}>Pacientes</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border-2 border-gray-100 hover:border-[#EF7272]/30 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-[#EF7272]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <p className="text-black">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Métodos de Pago */}
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
              Métodos de <span style={{ color: "#1A628F" }}>Pago</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Facilidades para tu compra
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border-2 border-gray-100 hover:border-[#1A628F] transition-all duration-300 hover:shadow-xl flex items-center justify-center group"
                style={{ minHeight: "130px" }}
              >
                <img
                  src={method.logo}
                  alt={method.name}
                  className="max-w-full max-h-16 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="p-6 rounded-xl border-2 border-gray-100 bg-white hover:border-[#1A628F] transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(26, 98, 143, 0.1)" }}>
                <FaCreditCard className="w-6 h-6" style={{ color: "#1A628F" }} />
              </div>
              <h4 className="font-semibold text-black mb-2">Tarjetas</h4>
              <p className="text-sm text-gray-600">Débito y crédito en tienda</p>
            </div>

            <div className="p-6 rounded-xl border-2 border-gray-100 bg-white hover:border-[#1A628F] transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(26, 98, 143, 0.1)" }}>
                <MdAttachMoney className="w-6 h-6" style={{ color: "#1A628F" }} />
              </div>
              <h4 className="font-semibold text-black mb-2">Sistecredito</h4>
              <p className="text-sm text-gray-600">30% efectivo + 70% crédito</p>
            </div>

            <div className="p-6 rounded-xl border-2 border-gray-100 bg-white hover:border-[#1A628F] transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(26, 98, 143, 0.1)" }}>
                <FaPercentage className="w-6 h-6" style={{ color: "#1A628F" }} />
              </div>
              <h4 className="font-semibold text-black mb-2">Addi</h4>
              <p className="text-sm text-gray-600">+7% del total</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Información de Contacto y Horarios */}
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
              Estamos listos para atenderte
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Horarios de Atención */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl bg-white border-2 border-gray-100 hover:border-[#1A628F] transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(26, 98, 143, 0.1)" }}>
                  <FaClock className="w-6 h-6" style={{ color: "#1A628F" }} />
                </div>
                <h3 className="text-xl font-bold text-black">Horarios de Atención</h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EF7272" }} />
                    <p className="font-semibold text-black">Tienda</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Lunes a Sábado</p>
                  <p className="text-black font-medium text-lg">8:00 AM - 6:30 PM</p>
                  <p className="text-gray-500 text-xs mt-2">(Jornada continua)</p>
                </div>

                <div className="p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1A628F" }} />
                    <p className="font-semibold text-black">Examen Visual</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Lunes a Viernes</p>
                      <p className="text-black font-medium">9:00 AM - 12:00 PM</p>
                      <p className="text-black font-medium">2:30 PM - 6:00 PM</p>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-gray-600 text-sm mb-1">Sábado</p>
                      <p className="text-black font-medium">9:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Información de Contacto */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl bg-white border-2 border-gray-100 hover:border-[#1A628F] transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(239, 114, 114, 0.1)" }}>
                  <FaMapMarkerAlt className="w-6 h-6" style={{ color: "#EF7272" }} />
                </div>
                <h3 className="text-xl font-bold text-black">Contáctanos</h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-lg border border-gray-200 hover:border-[#1A628F] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(26, 98, 143, 0.1)" }}>
                      <FaMapMarkerAlt className="w-5 h-5" style={{ color: "#1A628F" }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black mb-2">Nuestra Ubicación</p>
                      <p className="text-gray-700 text-sm font-medium mb-1">C.C. Alejandría Local 1-3-4A</p>
                      <p className="text-gray-600 text-sm">Calle 9 Entrada 1</p>
                      <p className="text-gray-600 text-sm">Cúcuta, Colombia</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg border border-gray-200 hover:border-[#1A628F] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(26, 98, 143, 0.1)" }}>
                      <FaPhone className="w-5 h-5" style={{ color: "#1A628F" }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black mb-2">WhatsApp</p>
                      <a
                        href="https://wa.me/573134095006"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#1A628F] transition-colors text-sm font-medium inline-flex items-center gap-2"
                      >
                        +57 313 409 5006
                        <span className="text-xs">→</span>
                      </a>
                      <p className="text-gray-500 text-xs mt-1">Escríbenos, estamos para ayudarte</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg border border-gray-200 hover:border-[#EF7272] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(239, 114, 114, 0.1)" }}>
                      <FaInstagram className="w-5 h-5" style={{ color: "#EF7272" }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black mb-2">Síguenos</p>
                      <a
                        href="https://www.instagram.com/divinavisioncucuta1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#EF7272] transition-colors text-sm font-medium inline-flex items-center gap-2"
                      >
                        @divinavisioncucuta1
                        <span className="text-xs">→</span>
                      </a>
                      <p className="text-gray-500 text-xs mt-1">Conoce nuestras promociones</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            <p className="text-gray-600 mt-3">Descubre nuestras monturas y promociones</p>
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
                <iframe
                  src={`${postUrl}embed/`}
                  className="border-0 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{
                    width: '100%',
                    maxWidth: '540px',
                    minHeight: '600px',
                    height: 'auto'
                  }}
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                />
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
            {/* Círculos decorativos */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "#EF7272" }}
            />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "#D4AF37" }}
            />
            <div className="relative z-10">
              <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                ¿Listo para tu <span style={{ color: "#EF7272" }}>Consulta?</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Agenda tu cita hoy y descubre la diferencia de un cuidado visual
              </p>
              <a
                href="/citas"
                className="inline-block px-8 py-4 rounded-lg transition-all duration-300 bg-[#EF7272] text-white font-semibold hover:scale-105 hover:shadow-lg"
              >
                Agendar Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default DivinaVision;