// src/Pages/Citas.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaMapMarkerAlt, FaFileAlt, FaUpload } from "react-icons/fa";
import { citasService } from "../services/citasService";

function Citas() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    primeraVisita: false,
    sintomas: ""
  });
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Consultar horarios ocupados cuando cambia la fecha
  React.useEffect(() => {
    const fetchOcupados = async () => {
      if (!selectedDate) return;
      
      try {
        setError(null);
        const response = await citasService.getHorariosOcupados(selectedDate);
        setHorariosOcupados(response.data?.horarios || []);
      } catch (err) {
        console.error('Error:', err);
        setHorariosOcupados([]);
      }
    };
    fetchOcupados();
  }, [selectedDate]);

  // Genera los slots de horario según el día seleccionado
  function getTimeSlots(dateStr) {
    if (!dateStr) return [];
    
    const date = new Date(dateStr);
    const day = date.getDay(); // 0=Dom, 1=Lun, ..., 6=Sáb
    let slots = [];
    
    if (day >= 1 && day <= 5) {
      // Lun-Vie: 9:00-12:00, 14:30-18:00
      slots = [
        ...generateSlots("09:00", "12:00"),
        ...generateSlots("14:30", "18:00")
      ];
    } else if (day === 6) {
      // Sáb: 9:00-16:00
      slots = generateSlots("09:00", "16:00");
    }
    
    return slots;
  }

  function generateSlots(start, end) {
    const slots = [];
    let [h, m] = start.split(":").map(Number);
    let [eh, em] = end.split(":").map(Number);
    
    while (h < eh || (h === eh && m <= em)) {
      const ampm = h < 12 ? "AM" : "PM";
      let displayH = h % 12 === 0 ? 12 : h % 12;
      slots.push(`${displayH}:${m.toString().padStart(2, "0")} ${ampm}`);
      m += 30;
      if (m >= 60) { h++; m = 0; }
      if (h > eh || (h === eh && m > em)) break;
    }
    return slots;
  }

  const timeSlots = getTimeSlots(selectedDate);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      setError('Por favor selecciona fecha y hora');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const citaData = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        fecha: selectedDate,
        hora: selectedTime,
        primeraVisita: formData.primeraVisita,
        sintomas: formData.sintomas,
        prescripcion: file
      };

      await citasService.agendarCita(citaData);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Error al agendar la cita. Intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div id="citas" className="min-h-screen pt-32 md:pt-36 pb-20 bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-6"
          >
            <FaCheckCircle className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="font-serif text-black mb-4 text-3xl md:text-4xl">
            ¡Cita <span style={{ color: "#D4AF37" }}>Confirmada!</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Tu cita ha sido agendada exitosamente. Hemos enviado un correo de confirmación a{" "}
            <span className="text-[#D4AF37]">{formData.email}</span>
          </p>

          <div className="bg-white rounded-xl p-8 border-2 border-[#D4AF37]/20 mb-8 text-left">
            <h3 className="mb-4 text-black font-semibold">Resumen de tu Cita</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="text-black">{new Date(selectedDate).toLocaleDateString('es-CO')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hora:</span>
                <span className="text-black">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paciente:</span>
                <span className="text-black">{formData.nombre}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F5DC]/30 rounded-lg p-6 mb-8">
            <h4 className="mb-3 text-black font-semibold">Instrucciones de Preparación</h4>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li>• Llega 10 minutos antes de tu cita</li>
              <li>• Trae tu documento de identidad</li>
              <li>• Si usas lentes de contacto, retíralos 2 horas antes del examen</li>
              <li>• Trae tus lentes o prescripción actual</li>
            </ul>
          </div>

          <div className="flex items-start gap-4 bg-white rounded-lg p-6 border-2 border-gray-100">
            <FaMapMarkerAlt className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
            <div className="text-left">
              <p className="text-black mb-1 font-semibold">DIVINAS MONTURAS</p>
              <p className="text-gray-600 text-sm">Cúcuta, Norte de Santander</p>
              <p className="text-gray-600 text-sm">+57 (310) 123-4567</p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ nombre: "", email: "", telefono: "", primeraVisita: false, sintomas: "" });
              setSelectedTime("");
              setFile(null);
            }}
            className="mt-8 px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
            style={{ backgroundColor: "#D4AF37", color: "#000" }}
          >
            Agendar Otra Cita
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="citas" className="min-h-screen pt-32 md:pt-36 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-black mb-4 text-3xl md:text-5xl">
            Agenda tu <span style={{ color: "#D4AF37" }}>Cita</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Selecciona la fecha, hora y servicio que prefieras. Te confirmaremos tu cita de inmediato.
          </p>
        </motion.div>

        {error && (
          <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-100 mb-6">
                <h3 className="mb-4 text-black flex items-center gap-2 font-semibold">
                  <FaCalendarAlt className="w-5 h-5 text-[#D4AF37]" />
                  Selecciona una Fecha
                </h3>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
                <h3 className="mb-4 text-black flex items-center gap-2 font-semibold">
                  <FaClock className="w-5 h-5 text-[#D4AF37]" />
                  Horarios Disponibles
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.length === 0 ? (
                    <p className="col-span-3 text-gray-600 text-center py-4">
                      No hay horarios disponibles para este día
                    </p>
                  ) : (
                    timeSlots.map((time) => {
                      const ocupado = horariosOcupados.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => !ocupado && setSelectedTime(time)}
                          className={`px-3 sm:px-4 py-3 rounded-lg border-2 transition-all duration-300 text-sm sm:text-base ${ocupado
                            ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : selectedTime === time
                              ? "border-[#D4AF37] bg-[#D4AF37] text-black font-semibold"
                              : "border-gray-200 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"}`}
                          disabled={ocupado}
                        >
                          {time}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 border-2 border-gray-100"
            >
              <h3 className="mb-6 text-black flex items-center gap-2 font-semibold">
                <FaFileAlt className="w-5 h-5 text-[#D4AF37]" />
                Información del Paciente
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-gray-700 mb-2 font-semibold">
                    Nombre Completo *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold">
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-gray-700 mb-2 font-semibold">
                    Teléfono *
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="+57 (310) 123-4567"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.primeraVisita}
                      onChange={e => setFormData({ ...formData, primeraVisita: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span className="text-gray-700 font-semibold">¿Primera visita?</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="prescripcion" className="block text-gray-700 mb-2 font-semibold">
                    Subir Prescripción (Opcional)
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#D4AF37] transition-colors cursor-pointer"
                    onClick={() => document.getElementById('prescripcion').click()}
                  >
                    <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      id="prescripcion"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <p className="text-sm text-gray-600">
                      Arrastra tu archivo aquí o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    {file && <p className="text-xs text-green-600 mt-2">✓ {file.name}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="sintomas" className="block text-gray-700 mb-2 font-semibold">
                    Síntomas o Motivo de Consulta
                  </label>
                  <textarea
                    id="sintomas"
                    value={formData.sintomas}
                    onChange={e => setFormData({ ...formData, sintomas: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    placeholder="Describe brevemente tu situación..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !selectedDate || !selectedTime}
                  className="w-full py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  style={{ backgroundColor: "#D4AF37", color: "#000" }}
                >
                  {loading ? "Agendando..." : "Confirmar Cita"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Al confirmar, aceptas nuestra política de cancelación. Cancela con 24 horas de anticipación.
                </p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Citas;