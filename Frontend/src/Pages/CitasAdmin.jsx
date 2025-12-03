// Formatea la fecha a DD/MM/AAAA
function formatFecha(fechaStr) {
    if (!fechaStr) return '';
    const date = new Date(fechaStr);
    if (Number.isNaN(date)) return fechaStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { citasService } from '../services/citasService';

export default function CitasAdmin() {
    const [citas, setCitas] = useState([]);
    const [fecha, setFecha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchCitas();
    }, [fecha]);

    const fetchCitas = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await citasService.getCitasAdmin(fecha);
            const citasRaw = Array.isArray(res) ? res : res.data || [];
            // Filtrar solo las citas que no están canceladas
            const citasFiltradas = citasRaw.filter(cita => cita.estado !== 'cancelada');
            setCitas(citasFiltradas);
        } catch (err) {
            setError(`Error al cargar citas: ${err.message || err}`);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setError(null);
        setSuccess(null);
        if (!globalThis.confirm('¿Seguro que deseas eliminar esta cita?')) return;
        try {
            const res = await citasService.cancelarCita(id);
            console.log('Respuesta eliminar:', res);
            if (res?.success) {
                setSuccess('Cita eliminada correctamente');
                fetchCitas();
            } else {
                setError(res?.message || 'No se pudo eliminar la cita');
            }
        } catch (err) {
            setError(err.message || 'Error al eliminar cita');
            console.error('Error eliminar cita:', err);
        }
        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 3000);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto mt-20 sm:mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                        Gestión de <span style={{ color: '#D4AF37' }}>Citas</span>
                    </h1>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Administra y filtra las citas agendadas por los clientes.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                    <label htmlFor="fechaFiltro" className="font-semibold text-gray-700 text-sm">Filtrar por fecha:</label>
                    <input
                        id="fechaFiltro"
                        type="date"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                        className="w-full sm:w-auto border-2 rounded-xl px-3 sm:px-4 py-2 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 text-sm"
                        style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[rgba(212,175,55,0.15)] overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-[#D4AF37] font-semibold animate-pulse">Cargando...</div>
                ) : (
                    <>
                        {error && <div className="p-4 sm:p-6 text-red-600 font-semibold text-sm sm:text-base">{error}</div>}
                        {success && <div className="p-4 sm:p-6 text-green-600 font-semibold text-sm sm:text-base">{success}</div>}

                        {/* Vista de tabla para pantallas grandes */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full text-sm text-gray-700">
                                <thead>
                                    <tr className="bg-linear-to-r from-[#f4e5b8] via-[#fffbe6] to-[#d4af37]/20 text-[#D4AF37]">
                                        <th className="px-6 py-4 font-bold">Nombre</th>
                                        <th className="px-6 py-4 font-bold">Fecha</th>
                                        <th className="px-6 py-4 font-bold">Hora</th>
                                        <th className="px-6 py-4 font-bold">Teléfono</th>
                                        <th className="px-6 py-4 font-bold">Email</th>
                                        <th className="px-6 py-4 font-bold">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citas.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center py-8 text-gray-400">No hay citas</td></tr>
                                    ) : (
                                        citas.map(cita => (
                                            <tr key={cita._id} className="border-t hover:bg-[#f4e5b8]/20 transition">
                                                <td className="px-6 py-4 text-center">{cita.nombre}</td>
                                                <td className="px-6 py-4 text-center">{formatFecha(cita.fecha)}</td>
                                                <td className="px-6 py-4 text-center">{cita.hora}</td>
                                                <td className="px-6 py-4 text-center">{cita.telefono}</td>
                                                <td className="px-6 py-4 text-center">{cita.email}</td>
                                                <td className="px-6 py-4 flex gap-2 justify-center text-center">
                                                    <button
                                                        className="px-3 py-1 rounded-xl bg-red-500/80 text-white font-semibold shadow hover:bg-red-600 transition-all duration-200 flex items-center gap-1"
                                                        onClick={() => handleDelete(cita._id)}
                                                    >
                                                        <FaTrash /> Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Vista de tarjetas para móvil y tablet */}
                        <div className="lg:hidden">
                            {citas.length === 0 ? (
                                <div className="text-center py-12 text-gray-400 text-sm">No hay citas</div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {citas.map(cita => (
                                        <div key={cita._id} className="p-4 sm:p-6 hover:bg-[#f4e5b8]/10 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-bold text-base sm:text-lg text-gray-800">{cita.nombre}</h3>
                                                <button
                                                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-red-600 transition-all duration-200 flex items-center gap-1.5 shrink-0 ml-2"
                                                    onClick={() => handleDelete(cita._id)}
                                                >
                                                    <FaTrash size={12} /> Eliminar
                                                </button>
                                            </div>
                                            <div className="space-y-2 text-sm sm:text-base">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-[#D4AF37] min-w-[70px]">Fecha:</span>
                                                    <span className="text-gray-700">{formatFecha(cita.fecha)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-[#D4AF37] min-w-[70px]">Hora:</span>
                                                    <span className="text-gray-700">{cita.hora}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-[#D4AF37] min-w-[70px]">Teléfono:</span>
                                                    <a href={`tel:${cita.telefono}`} className="text-blue-600 hover:underline">{cita.telefono}</a>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="font-semibold text-[#D4AF37] min-w-[70px] shrink-0">Email:</span>
                                                    <a href={`mailto:${cita.email}`} className="text-blue-600 hover:underline break-all">{cita.email}</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}