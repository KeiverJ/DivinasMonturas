import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaMapMarkerAlt, FaFileAlt, FaUpload } from "react-icons/fa";

function Citas() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    firstVisit: false,
    symptoms: ""
  });
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  // Consultar horarios ocupados cuando cambia la fecha
  React.useEffect(() => {
    const fetchOcupados = async () => {
      const fechaStr = selectedDate.toISOString().split('T')[0];
      try {
        const res = await fetch(`/api/citas/ocupados?date=${fechaStr}`);
        if (res.ok) {
          const data = await res.json();
          setHorariosOcupados(data.horarios || []);
        } else {
          setHorariosOcupados([]);
        }
      } catch {
        setHorariosOcupados([]);
      }
    };
    fetchOcupados();
  }, [selectedDate]);

  // Genera los slots de horario según el día seleccionado
  function getTimeSlots(date) {
    if (!date) return [];
    const day = date.getDay(); // 0=Dom, 1=Lun, ..., 6=Sáb
    let slots = [];
    if (day >= 1 && day <= 5) {
      // Lun-Vie: 9:00-12:00, 2:30-6:00
      slots = [
        ...generateSlots("09:00", "12:00"),
        ...generateSlots("14:30", "18:00")
      ];
    } else if (day === 6) {
      // Sáb: 9:00-4:00
      slots = generateSlots("09:00", "16:00");
    }
    return slots;
  }

  function generateSlots(start, end) {
    // start/end formato "HH:mm"
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
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("firstVisit", formData.firstVisit);
    form.append("symptoms", formData.symptoms);
    form.append("date", selectedDate.toISOString().split('T')[0]);
    form.append("time", selectedTime);
    if (file) form.append("prescription", file);

    try {
      const res = await fetch("/api/citas", {
        method: "POST",
        body: form
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("Error al agendar la cita. Intenta de nuevo.");
      }
    } catch (err) {
      alert("Error de red al agendar la cita.");
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
            Tu cita ha sido agendada exitosamente. Hemos enviado un correo de confirmación a {" "}
            <span className="text-[#D4AF37]">{formData.email}</span>
          </p>

          <div className="bg-white rounded-xl p-8 border-2 border-[#D4AF37]/20 mb-8 text-left">
            <h3 className="mb-4 text-black">Resumen de tu Cita</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Servicio:</span>
                <span className="text-black">{formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="text-black">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hora:</span>
                <span className="text-black">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paciente:</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button className="px-6 py-3 rounded-lg border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
              Agregar a Calendario
            </button>
            <button className="px-6 py-3 rounded-lg border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
              Imprimir Confirmación
            </button>
          </div>

          <div className="bg-[#F5F5DC]/30 rounded-lg p-6 mb-8">
            <h4 className="mb-3 text-black">Instrucciones de Preparación</h4>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li>• Llega 10 minutos antes de tu cita</li>
              <li>• Trae tu seguro y documentación</li>
              <li>• Si usas lentes de contacto, retíralos 2 horas antes del examen</li>
              <li>• Trae tus lentes o prescripción actual</li>
            </ul>
          </div>

          <div className="flex items-start gap-4 bg-white rounded-lg p-6 border-2 border-gray-100">
            <FaMapMarkerAlt className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
            <div className="text-left">
              <p className="text-black mb-1">DIVINA VISIÓN</p>
              <p className="text-gray-600 text-sm">123 Luxury Ave, Fashion District</p>
              <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitted(false)}
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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl p-6 border-2 border-gray-100 mb-6">
                <h3 className="mb-4 text-black flex items-center gap-2">
                  <FaCalendarAlt className="w-5 h-5 text-[#D4AF37]" />
                  Selecciona una Fecha
                </h3>
                <input
                  type="date"
                  required
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={e => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
                <h3 className="mb-4 text-black flex items-center gap-2">
                  <FaClock className="w-5 h-5 text-[#D4AF37]" />
                  Horarios Disponibles
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((time) => {
                    const ocupado = horariosOcupados.includes(time);
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => !ocupado && setSelectedTime(time)}
                        className={`px-3 sm:px-4 py-3 rounded-lg border-2 transition-all duration-300 text-sm sm:text-base ${ocupado
                          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : selectedTime === time
                            ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                            : "border-gray-200 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"}`}
                        disabled={ocupado}
                      >
                        {time}
                        {ocupado && <span className="ml-1 text-xs">(Ocupado)</span>}
                      </button>
                    );
                  })}
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
              <h3 className="mb-6 text-black flex items-center gap-2">
                <FaFileAlt className="w-5 h-5 text-[#D4AF37]" />
                Información del Paciente
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Nombre Completo *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Correo Electrónico *</label>
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
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Teléfono *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Eliminado campo de tipo de servicio */}

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.firstVisit}
                      onChange={e => setFormData({ ...formData, firstVisit: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span className="text-gray-700">¿Primera visita?</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="prescription" className="block text-gray-700 mb-2">Subir Prescripción (Opcional)</label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#D4AF37] transition-colors cursor-pointer"
                    onClick={() => document.getElementById('prescription').click()}
                  >
                    <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      id="prescription"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <p className="text-sm text-gray-600">
                      Arrastra tu archivo aquí o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    {file && <p className="text-xs text-green-600 mt-2">Archivo seleccionado: {file.name}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="symptoms" className="block text-gray-700 mb-2">Síntomas o Motivo de Consulta</label>
                  <textarea
                    id="symptoms"
                    value={formData.symptoms}
                    onChange={e => setFormData({ ...formData, symptoms: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    placeholder="Describe brevemente tu situación..."
                  />
                </div>

                {/* Eliminado campo de seguro médico */}

                <button
                  type="submit"
                  className="w-full py-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
                  style={{ backgroundColor: "#D4AF37", color: "#000" }}
                  disabled={!selectedDate || !selectedTime}
                >
                  Confirmar Cita
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