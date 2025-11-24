// src/app.js
// Configuración central de Express con ES Modules

import 'dotenv/config.js';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from './middleware/errorHandler.js';
import config from './config/config.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

/**
 * MIDDLEWARE GLOBAL
 */

// CORS - Permite solicitudes desde el frontend
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
  optionsSuccessStatus: 200
}));

// Logger HTTP
app.use(morgan('combined'));

// Parser JSON
app.use(express.json({ limit: '10mb' }));

// Parser URL encoded
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/**
 * RUTAS
 */

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API está funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de productos (públicas y privadas)
app.use('/api/productos', productRoutes);

/**
 * MANEJO DE RUTAS NO ENCONTRADAS
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Ruta no encontrada'
  });
});

/**
 * MIDDLEWARE DE MANEJO DE ERRORES
 * DEBE SER EL ÚLTIMO MIDDLEWARE
 */
app.use(errorHandler);

export default app;