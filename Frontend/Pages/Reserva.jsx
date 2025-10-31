import { useState } from 'react'

function Reserva() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    fecha: '',
    hora: '',
  })

  const [mensaje, setMensaje] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.nombre || !form.correo || !form.telefono || !form.fecha || !form.hora) {
      setMensaje('⚠️ Por favor completa todos los campos.')
      return
    }

    setMensaje('✅ ¡Tu reserva ha sido registrada con éxito!')
    setForm({ nombre: '', correo: '', telefono: '', fecha: '', hora: '' })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reserva tu cita</h2>

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
          <label className="block mb-1 font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">Hora</label>
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Reservar cita
        </button>

        {mensaje && (
          <p className={`text-center mt-3 font-medium ${mensaje.includes('⚠️') ? 'text-red-500' : 'text-green-600'}`}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  )
}

export default Reserva