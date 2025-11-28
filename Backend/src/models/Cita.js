import mongoose from 'mongoose';

const citaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      index: true,
    },
    
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      lowercase: true,
      index: true,
    },
    
    telefono: {
      type: String,
      required: [true, 'El teléfono es requerido'],
    },
    
    fecha: {
      type: Date,
      required: [true, 'La fecha es requerida'],
      index: true,
    },
    
    hora: {
      type: String,
      required: [true, 'La hora es requerida'],
      index: true,
    },
    
    primeraVisita: {
      type: Boolean,
      default: false,
    },
    
    sintomas: {
      type: String,
      default: '',
    },
    
    prescripcion: {
      url: String,
      nombreArchivo: String,
    },
    
    estado: {
      type: String,
      enum: ['confirmada', 'completada', 'cancelada'],
      default: 'confirmada',
      index: true,
    },
    
    notas: String,
  },
  { timestamps: true }
);

// Índice compuesto para evitar duplicados
citaSchema.index({ fecha: 1, hora: 1 });

export default mongoose.model('Cita', citaSchema);