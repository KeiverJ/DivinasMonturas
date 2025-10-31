import ProductCard from '../Components/ProductCard.jsx';

function Home() {
  const productosDestacados = [
    { id: 1, name: 'Montura Clásica Negra', price: 120000, image: 'https://images.unsplash.com/photo-1516641395110-499a5b16cba0?w=500' },
    { id: 2, name: 'Montura Transparente', price: 135000, image: 'https://images.unsplash.com/photo-1591076482161-42ce6c3f3d2a?w=500' },
    { id: 3, name: 'Montura Vintage Marrón', price: 110000, image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=500' },
  ]

  return (
    <div>
      {/* Banner */}
      <section className="relative bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1582571352032-448f7928eca2?w=1600"
          alt="Banner"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra tu estilo con OptiVision</h1>
          <a href="/catalogo" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition font-semibold">
            Explorar monturas
          </a>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Productos destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosDestacados.map((p) => (
            <ProductCard key={p.id} image={p.image} name={p.name} price={p.price} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
