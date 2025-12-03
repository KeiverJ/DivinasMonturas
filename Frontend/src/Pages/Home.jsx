import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaGlasses, FaShieldAlt, FaCreditCard, FaPercentage, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import ProductCard from "../Components/ProductCard";
import { productService } from "../services/productService";

export default function Home() {
  const [setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadRandomProducts();
  }, []);

  const loadRandomProducts = async () => {
    try {
      const response = await productService.getProducts({ disponible: true }, 1, 6);
      // Mezclar aleatoriamente y tomar solo 3
      const shuffled = response.data.sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 3));
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Cliente VIP",
      comment:
        "La calidad y elegancia de las monturas es incomparable. ¡Definitivamente el mejor lugar para encontrar gafas de lujo!",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Mayorista",
      comment:
        "El programa de mayoristas es excepcional. Excelente servicio, productos premium y márgenes competitivos.",
      rating: 5,
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Cliente Divina Visión",
      comment:
        "El servicio de optometría es de primera clase. Personal profesional y una experiencia increíble.",
      rating: 5,
    },
  ];

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
      logo: "https://res.cloudinary.com/du2ulpgqh/image/upload/v1764725058/divinasmonturas/logos/vp43jrsciwm45isr04t3.jpg"
    },
    {
      name: "Bancolombia",
      logo: "https://res.cloudinary.com/du2ulpgqh/image/upload/v1764725056/divinasmonturas/logos/yxsyr50tdhui8ac9d50d.jpg"
    },
    {
      name: "Daviplata",
      logo: "https://res.cloudinary.com/du2ulpgqh/image/upload/v1764725057/divinasmonturas/logos/bjlkreveycby3bchzeba.png"
    },
    {
      name: "Sistecredito",
      logo: "https://res.cloudinary.com/du2ulpgqh/image/upload/v1764725059/divinasmonturas/logos/uvd6wggrxjpnqg4ozlkn.png"
    },
    {
      name: "Addi",
      logo: "https://res.cloudinary.com/du2ulpgqh/image/upload/v1764725056/divinasmonturas/logos/h0u6hv14l6mvi0rqxbfw.png"
    },
  ];

  const instagramPosts = [
    "https://www.instagram.com/p/DPwKeS2juWM/",
    "https://www.instagram.com/reel/DNWDsezu2Gv/",
    "https://www.instagram.com/p/DQ9j8vKlXJD/",
    "https://www.instagram.com/p/DRDd4Q4jiCr/",
    "https://www.instagram.com/reel/DPRQXvgD1kh/",
    "https://www.instagram.com/p/DQwpXzaDsp7/",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (globalThis.instgrm) {
        globalThis.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('/DivinasMonturasLocal.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative z-20 text-center px-4 animate-fade-in-up">
          <h1
            className="font-serif text-white mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            DIVINAS <span style={{ color: "#D4AF37" }}>MONTURAS</span>
          </h1>
          <p
            className="text-white/90 mb-8 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
          >
            Donde la elegancia se encuentra con la visión. Descubre nuestra colección de monturas.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/catalogo"
              className="px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
              style={{ backgroundColor: "#D4AF37", color: "#000" }}
            >
              Explorar Catálogo
            </Link>
            <Link
              to="/citas"
              className="px-8 py-4 rounded-lg border-2 border-white text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
            >
              Agendar Cita
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#D4AF37] flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-[#D4AF37]" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5DC]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Colección <span style={{ color: "#D4AF37" }}>Destacada</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestras monturas, diseñadas para quienes aprecian la verdadera elegancia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  name={product.nombre}
                  brand={product.marca || 'DIVINAS'}
                  image={product.imagenes?.principal || 'https://via.placeholder.com/400x400?text=Sin+imagen'}
                  category={product.categoria}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-600">
                Cargando monturas destacadas...
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/catalogo"
              className="inline-block px-8 py-4 rounded-lg border-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
              style={{ borderColor: "#D4AF37", color: "#D4AF37" }}
            >
              Ver Colección Completa
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios de Optometría */}
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
              Servicios de <span style={{ color: "#D4AF37" }}>Optometría</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cuidado visual completo con la más alta tecnología y profesionalismo
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                >
                  <service.icon className="w-6 h-6" style={{ color: "#D4AF37" }} />
                </div>
                <h3 className="text-lg mb-2 text-black font-semibold">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <div className="pt-4 border-t border-gray-100">
                  <p style={{ color: "#D4AF37" }} className="text-2xl font-bold mb-1">{service.price}</p>
                  {service.priceNote && (
                    <p className="text-xs text-gray-500">{service.priceNote}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/citas"
              className="inline-block px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
              style={{ backgroundColor: "#D4AF37", color: "#000" }}
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      </section>

      {/* Métodos de Pago */}
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
              Métodos de <span style={{ color: "#D4AF37" }}>Pago</span>
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
                className="p-6 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center group border border-gray-100"
                style={{ minHeight: "120px" }}
              >
                <img
                  src={method.logo}
                  alt={method.name}
                  className="max-w-full max-h-20 object-contain group-hover:scale-105 transition-transform duration-300"
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
            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                <FaCreditCard className="w-6 h-6" style={{ color: "#D4AF37" }} />
              </div>
              <h4 className="font-semibold text-black mb-2">Tarjetas</h4>
              <p className="text-sm text-gray-600">Débito y crédito en tienda</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                <MdAttachMoney className="w-6 h-6" style={{ color: "#D4AF37" }} />
              </div>
              <h4 className="font-semibold text-black mb-2">Sistecredito</h4>
              <p className="text-sm text-gray-600">30% efectivo + 70% crédito</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                <FaPercentage className="w-6 h-6" style={{ color: "#D4AF37" }} />
              </div>
              <h4 className="font-semibold text-black mb-2">Addi</h4>
              <p className="text-sm text-gray-600">+7% del total</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Horarios y Contacto */}
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
              Visítanos en <span style={{ color: "#D4AF37" }}>Cúcuta</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos listos para atenderte
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                  <FaClock className="w-6 h-6" style={{ color: "#D4AF37" }} />
                </div>
                <h3 className="text-xl font-bold text-black">Horarios de Atención</h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#D4AF37" }} />
                    <p className="font-semibold text-black">Tienda</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Lunes a Sábado</p>
                  <p className="text-black font-medium text-lg">8:00 AM - 6:30 PM</p>
                  <p className="text-gray-500 text-xs mt-2">(Jornada continua)</p>
                </div>

                <div className="p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#D4AF37" }} />
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                  <FaMapMarkerAlt className="w-6 h-6" style={{ color: "#D4AF37" }} />
                </div>
                <h3 className="text-xl font-bold text-black">Contáctanos</h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-lg border border-gray-200 hover:border-[#D4AF37] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                      <FaMapMarkerAlt className="w-5 h-5" style={{ color: "#D4AF37" }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black mb-2">Nuestra Ubicación</p>
                      <p className="text-gray-700 text-sm font-medium mb-1">C.C. Alejandría Entrada 1</p>
                      <p className="text-gray-600 text-sm">Local 1-309, Cúcuta</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg border border-gray-200 hover:border-[#D4AF37] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                      <FaPhone className="w-5 h-5" style={{ color: "#D4AF37" }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black mb-2">WhatsApp</p>
                      <a
                        href="https://wa.me/573151449003"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#D4AF37] transition-colors text-sm font-medium inline-flex items-center gap-2"
                      >
                        +57 315 144 9003&nbsp;
                        <span className="text-xs">→</span>
                      </a>
                      <p className="text-gray-500 text-xs mt-1">Escríbenos, estamos para ayudarte</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg border border-gray-200 hover:border-[#D4AF37] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}>
                      <FaEnvelope className="w-5 h-5" style={{ color: "#D4AF37" }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black mb-2">Email</p>
                      <a
                        href="mailto:divinavision@gmail.com"
                        className="text-gray-700 hover:text-[#D4AF37] transition-colors text-sm font-medium"
                      >
                        divinavision@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5DC]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Síguenos en <span style={{ color: "#D4AF37" }}>Instagram</span>
            </h2>
            <a
              href="https://www.instagram.com/divinasmonturas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#D4AF37] transition-colors duration-300 text-lg font-medium"
            >
              @divinasmonturas
            </a>
            <p className="text-gray-600 mt-3">Descubre nuestra colección exclusiva</p>
          </div>
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
                    allowtransparency="true"
                    allow="encrypted-media"
                    title={`Instagram Post ${index + 1}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/divinasmonturas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#D4AF37", color: "#000" }}
            >
              Seguir en Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
