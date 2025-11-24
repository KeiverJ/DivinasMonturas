// src/controllers/authController.js
import { asyncHandler } from '../middleware/errorHandler.js';
import authService from '../services/authService.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';

export const register = asyncHandler(async (req, res) => {
  const { error, value } = validateRegister(req.body);
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
  
  const resultado = await authService.register(value);
  
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Usuario registrado exitosamente',
    data: {
      usuario: resultado.usuario,
      token: resultado.token
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { error, value } = validateLogin(req.body);
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
  
  const resultado = await authService.login(value.email, value.password);
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Login exitoso',
    data: {
      usuario: resultado.usuario,
      token: resultado.token
    }
  });
});

export const getPerfil = asyncHandler(async (req, res) => {
  const usuario = await authService.getProfile(req.user.id);
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Perfil obtenido',
    data: usuario
  });
});

export const getUsuarios = asyncHandler(async (req, res) => {
  const usuarios = await authService.getAllUsers();
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Usuarios obtenidos',
    data: usuarios
  });
});