import { useState } from 'react'
import ProductCard from "../Components/ProductCard.jsx";

function Catalogo() {
  const [search, setSearch] = useState('')

  const productos = [
    { id: 1, name: 'Montura Azul', price: 100000, image: 'https://images.unsplash.com/photo-1591076482161-42ce6c3f3d2a?w=500' },
    { id: 2, name: 'Montura Negra', price: 120000, image: 'https://images.unsplash.com/photo-1516641395110-499a5b16cba0?w=500' },
    { id: 3, name: 'Montura Roja', price: 130000, image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=500' },
    { id: 4, name: 'Montura Transparente', price: 140000, image: 'https://images.unsplash.com/photo-1508182311256-e3f7d7d38e1a?w=500' },
  ]

  const filtrados = productos.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Catálogo de monturas</h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar montura..."
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtrados.length > 0 ? (
          filtrados.map((p) => (
            <ProductCard key={p.id} image={p.image} name={p.name} price={p.price} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No se encontraron resultados</p>
        )}
      </div>
    </div>
  )
}

export default Catalogo
