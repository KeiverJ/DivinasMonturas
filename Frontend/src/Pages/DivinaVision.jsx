
import { motion } from "framer-motion";
import { FaEye, FaGlasses, FaShieldAlt, FaStar, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function DivinaVision() {
  const services = [
    {
      icon: FaEye,
      title: "Examen Visual Completo",
      description: "Evaluación integral de tu salud visual con tecnología de vanguardia",
      price: "$89",
    },
    {
      icon: FaGlasses,
      title: "Prescripción de Lentes",
      description: "Diagnóstico preciso y recomendación personalizada de lentes correctivos",
      price: "$120",
    },
    {
      icon: FaShieldAlt,
      title: "Lentes Personalizados",
      description: "Anti-reflejo, luz azul, progresivos y más opciones premium",
      price: "Desde $150",
    },
    {
      icon: FaStar,
      title: "Lentes de Contacto",
      description: "Adaptación profesional y seguimiento para máxima comodidad",
      price: "$95",
    },
  ];

  const team = [
    {
      name: "Dr. Carlos Mendoza",
      role: "Optometrista Principal",
      credentials: "PhD en Optometría, 15 años de experiencia",
      image: "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=400",
    },
    {
      name: "Dra. María González",
      role: "Especialista en Contactología",
      credentials: "Maestría en Ciencias de la Visión",
      image: "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=400",
    },
    {
      name: "Dr. Roberto Silva",
      role: "Experto en Baja Visión",
      credentials: "Certificación Internacional en Rehabilitación Visual",
      image: "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=400",
    },
  ];

  const testimonials = [
    {
      name: "Laura Pérez",
      comment: "Excelente atención y equipamiento de primera. El Dr. Mendoza fue muy profesional y detallado.",
      rating: 5,
    },
    {
      name: "Miguel Ángel Torres",
      comment: "La mejor experiencia en un examen visual. Instalaciones modernas y personal altamente capacitado.",
      rating: 5,
    },
  ];

  const insurancePartners = [
    "Blue Cross Blue Shield",
    "VSP Vision Care",
    "EyeMed",
    "UnitedHealthcare",
    "Aetna",
    "Cigna",
  ];

  return (
    <div id="divina-vision" className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mb-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mb-6">
              <span className="text-[#D4AF37]">Centro Óptico Premium</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            DIVINA <span style={{ color: "#D4AF37" }}>VISIÓN</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 mb-8"
          >
            Tu salud visual en manos de expertos. Tecnología de vanguardia y atención personalizada.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/citas"
              className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
              style={{ backgroundColor: "#D4AF37", color: "#000" }}
            >
              Agendar Consulta
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Nuestros <span style={{ color: "#D4AF37" }}>Servicios</span>
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
                className="p-6 rounded-xl bg-white border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl group"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                >
                  <service.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="mb-2 text-black">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <p className="text-[#D4AF37] text-xl">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Nuestro <span style={{ color: "#D4AF37" }}>Equipo</span>
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
                <div className="relative overflow-hidden rounded-xl mb-4" style={{ border: "3px solid #D4AF37" }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="mb-1 text-black">{member.name}</h3>
                <p className="text-[#D4AF37] mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.credentials}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Testimonios de <span style={{ color: "#D4AF37" }}>Pacientes</span>
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
                className="p-6 rounded-xl bg-white border-2 border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-[#D4AF37]" />
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
              className="p-8 rounded-xl bg-gradient-to-br from-black to-gray-900 text-white"
            >
              <h3 className="mb-6" style={{ color: "#D4AF37" }}>
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
              className="p-8 rounded-xl bg-white border-2 border-[#D4AF37]/20"
            >
              <h3 className="mb-6 text-black">
                Información de <span style={{ color: "#D4AF37" }}>Contacto</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <FaClock className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <p className="text-black mb-1">Horarios</p>
                    <p className="text-gray-600 text-sm">Lunes - Viernes: 9AM - 7PM</p>
                    <p className="text-gray-600 text-sm">Sábado: 10AM - 4PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhone className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <p className="text-black mb-1">Teléfono</p>
                    <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaEnvelope className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <p className="text-black mb-1">Email</p>
                    <p className="text-gray-600 text-sm">vision@divinasmonturas.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <p className="text-black mb-1">Ubicación</p>
                    <p className="text-gray-600 text-sm">123 Luxury Ave, Fashion District</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-2xl bg-gradient-to-br from-black to-gray-900 text-white"
          >
            <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              ¿Listo para tu <span style={{ color: "#D4AF37" }}>Consulta?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Agenda tu cita hoy y descubre la diferencia de un cuidado visual de clase mundial
            </p>
            <Link
              to="/citas"
              className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
              style={{ backgroundColor: "#D4AF37", color: "#000" }}
            >
              Agendar Ahora
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default DivinaVision;