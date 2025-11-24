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
  
  descripcion: Joi.string()
    .trim()
    .max(1000)
    .optional()
    .messages({
      'string.max': 'La descripción no puede exceder 1000 caracteres'
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
    .trim()
    .max(50)
    .messages({
      'string.max': 'La marca no puede exceder 50 caracteres'
    }),
  
  material: Joi.string()
    .optional()
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
  
  color: Joi.array()
    .items(Joi.string())
    .optional()
    .messages({
      'array.base': 'Los colores deben ser un array'
    }),
  
  disponible: Joi.boolean()
    .default(true),
  
  imagenes: Joi.object({
    principal: Joi.string().uri().optional(),
    adicionales: Joi.array().items(Joi.string().uri()).optional()
  }).optional(),
  
  etiquetas: Joi.array()
    .items(Joi.string())
    .optional(),
});

const updateProductSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .max(100)
    .optional(),
  
  descripcion: Joi.string()
    .trim()
    .max(1000)
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
    .optional(),
  
  material: Joi.string()
    .trim()
    .max(50)
    .optional(),
  
  genero: Joi.string()
    .valid('dama', 'caballero', 'niño', 'niña', 'unisex')
    .optional(),
  
  color: Joi.array()
    .items(Joi.string())
    .optional(),
  
  disponible: Joi.boolean()
    .optional(),
  
  imagenes: Joi.object({
    principal: Joi.string().uri().optional(),
    adicionales: Joi.array().items(Joi.string().uri()).optional()
  }).optional(),
  
  etiquetas: Joi.array()
    .items(Joi.string())
    .optional(),
});

export const validateCreateProduct = (data) => {
  return createProductSchema.validate(data, { abortEarly: false });
};

export const validateUpdateProduct = (data) => {
  return updateProductSchema.validate(data, { abortEarly: false });
};