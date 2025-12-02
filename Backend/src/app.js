import 'dotenv/config.js';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from './middleware/errorHandler.js';
import config from './config/config.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import citaRoutes from './routes/citaRoutes.js';
import mayoristaRoutes from './routes/mayoristaRoutes.js';

const app = express();

/**
 * MIDDLEWARE GLOBAL
 */

// CORS
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
  optionsSuccessStatus: 200
}));

// Logger HTTP
app.use(morgan('combined'));

// ✅ IMPORTANTE: Parsers ANTES de las rutas
app.use(express.json({ limit: '10mb' }));
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

// Rutas de productos
app.use('/api/productos', productRoutes);

// ✅ Rutas de citas
app.use('/api/citas', citaRoutes);

// ✅ Rutas de mayoristas
app.use('/api/mayoristas', mayoristaRoutes);

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
 */
app.use(errorHandler);

export default app;