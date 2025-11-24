import Joi from 'joi';

const registerSchema = Joi.object({
  nombre: Joi.string()
    .required()
    .trim()
    .max(50)
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
  
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'La contraseña es obligatoria'
    }),
  
  rol: Joi.string()
    .valid('admin', 'vendedor', 'gerente')
    .default('vendedor')
    .optional(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'El email es obligatorio'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'La contraseña es obligatoria'
    }),
});

export const validateRegister = (data) => {
  return registerSchema.validate(data, { abortEarly: false });
};

export const validateLogin = (data) => {
  return loginSchema.validate(data, { abortEarly: false });
};