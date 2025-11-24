// src/models/User.js
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      index: true,
    },
    
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: 6,
      select: false,
    },
    
    rol: {
      type: String,
      enum: {
        values: ['admin', 'vendedor', 'gerente'],
        message: 'El rol debe ser: admin, vendedor o gerente'
      },
      default: 'vendedor',
    },
    
    activo: {
      type: Boolean,
      default: true,
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
  { timestamps: true }
);

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(passwordIngresada) {
  return await bcryptjs.compare(passwordIngresada, this.password);
};

// No incluir password en JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('Usuario', userSchema);