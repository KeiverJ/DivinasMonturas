// src/services/citaService.js
import Cita from '../models/Cita.js';

class CitaService {

    /**
     * Crear una nueva cita
     */
    async createCita(citaData, archivo) {
        try {
            // Convertir string a Date
            const fecha = new Date(citaData.fecha);

            // Verificar que la hora no esté ocupada
            const inicioDelDia = new Date(fecha);
            inicioDelDia.setHours(0, 0, 0, 0);

            const finDelDia = new Date(fecha);
            finDelDia.setHours(23, 59, 59, 999);

            const citaExistente = await Cita.findOne({
                fecha: {
                    $gte: inicioDelDia,
                    $lte: finDelDia
                },
                hora: citaData.hora,
                estado: { $ne: 'cancelada' }
            });

            if (citaExistente) {
                throw new Error('Esta hora ya está ocupada. Por favor selecciona otra.');
            }

            const cita = new Cita({
                nombre: citaData.nombre,
                email: citaData.email,
                telefono: citaData.telefono,
                fecha: fecha,  // ← Aquí convertida a Date
                hora: citaData.hora,
                primeraVisita: citaData.primeraVisita,
                sintomas: citaData.sintomas
            });

            // Si hay archivo, guardarlo
            if (archivo) {
                cita.prescripcion = {
                    url: archivo.path,
                    nombreArchivo: archivo.originalname
                };
            }

            await cita.save();

            return cita;
        } catch (error) {
            throw new Error(`Error al crear cita: ${error.message}`);
        }
    }

    /**
     * Obtener horarios ocupados para una fecha
     */
    async getHorariosOcupados(fecha) {
        try {
            const inicioDelDia = new Date(fecha);
            const finDelDia = new Date(fecha);
            finDelDia.setDate(finDelDia.getDate() + 1);

            const citasDelDia = await Cita.find({
                fecha: {
                    $gte: inicioDelDia,
                    $lt: finDelDia
                },
                estado: { $ne: 'cancelada' }
            }, 'hora');

            const horariosOcupados = citasDelDia.map(c => c.hora);

            return horariosOcupados;
        } catch (error) {
            throw new Error(`Error al obtener horarios: ${error.message}`);
        }
    }

    /**
     * Obtener todas las citas (con paginación)
     */
    async getCitas(filtros = {}, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;

            const citas = await Cita.find(filtros)
                .sort({ fecha: -1 })
                .skip(skip)
                .limit(parseInt(limit));

            const total = await Cita.countDocuments(filtros);

            return {
                docs: citas,
                total,
                pages: Math.ceil(total / limit),
                hasPrevPage: () => page > 1,
                hasNextPage: () => page < Math.ceil(total / limit)
            };
        } catch (error) {
            throw new Error(`Error al obtener citas: ${error.message}`);
        }
    }

    /**
     * Obtener una cita por ID
     */
    async getCitaById(id) {
        try {
            const cita = await Cita.findById(id);

            if (!cita) {
                throw new Error('Cita no encontrada');
            }

            return cita;
        } catch (error) {
            throw new Error(`Error al obtener cita: ${error.message}`);
        }
    }

    /**
     * Actualizar una cita
     */
    async updateCita(id, datos) {
        try {
            const cita = await Cita.findByIdAndUpdate(
                id,
                datos,
                { new: true, runValidators: true }
            );

            if (!cita) {
                throw new Error('Cita no encontrada');
            }

            return cita;
        } catch (error) {
            throw new Error(`Error al actualizar cita: ${error.message}`);
        }
    }

    /**
     * Cancelar una cita
     */
    async deleteCita(id) {
        try {
            const cita = await Cita.findByIdAndUpdate(
                id,
                { estado: 'cancelada' },
                { new: true }
            );

            if (!cita) {
                throw new Error('Cita no encontrada');
            }

            return cita;
        } catch (error) {
            throw new Error(`Error al cancelar cita: ${error.message}`);
        }
    }

    /**
     * Obtener estadísticas del día
     */
    async getEstadisticasDia(fecha = new Date().toISOString().split('T')[0]) {
        try {
            const inicioDelDia = new Date(fecha);
            const finDelDia = new Date(fecha);
            finDelDia.setDate(finDelDia.getDate() + 1);

            const citas = await Cita.find({
                fecha: {
                    $gte: inicioDelDia,
                    $lt: finDelDia
                }
            });

            const confirmadas = citas.filter(c => c.estado === 'confirmada').length;
            const completadas = citas.filter(c => c.estado === 'completada').length;
            const canceladas = citas.filter(c => c.estado === 'cancelada').length;

            return {
                fecha,
                total: citas.length,
                confirmadas,
                completadas,
                canceladas,
                primerasVisitas: citas.filter(c => c.primeraVisita).length
            };
        } catch (error) {
            throw new Error(`Error al obtener estadísticas: ${error.message}`);
        }
    }
}

export default new CitaService();