import { motion } from "framer-motion";
import { FaBoxOpen, FaTruck, FaCreditCard, FaHeadphones, FaChartLine, FaAward, FaCheckCircle } from "react-icons/fa";

function Mayoristas() {
  const benefits = [
    {
      icon: FaChartLine,
      title: "Descuentos Escalonados",
      description: "15% a 40% de descuento según volumen de compra",
    },
    {
      icon: FaBoxOpen,
      title: "Catálogo Exclusivo",
      description: "Acceso a colecciones premium y lanzamientos anticipados",
    },
    {
      icon: FaTruck,
      title: "Envío Prioritario",
      description: "Despachos rápidos y seguimiento en tiempo real",
    },
    {
      icon: FaCreditCard,
      title: "Términos Flexibles",
      description: "Pagos a 30, 60 o 90 días para mayoristas aprobados",
    },
    {
      icon: FaHeadphones,
      title: "Atención Personalizada",
      description: "Ejecutivo de cuenta exclusivo y atención personalizada",
    },
    {
      icon: FaAward,
      title: "Marketing Gratuito",
      description: "Material promocional y soporte de marca sin costo",
    },
  ];

  const discountTiers = [
    { range: "10-49 unidades", discount: "15%", color: "#D4AF37" },
    { range: "50-99 unidades", discount: "25%", color: "#D4AF37" },
    { range: "100-199 unidades", discount: "35%", color: "#D4AF37" },
    { range: "200+ unidades", discount: "40%", color: "#D4AF37" },
  ];

  const requirements = [
    "Registro comercial válido (RUT/NIT)",
    "Tienda física o comercio electrónico establecido",
    "Pedido mínimo inicial de 10 unidades",
    "Referencias comerciales verificables",
  ];

  const steps = [
    {
      number: "01",
      title: "Registro",
      description: "Completa el formulario con información de tu negocio",
    },
    {
      number: "02",
      title: "Validación",
      description: "Revisamos tu solicitud en 24-48 horas",
    },
    {
      number: "03",
      title: "Aprobación",
      description: "Recibe credenciales de acceso a plataforma mayorista",
    },
    {
      number: "04",
      title: "Comienza",
      description: "Accede a precios especiales y haz tu primer pedido",
    },
  ];

  return (
    <div id="mayoristas" className="min-h-screen pt-32 md:pt-36 pb-20">
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden mb-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1689152496131-9cecc95cde25?w=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Programa de <span style={{ color: "#D4AF37" }}>Mayoristas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Únete a nuestra red exclusiva de distribuidores y haz crecer tu negocio con las mejores monturas de lujo
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            href="#formulario-mayorista"
            className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
            style={{ backgroundColor: "#D4AF37", color: "#000" }}
          >
            Solicitar Acceso Mayorista
          </motion.a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Beneficios <span style={{ color: "#D4AF37" }}>Exclusivos</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Accede a ventajas diseñadas para impulsar tu negocio al siguiente nivel
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
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
                  <benefit.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="mb-2 text-black">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Estructura de <span style={{ color: "#D4AF37" }}>Descuentos</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mientras más compras, más ahorras. Nuestros descuentos escalonados están diseñados para tu crecimiento
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden group"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: tier.color }}
                />
                <div className="relative z-10">
                  <p className="text-sm text-gray-400 mb-2">Volumen</p>
                  <h3 className="mb-4">{tier.range}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl" style={{ color: tier.color }}>
                      {tier.discount}
                    </span>
                    <span className="text-xl text-gray-400">descuento</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Requisitos de <span style={{ color: "#D4AF37" }}>Elegibilidad</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-white rounded-xl p-8 border-2 border-[#D4AF37]/20"
          >
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-4">
                  <FaCheckCircle className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="text-gray-700">{requirement}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Proceso de <span style={{ color: "#D4AF37" }}>Registro</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cuatro simples pasos para convertirte en distribuidor autorizado
            </p>
          </motion.div>
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B4941F] text-black mb-4 shadow-lg">
                    <span className="text-2xl">{step.number}</span>
                  </div>
                  <h3 className="mb-2 text-black">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section id="formulario-mayorista" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-2xl bg-gradient-to-br from-black to-gray-900 text-white"
          >
            <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              ¿Listo para <span style={{ color: "#D4AF37" }}>Empezar?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Completa tu solicitud ahora y únete a la familia de distribuidores DIVINAS MONTURAS
            </p>
            <a
              href="#formulario"
              className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
              style={{ backgroundColor: "#D4AF37", color: "#000" }}
            >
              Completar Formulario de Solicitud
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Mayoristas;