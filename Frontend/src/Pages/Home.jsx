import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaQuoteLeft } from "react-icons/fa";
import ProductCard from "../Components/ProductCard";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Aviator Classic Gold",
      brand: "DIVINAS",
      price: 299,
      image: "https://images.unsplash.com/photo-1762706334838-ea8425b43116?w=800",
      category: "Sunglasses",
    },
    {
      id: 2,
      name: "Elegance Frame",
      brand: "DIVINAS",
      price: 349,
      image: "https://images.unsplash.com/photo-1671960610018-f2fdebbe5b47?w=800",
      category: "Optical",
    },
    {
      id: 3,
      name: "Luxury Cat Eye",
      brand: "DIVINAS",
      price: 399,
      image: "https://images.unsplash.com/photo-1760337871482-9dd93e75fa88?w=800",
      category: "Sunglasses",
    },
  ];

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

  const instagramImages = [
    "https://images.unsplash.com/photo-1762706334838-ea8425b43116?w=400",
    "https://images.unsplash.com/photo-1671960610018-f2fdebbe5b47?w=400",
    "https://images.unsplash.com/photo-1760337871482-9dd93e75fa88?w=400",
    "https://images.unsplash.com/photo-1682664175900-7771b38e1585?w=400",
    "https://images.unsplash.com/photo-1689152496131-9cecc95cde25?w=400",
    "https://images.unsplash.com/photo-1631507623112-0092cef9c70d?w=400",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1671960610018-f2fdebbe5b47?w=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
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
            Donde la elegancia se encuentra con la visión. Descubre nuestra colección exclusiva de monturas de lujo.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#catalogo"
              className="px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
              style={{ backgroundColor: "#D4AF37", color: "#000" }}
            >
              Explorar Catálogo
            </a>
            <a
              href="#divina-vision"
              className="px-8 py-4 rounded-lg border-2 border-white text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
            >
              Agendar Cita
            </a>
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
              Descubre nuestras monturas más exclusivas, diseñadas para quienes aprecian la verdadera elegancia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#catalogo"
              className="inline-block px-8 py-4 rounded-lg border-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
              style={{ borderColor: "#D4AF37", color: "#D4AF37" }}
            >
              Ver Colección Completa
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Lo Que Dicen Nuestros <span style={{ color: "#D4AF37" }}>Clientes</span>
            </h2>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"}`}
                >
                  <div className="text-center">
                    <FaQuoteLeft className="w-12 h-12 mx-auto mb-6" style={{ color: "#D4AF37" }} />
                    <p className="text-xl mb-6 text-gray-300">{testimonial.comment}</p>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-5 h-5 text-[#D4AF37]" />
                      ))}
                    </div>
                    <h4 className="mb-1">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-8 bg-[#D4AF37]" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-black mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Síguenos en <span style={{ color: "#D4AF37" }}>Instagram</span>
            </h2>
            <p className="text-gray-600">@divinasmonturas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {instagramImages.map((image, index) => (
              <a
                key={index}
                href="#"
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <img
                  src={image}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white">Ver en Instagram</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
