import { motion } from "framer-motion";
import { Award, Heart, Star, Users } from "lucide-react";

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

  const timeline = [
    { year: "2015", event: "Fundación de DIVINAS MONTURAS" },
    { year: "2017", event: "Apertura de primera boutique flagship" },
    { year: "2019", event: "Lanzamiento de DIVINA VISIÓN" },
    { year: "2021", event: "Programa de Mayoristas establecido" },
    { year: "2023", event: "Expansión internacional" },
    { year: "2025", event: "10 años de excelencia y crecimiento" },
  ];

  return (
    <div id="acerca" className="min-h-screen pt-24 bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex items-center justify-center overflow-hidden mb-20">
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
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />
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
            Una década de excelencia en eyewear de lujo
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Story */}
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
            <p className="text-gray-700 mb-4">
              Desde nuestra fundación en 2015, DIVINAS MONTURAS ha sido sinónimo de elegancia, calidad y
              sofisticación en el mundo del eyewear de lujo. Cada montura que creamos es una obra de arte,
              meticulosamente diseñada para realzar la belleza única de quien la porta.
            </p>
            <p className="text-gray-700 mb-4">
              Nuestra pasión por la excelencia nos ha llevado a establecer no solo una boutique de referencia
              en monturas premium, sino también DIVINA VISIÓN, nuestro centro de cuidado visual de vanguardia,
              y un programa de mayoristas que permite a distribuidores selectos compartir nuestra visión de lujo
              accesible.
            </p>
            <p className="text-gray-700">
              Hoy, DIVINAS MONTURAS es más que una marca: es un estilo de vida, una declaración de elegancia y
              buen gusto que trasciende tendencias y perdura en el tiempo.
            </p>
          </motion.div>
        </section>

        {/* Values */}
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                >
                  <value.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="mb-2 text-black">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Nuestra <span style={{ color: "#D4AF37" }}>Trayectoria</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-8 mb-8 last:mb-0"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#D4AF37" }}
                >
                  <span className="text-2xl text-black">{item.year}</span>
                </div>
                <div className="flex-1 p-6 rounded-xl bg-white border-2 border-gray-100">
                  <p className="text-gray-700">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl mb-2" style={{ color: "#D4AF37" }}>
                10+
              </div>
              <p className="text-gray-600">Años de Experiencia</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2" style={{ color: "#D4AF37" }}>
                50K+
              </div>
              <p className="text-gray-600">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2" style={{ color: "#D4AF37" }}>
                500+
              </div>
              <p className="text-gray-600">Mayoristas Activos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2" style={{ color: "#D4AF37" }}>
                100%
              </div>
              <p className="text-gray-600">Satisfacción Garantizada</p>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-2xl bg-linear-to-br from-black to-gray-900 text-white"
          >
            <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Únete a la <span style={{ color: "#D4AF37" }}>Familia</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Descubre por qué miles de clientes confían en DIVINAS MONTURAS para su estilo visual
            </p>
            <a
              href="#catalogo"
              className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
              style={{ backgroundColor: "#D4AF37", color: "#000" }}
            >
              Explorar Colección
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default About;