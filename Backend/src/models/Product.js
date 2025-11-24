import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
      index: true,
    },
    
    descripcion: {
      type: String,
      maxlength: [1000, 'La descripción no puede exceder 1000 caracteres'],
    },
    
    tipo: {
      type: String,
      enum: {
        values: ['montura', 'lentes', 'accesorios'],
        message: 'El tipo debe ser: montura, lentes o accesorios'
      },
      required: [true, 'El tipo es requerido'],
      index: true,
    },
    
    categoria: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
      index: true,
    },
    
    marca: {
      type: String,
      trim: true,
      index: true,
    },
    
    material: {
      type: String,
      trim: true,
      index: true,
    },
    
    genero: {
      type: String,
      enum: {
        values: ['dama', 'caballero', 'niño', 'niña', 'unisex'],
        message: 'El género debe ser: dama, caballero, niño, niña o unisex'
      },
      index: true,
    },
    
    color: {
      type: [String],
      default: [],
    },
    
    disponible: {
      type: Boolean,
      default: true,
      index: true,
    },
    
    imagenes: {
      principal: String,
      adicionales: [String]
    },
    
    etiquetas: [String],
    
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

productSchema.index({ nombre: 'text', descripcion: 'text', etiquetas: 'text' });
productSchema.index({ tipo: 1, categoria: 1, disponible: 1 });
productSchema.index({ marca: 1, material: 1, genero: 1 });
productSchema.index({ categoria: 1, marca: 1, material: 1, genero: 1, color: 1 });

productSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return obj;
};

export default mongoose.model('Producto', productSchema);