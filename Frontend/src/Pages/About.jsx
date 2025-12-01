import { motion } from "framer-motion";
import { Award, Heart, Star, Users, Eye, Target } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Award,
      title: "Excelencia",
      description: "Comprometidos con la más alta calidad en cada detalle",
    },
    {
      icon: Heart,
      title: "Pasión",
      description: "Amor por el diseño y la artesanía en cada montura",
    },
    {
      icon: Star,
      title: "Innovación",
      description: "Siempre a la vanguardia de las tendencias en eyewear",
    },
    {
      icon: Users,
      title: "Servicio",
      description: "Tu satisfacción es nuestra máxima prioridad",
    },
  ];

  return (
    <div id="acerca" className="min-h-screen pt-32 md:pt-36 bg-white">

      <section className="relative min-h-[300px] sm:min-h-[340px] md:min-h-[420px] flex items-center justify-center overflow-hidden mb-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1760337871482-9dd93e75fa88?w=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Nuestra <span style={{ color: "#D4AF37" }}>Historia</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Una década cuidando tu salud visual con elegancia
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Historia */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-serif text-black mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              La Esencia de <span style={{ color: "#D4AF37" }}>DIVINAS MONTURAS</span>
            </h2>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Desde 2015, bajo el nombre de <strong>Divina Visión</strong>, iniciamos nuestro compromiso con la salud visual
              en Cúcuta. Durante años, hemos sido referente en cuidado optométrico profesional, brindando exámenes
              especializados y atención personalizada a nuestra comunidad.
            </p>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              En junio de 2025, dimos un paso más en nuestra evolución con el lanzamiento de <strong>DIVINAS MONTURAS</strong>,
              nuestra boutique  dedicada exclusivamente a monturas de alta calidad y diseño sofisticado. Esta nueva
              etapa representa nuestro compromiso de ofrecer no solo salud visual, sino también estilo y elegancia.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Hoy, la familia <strong>Divina Visión & Divinas Monturas</strong> es sinónimo de calidad, profesionalismo
              y buen gusto en el mundo del eyewear en Cúcuta.
            </p>
          </motion.div>
        </section>

        {/* Misión y Visión */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                <Target className="w-8 h-8" style={{ color: "#D4AF37" }} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Nuestra <span style={{ color: "#D4AF37" }}>Misión</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Cuidar la salud visual de nuestros clientes mediante exámenes optométricos completos,
                asesoramiento personalizado y la venta de monturas y lentes de alta calidad. Nos comprometemos
                a ofrecer una experiencia única donde nuestros clientes se sientan bien, se vean bien y vean bien,
                todo ello con un alto sentido de responsabilidad social y profesionalismo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                <Eye className="w-8 h-8" style={{ color: "#D4AF37" }} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Nuestra <span style={{ color: "#D4AF37" }}>Visión</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ser la óptica más elegida en Cúcuta y la región, reconocida por nuestra excelencia en salud visual
                y por ofrecer las monturas más exclusivas y elegantes del mercado. Aspiramos a ser el referente
                donde cada cliente encuentre la combinación perfecta entre cuidado profesional de su visión y
                el estilo que refleja su personalidad única.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Nuestros <span style={{ color: "#D4AF37" }}>Valores</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Principios que guían cada decisión y cada interacción con nuestros clientes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                >
                  <value.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="mb-2 text-black font-semibold text-lg">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Estadísticas */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <div className="text-5xl font-bold mb-2" style={{ color: "#D4AF37" }}>
                10+
              </div>
              <p className="text-gray-600 font-medium">Años de Experiencia</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <div className="text-5xl font-bold mb-2" style={{ color: "#D4AF37" }}>
                5K+
              </div>
              <p className="text-gray-600 font-medium">Clientes Satisfechos</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <div className="text-5xl font-bold mb-2" style={{ color: "#D4AF37" }}>
                100%
              </div>
              <p className="text-gray-600 font-medium">Compromiso con la Calidad</p>
            </div>
          </motion.div>
        </section>

        {/* CTA Final */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-2xl text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #000000, #1a1a1a)" }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "#D4AF37" }}
            />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "#D4AF37" }}
            />
            <div className="relative z-10">
              <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Únete a la <span style={{ color: "#D4AF37" }}>Familia</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Descubre por qué miles de clientes en Cúcuta confían en nosotros para su salud visual y estilo
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/catalogo"
                  className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
                  style={{ backgroundColor: "#D4AF37", color: "#000" }}
                >
                  Explorar Monturas
                </a>
                <a
                  href="/citas"
                  className="inline-block px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Agendar Cita
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default About;