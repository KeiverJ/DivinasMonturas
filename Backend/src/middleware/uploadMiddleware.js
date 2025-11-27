// src/middleware/uploadMiddleware.js
// Middleware de Multer para manejo de archivos

import multer from 'multer';

// Configurar almacenamiento en memoria
const storage = multer.memoryStorage();

// Filtro de archivos - solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido. Solo se permiten imágenes JPG, PNG y WEBP'), false);
  }
};

// Configurar multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Middleware para una sola imagen
export const uploadSingleImage = upload.single('image');

// Middleware para múltiples imágenes
export const uploadMultipleImages = upload.array('images', 5);

// Manejo de errores de multer
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'El archivo es demasiado grande. Máximo 5MB permitido.',
      });
    }
    return res.status(400).json({
      success: false,
      message: `Error al subir archivo: ${error.message}`,
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next();
};
