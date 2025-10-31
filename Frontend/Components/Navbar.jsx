import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          OptiVision
        </Link>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-500 transition">Inicio</Link></li>
          <li><Link to="/catalogo" className="hover:text-blue-500 transition">Catálogo</Link></li>
          <li><Link to="/reserva" className="hover:text-blue-500 transition">Reserva</Link></li>
          <li><Link to="/nosotros" className="hover:text-blue-500 transition">Nosotros</Link></li>
          <li><Link to="/contacto" className="hover:text-blue-500 transition">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
