import { motion } from "framer-motion";
import { FaEye, FaGlasses, FaShieldAlt, FaStar, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";

import logoDV from "../../public/logoDV.jpg";

function DivinaVision() {
  const services = [
    { icon: FaEye, title: "Examen Visual Completo", description: "Evaluación integral de tu salud visual con tecnología de vanguardia", price: "$89" },
    { icon: FaGlasses, title: "Prescripción de Lentes", description: "Diagnóstico preciso y recomendación personalizada de lentes correctivos", price: "$120" },
    { icon: FaShieldAlt, title: "Lentes Personalizados", description: "Anti-reflejo, luz azul, progresivos y más opciones premium", price: "Desde $150" },
    { icon: FaStar, title: "Lentes de Contacto", description: "Adaptación profesional y seguimiento para máxima comodidad", price: "$95" },
  ];
  const team = [
    { name: "Dr. Carlos Mendoza", role: "Optometrista Principal", credentials: "PhD en Optometría, 15 años de experiencia", image: "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=400" },
    { name: "Dra. María González", role: "Especialista en Contactología", credentials: "Maestría en Ciencias de la Visión", image: "https://images.unsplash.com/photo-1758206524001-56b1b1ec72cf?w=400" },
    { name: "Dr. Roberto Silva", role: "Experto en Baja Visión", credentials: "Certificación Internacional en Rehabilitación Visual", image: "https://images.unsplash.com/photo-1694892463534-dade2296283d?w=400" },
  ];
  const testimonials = [
    { name: "Laura Pérez", comment: "Excelente atención y equipamiento de primera. El Dr. Mendoza fue muy profesional y detallado.", rating: 5 },
    { name: "Miguel Ángel Torres", comment: "La mejor experiencia en un examen visual. Instalaciones modernas y personal altamente capacitado.", rating: 5 },
  ];
  const insurancePartners = ["Blue Cross Blue Shield", "VSP Vision Care", "EyeMed", "UnitedHealthcare", "Aetna", "Cigna"];
  const instagramPosts = [
    "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=400",
    "https://images.unsplash.com/photo-1758206524001-56b1b1ec72cf?w=400",
    "https://images.unsplash.com/photo-1694892463534-dade2296283d?w=400",
    "https://images.unsplash.com/photo-1689152496131-9cecc95cde25?w=400",
    "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=400",
    "https://images.unsplash.com/photo-1758206524001-56b1b1ec72cf?w=400",
  ];

  return (
    <div id="divina-vision" className="min-h-screen pt-24 bg-white">
      {/* Hero Section Mejorado */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex items-center justify-center overflow-hidden mb-20 pt-0">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(26, 98, 143, 0.95), rgba(13, 59, 92, 0.92))"
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl flex flex-col items-center py-12">
          {/* Logo con diseño premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mb-6 flex justify-center w-full"
          >
            <div
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center bg-white rounded-full overflow-hidden border-4 shadow-2xl relative"
              style={{
                borderColor: "#EF7272",
                boxShadow: "0 0 50px rgba(239, 114, 114, 0.5), 0 0 100px rgba(26, 98, 143, 0.3), 0 10px 40px rgba(0, 0, 0, 0.3)"
              }}
            >
              <img src={logoDV} alt="Divina Visión" className="w-full h-full object-cover" style={{ objectPosition: 'center' }} />
              {/* Glow ring animado */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: "radial-gradient(circle, transparent 60%, rgba(239, 114, 114, 0.2) 100%)"
                }}
              />
            </div>
          </motion.div>

          {/* Título principal con mejor jerarquía */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
          >
            DIVINA <span className="text-[#EF7272]">VISIÓN</span>
          </motion.h1>

          {/* Badge de categoría elegante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-7"
          >
            <div
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#EF7272] bg-white/10 backdrop-blur-md"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF7272] animate-pulse"></div>
              <span className="text-white font-semibold tracking-wide text-base">Centro Óptico Premium</span>
            </div>
          </motion.div>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base sm:text-lg md:text-xl text-white/95 mb-9 max-w-2xl leading-relaxed px-4"
          >
            Tu salud visual en manos de expertos. Tecnología de vanguardia y atención personalizada.
          </motion.p>

          {/* Botones CTA igual que About/Majoristas/Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex gap-4 justify-center flex-wrap mb-12"
          >
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('citas');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 bg-[#EF7272] text-white shadow-md hover:shadow-xl hover:bg-[#e35a5a] focus:outline-none focus:ring-2 focus:ring-[#EF7272] focus:ring-offset-2"
            >
              Agendar Consulta
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('servicios');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 border-white/60 text-white bg-white/10 hover:bg-white/20 hover:text-[#EF7272] hover:border-[#EF7272] focus:outline-none focus:ring-2 focus:ring-[#EF7272] focus:ring-offset-2"
            >
              Ver Servicios
            </button>
          </motion.div>

          {/* Badge de alianza premium con separadores */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col items-center justify-center w-full max-w-md"
          >
            {/* Separador superior */}
            <div className="flex items-center gap-3 mb-4 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/30 to-white/30"></div>
            </div>

            {/* Texto de alianza */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white text-xs sm:text-sm tracking-wide uppercase font-semibold">En alianza con</span>
            </div>

            {/* Nombre de la alianza con estilo body */}
            <div
              className="text-2xl sm:text-3xl md:text-4xl tracking-wide px-8 py-3 rounded-xl bg-white/10 text-[#D4AF37] font-bold"
            >
              DIVINAS MONTURAS
            </div>

            {/* Separador inferior */}
            <div className="flex items-center gap-3 mt-4 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/30 to-white/30"></div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Servicios */}
        <section className="mb-20" id="servicios">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h3 className="mb-2 text-black">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <p style={{ color: "#1A628F" }} className="text-xl">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Equipo */}
        <section className="mb-20">
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
        </section>

        {/* Testimonios */}
        <section className="mb-20">
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
        </section>

        {/* Insurance & Info */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Insurance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl text-white"
              style={{ background: "linear-gradient(135deg, #1A628F, #0D3B5C)" }}
            >
              <h3 className="mb-6" style={{ color: "#EF7272" }}>
                Seguros Aceptados
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {insurancePartners.map((insurance, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-center text-sm"
                  >
                    {insurance}
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl bg-white border-2"
              style={{ borderColor: "rgba(26, 98, 143, 0.2)" }}
            >
              <h3 className="mb-6 text-black">
                Información de <span style={{ color: "#1A628F" }}>Contacto</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <FaClock className="w-6 h-6 shrink-0 mt-1" style={{ color: "#1A628F" }} />
                  <div>
                    <p className="text-black mb-1">Horarios</p>
                    <p className="text-gray-600 text-sm">Lunes - Viernes: 9AM - 7PM</p>
                    <p className="text-gray-600 text-sm">Sábado: 10AM - 4PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhone className="w-6 h-6 shrink-0 mt-1" style={{ color: "#1A628F" }} />
                  <div>
                    <p className="text-black mb-1">Teléfono</p>
                    <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaEnvelope className="w-6 h-6 shrink-0 mt-1" style={{ color: "#1A628F" }} />
                  <div>
                    <p className="text-black mb-1">Email</p>
                    <p className="text-gray-600 text-sm">vision@divinasmonturas.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="w-6 h-6 shrink-0 mt-1" style={{ color: "#1A628F" }} />
                  <div>
                    <p className="text-black mb-1">Ubicación</p>
                    <p className="text-gray-600 text-sm">123 Luxury Ave, Fashion District</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Instagram Section para Divina Visión */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Síguenos en <span style={{ color: "#1A628F" }}>Instagram</span>
            </h2>
            <a
              href="https://www.instagram.com/divinavisioncucuta1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-colors"
              style={{ color: "#1A628F" }}
            >
              <FaInstagram className="w-5 h-5" />
              <span>@divinavisioncucuta1</span>
            </a>
            <p className="text-gray-600 mt-2">Descubre consejos de salud visual y más</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {instagramPosts.map((image, index) => (
              <motion.a
                key={index}
                href="https://www.instagram.com/divinavisioncucuta1/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg group border-2 border-transparent hover:border-[#EF7272] transition-all duration-300"
              >
                <img
                  src={image}
                  alt={`Divina Visión Instagram ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                  style={{ background: "linear-gradient(to top, rgba(26, 98, 143, 0.85), transparent)" }}
                >
                  <div className="flex items-center gap-2 text-white">
                    <FaInstagram className="w-5 h-5" />
                    <span>Ver en Instagram</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/divinavisioncucuta1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-lg border-2 transition-all duration-300 hover:scale-105"
              style={{ borderColor: "#1A628F", color: "#1A628F", boxShadow: "0 0 0 rgba(26, 98, 143, 0)" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(26, 98, 143, 0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 0 rgba(26, 98, 143, 0)"; }}
            >
              Seguir en Instagram
            </a>
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center">
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
                Agenda tu cita hoy y descubre la diferencia de un cuidado visual de clase mundial
              </p>
              <a
                href="#citas"
                className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,114,114,0.6)]"
                style={{ backgroundColor: "#EF7272", color: "#fff" }}
              >
                Agendar Ahora
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default DivinaVision;