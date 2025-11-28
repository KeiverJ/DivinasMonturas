// src/controllers/citaController.js
import { asyncHandler } from '../middleware/errorHandler.js';
import citaService from '../services/citaService.js';
import { validateCreateCita, validateUpdateCita } from '../validators/citaValidator.js';

/**
 * POST /api/citas
 * Crear una nueva cita (público)
 */
export const crearCita = asyncHandler(async (req, res) => {
  try {
    console.log('📝 Datos recibidos:', req.body);
    console.log('📁 Archivo:', req.file);

    const { error, value } = validateCreateCita(req.body);
    if (error) {
      console.log('❌ Error de validación:', error.details);
      return res.status(400).json({
        success: false,
        message: 'Validación fallida',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    console.log('✅ Validación pasada, creando cita...');
    const cita = await citaService.createCita(value, req.file);
    
    console.log('✅ Cita creada:', cita);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Cita agendada exitosamente',
      data: cita
    });
  } catch (err) {
    console.error('❌ Error en crearCita:', err.message);
    console.error('Stack:', err.stack);
    
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err.message || 'Error al crear cita'
    });
  }
});

/**
 * GET /api/citas/ocupados
 * Obtener horarios ocupados para una fecha
 */
export const getHorariosOcupados = asyncHandler(async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'La fecha es requerida'
      });
    }

    const horarios = await citaService.getHorariosOcupados(date);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Horarios obtenidos',
      data: {
        fecha: date,
        horarios
      }
    });
  } catch (err) {
    console.error('❌ Error en getHorariosOcupados:', err.message);
    
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err.message || 'Error al obtener horarios'
    });
  }
});

/**
 * GET /api/citas
 * Obtener todas las citas (solo admin/gerente)
 */
export const obtenerCitas = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 20, estado, fecha } = req.query;

    const filtros = {};
    if (estado) filtros.estado = estado;
    if (fecha) {
      const inicioDelDia = new Date(fecha);
      const finDelDia = new Date(fecha);
      finDelDia.setDate(finDelDia.getDate() + 1);
      filtros.fecha = {
        $gte: inicioDelDia,
        $lt: finDelDia
      };
    }

    const citas = await citaService.getCitas(filtros, page, limit);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Citas obtenidas',
      data: citas.docs,
      paginacion: {
        total: citas.total,
        pagina: page,
        totalPages: citas.pages,
        hasPrevPage: citas.hasPrevPage(),
        hasNextPage: citas.hasNextPage(),
      }
    });
  } catch (err) {
    console.error('❌ Error en obtenerCitas:', err.message);
    
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err.message || 'Error al obtener citas'
    });
  }
});

/**
 * GET /api/citas/:id
 * Obtener una cita por ID (solo admin)
 */
export const obtenerCitaPorId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await citaService.getCitaById(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Cita obtenida',
      data: cita
    });
  } catch (err) {
    console.error('❌ Error en obtenerCitaPorId:', err.message);
    
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err.message || 'Error al obtener cita'
    });
  }
});

/**
 * PUT /api/citas/:id
 * Actualizar cita (solo admin/gerente)
 */
export const actualizarCita = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = validateUpdateCita(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validación fallida',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    const cita = await citaService.updateCita(id, value);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Cita actualizada',
      data: cita
    });
  } catch (err) {
    console.error('❌ Error en actualizarCita:', err.message);
    
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err.message || 'Error al actualizar cita'
    });
  }
});

/**
 * DELETE /api/citas/:id
 * Cancelar cita (solo admin)
 */
export const cancelarCita = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await citaService.deleteCita(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Cita cancelada',
      data: { id }
    });
  } catch (err) {
    console.error('❌ Error en cancelarCita:', err.message);
    
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err.message || 'Error al cancelar cita'
    });
  }
});

/**
 * GET /api/citas/estadisticas/dia
 * Obtener estadísticas del día (solo admin)
 */
export const getEstadisticasDia = asyncHandler(async (req, res) => {
  try {
    const { fecha } = req.query;

    const stats = await citaService.getEstadisticasDia(fecha);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Estadísticas obtenidas',
      data: stats
    });
  } catch (err) {
    console.error('❌ Error en getEstadisticasDia:', err.message);
    
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err.message || 'Error al obtener estadísticas'
    });
  }
});