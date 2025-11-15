import { useState } from 'react'

function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' })
  const [estado, setEstado] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.correo || !form.mensaje) {
      setEstado('⚠️ Todos los campos son obligatorios.')
      return
    }

    setEstado('✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!')
    setForm({ nombre: '', correo: '', mensaje: '' })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Contáctanos</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Mensaje</label>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Enviar mensaje
        </button>

        {estado && (
          <p className={`text-center mt-3 font-medium ${estado.includes('⚠️') ? 'text-red-500' : 'text-green-600'}`}>
            {estado}
          </p>
        )}
      </form>

      <div className="mt-10 text-center text-gray-700 space-y-2">
        <p><strong>Dirección:</strong> Calle 45 #20-15, Bogotá, Colombia</p>
        <p><strong>Teléfono:</strong> +57 310 456 7890</p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="hover:text-blue-500 transition">Facebook</a>
          <a href="#" className="hover:text-blue-500 transition">Instagram</a>
          <a href="#" className="hover:text-blue-500 transition">Twitter</a>
        </div>
      </div>
    </div>
  )
}

export default Contacto
