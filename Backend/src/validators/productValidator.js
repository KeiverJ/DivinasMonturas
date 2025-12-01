import Joi from 'joi';

const createProductSchema = Joi.object({
  nombre: Joi.string()
    .required()
    .trim()
    .max(100)
    .messages({
      'string.empty': 'El nombre no puede estar vacío',
      'string.max': 'El nombre no puede exceder 100 caracteres',
      'any.required': 'El nombre es obligatorio'
    }),
  
  tipo: Joi.string()
    .required()
    .valid('montura', 'lentes', 'accesorios')
    .messages({
      'any.required': 'El tipo es obligatorio',
      'any.only': 'El tipo debe ser: montura, lentes o accesorios'
    }),
  
  categoria: Joi.string()
    .required()
    .trim()
    .max(100)
    .messages({
      'string.empty': 'La categoría no puede estar vacía',
      'string.max': 'La categoría no puede exceder 100 caracteres',
      'any.required': 'La categoría es obligatoria'
    }),
  
  marca: Joi.string()
    .optional()
    .allow('')
    .trim()
    .max(50)
    .messages({
      'string.max': 'La marca no puede exceder 50 caracteres'
    }),

  material: Joi.string()
    .optional()
    .allow('')
    .trim()
    .max(50)
    .messages({
      'string.max': 'El material no puede exceder 50 caracteres'
    }),
  
  genero: Joi.string()
    .optional()
    .valid('dama', 'caballero', 'niño', 'niña', 'unisex')
    .messages({
      'any.only': 'El género debe ser: dama, caballero, niño, niña o unisex'
    }),
  
  imagenes: Joi.object({
    principal: Joi.string().uri().optional(),
    adicionales: Joi.array().items(Joi.string().uri()).optional()
  }).optional()
});

const updateProductSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .max(100)
    .optional(),

  tipo: Joi.string()
    .valid('montura', 'lentes', 'accesorios')
    .optional(),

  categoria: Joi.string()
    .trim()
    .max(100)
    .optional(),

  marca: Joi.string()
    .trim()
    .max(50)
    .allow('')
    .optional(),

  material: Joi.string()
    .trim()
    .max(50)
    .allow('')
    .optional(),
  
  genero: Joi.string()
    .valid('dama', 'caballero', 'niño', 'niña', 'unisex')
    .optional(),
  
  imagenes: Joi.object({
    principal: Joi.string().uri().optional(),
    adicionales: Joi.array().items(Joi.string().uri()).optional()
  }).optional()
});

export const validateCreateProduct = (data) => {
  return createProductSchema.validate(data, { abortEarly: false });
};

export const validateUpdateProduct = (data) => {
  return updateProductSchema.validate(data, { abortEarly: false });
};