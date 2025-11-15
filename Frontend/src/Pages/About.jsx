import { motion } from "framer-motion";
import { FaRegLightbulb, FaRegHandshake, FaRegEye, FaRegGem } from "react-icons/fa";

const values = [
  {
    icon: <FaRegLightbulb className="text-blue-500 text-3xl mb-2" />, 
    title: "Innovación constante",
    desc: "Buscamos siempre nuevas formas de mejorar y ofrecer lo mejor a nuestros clientes."
  },
  {
    icon: <FaRegHandshake className="text-blue-500 text-3xl mb-2" />, 
    title: "Atención personalizada",
    desc: "Cada cliente es único, por eso brindamos un trato cercano y soluciones a medida."
  },
  {
    icon: <FaRegEye className="text-blue-500 text-3xl mb-2" />, 
    title: "Compromiso con la calidad",
    desc: "Seleccionamos cuidadosamente cada producto para garantizar la mejor experiencia visual."
  },
  {
    icon: <FaRegGem className="text-blue-500 text-3xl mb-2" />, 
    title: "Transparencia y confianza",
    desc: "Actuamos con honestidad y construimos relaciones duraderas basadas en la confianza."
  },
];

function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Sobre nosotros
      </motion.h2>

      <motion.section 
        className="mb-10"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-blue-600 mb-2">¿Quiénes somos?</h3>
        <p className="text-gray-700 leading-relaxed">
          En <span className="font-semibold">Divinas Monturas</span>, nos dedicamos a ofrecer las mejores monturas de lentes para cada estilo y necesidad. Combinamos diseño, calidad y comodidad para brindar una experiencia visual superior a nuestros clientes.
        </p>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.section
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Misión</h3>
          <p className="text-gray-700 leading-relaxed">
            Brindar productos ópticos de alta calidad que se adapten al estilo de vida de cada persona, garantizando confianza, bienestar visual y satisfacción a nuestros clientes.
          </p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Visión</h3>
          <p className="text-gray-700 leading-relaxed">
            Ser una empresa líder en el mercado óptico nacional, reconocida por la innovación, la atención personalizada y la calidad de nuestros productos.
          </p>
        </motion.section>
      </div>

      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-blue-600 mb-6 text-center">Nuestros valores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <div key={val.title} className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              {val.icon}
              <span className="font-semibold text-gray-800 mb-1 text-center">{val.title}</span>
              <p className="text-gray-600 text-sm text-center">{val.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default About;