// src/validators/citaValidator.js
import Joi from 'joi';

const createCitaSchema = Joi.object({
  nombre: Joi.string()
    .required()
    .trim()
    .max(100)
    .messages({
      'string.empty': 'El nombre no puede estar vacío',
      'any.required': 'El nombre es obligatorio'
    }),

  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'El email es obligatorio'
    }),

  telefono: Joi.string()
    .required()
    .trim()
    .messages({
      'any.required': 'El teléfono es obligatorio'
    }),

  fecha: Joi.string()
    .required()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'Formato de fecha inválido (YYYY-MM-DD)',
      'any.required': 'La fecha es obligatoria'
    }),

  hora: Joi.string()
    .required()
    .pattern(/^\d{1,2}:\d{2}\s(AM|PM)$/)
    .messages({
      'string.pattern.base': 'Formato de hora inválido (ej: 9:00 AM)',
      'any.required': 'La hora es obligatoria'
    }),

  primeraVisita: Joi.boolean()
    .default(false),

  sintomas: Joi.string()
    .max(1000)
    .optional(),
});

const updateCitaSchema = Joi.object({
  estado: Joi.string()
    .valid('confirmada', 'completada', 'cancelada')
    .optional()
    .messages({
      'any.only': 'Estado inválido'
    }),

  notas: Joi.string()
    .max(500)
    .optional(),
}).min(1);

export const validateCreateCita = (data) => {
  return createCitaSchema.validate(data, { abortEarly: false });
};

export const validateUpdateCita = (data) => {
  return updateCitaSchema.validate(data, { abortEarly: false });
};