// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Token no proporcionado'
    });
  }
  
  try {
    const user = jwt.verify(token, config.jwt.secret);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token expirado'
      });
    }
    
    return res.status(403).json({
      success: false,
      statusCode: 403,
      message: 'Token inválido'
    });
  }
};

export const authorizeRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'No autenticado'
      });
    }
    
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'No tienes permiso para acceder a este recurso'
      });
    }
    
    next();
  };
};