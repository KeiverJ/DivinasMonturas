// src/middleware/errorHandler.js
// Middleware centralizado para manejo de errores con ES Modules

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Middleware para capturar errores y responder consistentemente
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';
  
  // Errores de validación de Joi
  if (err.details) {
    statusCode = 400;
    message = 'Validación fallida';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors: err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }
  
  // Errores de MongoDB - Duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `El campo '${field}' ya existe`;
  }
  
  // Errores de validación de Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validación fallida';
    const errors = Object.keys(err.errors).map(field => ({
      field,
      message: err.errors[field].message
    }));
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors
    });
  }
  
  // Errores de casting (ej: ID inválido)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `${err.path} inválido`;
  }
  
  // Respuesta estándar de error
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Wrapper para async/await en controllers
 * Captura promesas rechazadas automáticamente
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};