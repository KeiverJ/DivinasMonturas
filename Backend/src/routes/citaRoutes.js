import express from 'express';
import { createCita, getHorariosOcupados, getAllCitas, deleteCita } from '../controllers/citaController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite de 5MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido. Solo PDF, JPG y PNG.'));
    }
  }
});

// Crear nueva cita (público)
router.post('/', upload.single('prescription'), createCita);

// Obtener horarios ocupados de una fecha (público)
router.get('/ocupados', getHorariosOcupados);

// Obtener todas las citas (admin - agregar autenticación después)
router.get('/', getAllCitas);

// Eliminar una cita (admin - agregar autenticación después)
router.delete('/:id', deleteCita);

export default router;
