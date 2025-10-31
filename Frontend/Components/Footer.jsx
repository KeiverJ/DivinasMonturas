function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-8 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} OptiVision. Todos los derechos reservados.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-blue-500 transition">Facebook</a>
          <a href="#" className="hover:text-blue-500 transition">Instagram</a>
          <a href="#" className="hover:text-blue-500 transition">Twitter</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
