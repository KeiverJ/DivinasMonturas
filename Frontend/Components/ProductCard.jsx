function ProductCard({ image, name, price }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg mb-3" />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-blue-600 font-medium mt-1">${price}</p>
      <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Ver detalles
      </button>
    </div>
  )
}

export default ProductCard
