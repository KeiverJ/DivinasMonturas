import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaInstagram } from "react-icons/fa";

function Mayoristas() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    nit: "",
    redes: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.correo || !formData.telefono || !formData.direccion) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Aquí iría la integración con el servicio de correo
      // Por ahora simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 1500));

      // En producción, aquí se enviaría el correo con los datos del formulario
      console.log('Datos del mayorista:', formData);

      setIsSubmitted(true);
    } catch (err) {
      setError('Error al enviar la solicitud. Intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const requirements = [
    "Nombre del negocio o persona",
    "Correo electrónico de contacto",
    "Teléfono de contacto",
    "Dirección física del negocio",
    "NIT (opcional, si lo tiene)",
    "Redes sociales del negocio",
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

  if (isSubmitted) {
    return (
      <div id="mayoristas" className="min-h-screen pt-32 md:pt-36 pb-20 bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-6"
          >
            <FaCheckCircle className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="font-serif text-black mb-4 text-3xl md:text-4xl">
            ¡Solicitud <span style={{ color: "#D4AF37" }}>Enviada!</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Tu solicitud de registro mayorista ha sido recibida exitosamente. Nos pondremos en contacto contigo en las próximas 24-48 horas.
          </p>

          <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-[#D4AF37]/20 mb-6 sm:mb-8 text-left">
            <h3 className="mb-4 text-black font-semibold text-lg">Datos Recibidos</h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-gray-600 text-sm sm:text-base">Nombre:</span>
                <span className="text-black text-sm sm:text-base font-medium">{formData.nombre}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-gray-600 text-sm sm:text-base">Correo:</span>
                <span className="text-black text-sm sm:text-base font-medium break-all">{formData.correo}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-gray-600 text-sm sm:text-base">Teléfono:</span>
                <span className="text-black text-sm sm:text-base font-medium">{formData.telefono}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F5DC]/30 rounded-lg p-6 mb-8">
            <h4 className="mb-3 text-black font-semibold">Próximos Pasos</h4>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li>• Revisaremos tu información y documentación</li>
              <li>• Te contactaremos para validar los datos</li>
              <li>• Una vez aprobado, recibirás acceso a nuestra plataforma mayorista</li>
              <li>• Podrás comenzar a realizar pedidos con precios especiales</li>
            </ul>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                nombre: "",
                correo: "",
                telefono: "",
                direccion: "",
                nit: "",
                redes: ""
              });
            }}
            className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 font-semibold"
            style={{ backgroundColor: "#D4AF37", color: "#000" }}
          >
            Nueva Solicitud
          </button>
        </motion.div>
      </div>
    );
  }

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
            className="font-serif text-white mb-4 sm:mb-6 px-4"
            style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
          >
            Programa de <span style={{ color: "#D4AF37" }}>Mayoristas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 px-4"
          >
            Únete a nuestra red exclusiva de distribuidores y haz crecer tu negocio con las mejores monturas de lujo
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            href="#formulario-mayorista"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
            style={{ backgroundColor: "#D4AF37", color: "#000" }}
          >
            Solicitar Acceso Mayorista
          </motion.a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Información <span style={{ color: "#D4AF37" }}>Requerida</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Para procesar tu solicitud necesitamos la siguiente información
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-white rounded-xl p-6 sm:p-8 border-2 border-[#D4AF37]/20"
          >
            <div className="space-y-3 sm:space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm sm:text-base">{requirement}</p>
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
            <h2 className="font-serif text-black mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Proceso de <span style={{ color: "#D4AF37" }}>Registro</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Cuatro simples pasos para convertirte en distribuidor autorizado
            </p>
          </motion.div>
          <div className="relative">
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
                  <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B4941F] text-black mb-3 sm:mb-4 shadow-lg">
                    <span className="text-xl sm:text-2xl font-bold">{step.number}</span>
                  </div>
                  <h3 className="mb-2 text-black font-semibold text-base sm:text-lg">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="formulario-mayorista" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Formulario de <span style={{ color: "#D4AF37" }}>Solicitud</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Completa tus datos y nos pondremos en contacto contigo
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-gray-100">
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <FaBuilding className="w-4 h-4 text-[#D4AF37]" />
                    Nombre del Negocio o Persona *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Óptica El Sol"
                  />
                </div>

                <div>
                  <label htmlFor="correo" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <FaEnvelope className="w-4 h-4 text-[#D4AF37]" />
                    Correo Electrónico *
                  </label>
                  <input
                    id="correo"
                    type="email"
                    value={formData.correo}
                    onChange={e => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="contacto@opticaelsol.com"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <FaPhone className="w-4 h-4 text-[#D4AF37]" />
                    Teléfono *
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="+57 (310) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="direccion" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <FaMapMarkerAlt className="w-4 h-4 text-[#D4AF37]" />
                    Dirección *
                  </label>
                  <input
                    id="direccion"
                    type="text"
                    value={formData.direccion}
                    onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Calle 12 #34-56, Cúcuta"
                  />
                </div>

                <div>
                  <label htmlFor="nit" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <FaIdCard className="w-4 h-4 text-[#D4AF37]" />
                    NIT (Opcional)
                  </label>
                  <input
                    id="nit"
                    type="text"
                    value={formData.nit}
                    onChange={e => setFormData({ ...formData, nit: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="900123456-7"
                  />
                </div>

                <div>
                  <label htmlFor="redes" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <FaInstagram className="w-4 h-4 text-[#D4AF37]" />
                    Redes Sociales
                  </label>
                  <input
                    id="redes"
                    type="text"
                    value={formData.redes}
                    onChange={e => setFormData({ ...formData, redes: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="@opticaelsol"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  style={{ backgroundColor: "#D4AF37", color: "#000" }}
                >
                  {loading ? "Enviando..." : "Enviar Solicitud"}
                </button>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Al enviar tu solicitud, aceptas que nos pongamos en contacto contigo para validar tu información.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Mayoristas;