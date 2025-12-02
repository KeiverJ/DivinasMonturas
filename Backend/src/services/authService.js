// src/services/authService.js
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import config from '../config/config.js';

class AuthService {
  
  async register(userData) {
    try {
      const usuarioExistente = await User.findOne({ email: userData.email });
      if (usuarioExistente) {
        throw new Error('El email ya está registrado');
      }
      
      // Hashear contraseña ANTES de crear usuario
      const salt = await bcryptjs.genSalt(10);
      const passwordHasheada = await bcryptjs.hash(userData.password, salt);
      
      const usuario = new User({
        ...userData,
        password: passwordHasheada
      });
      
      await usuario.save();
      
      const token = this.generateToken(usuario);
      
      return {
        usuario: usuario.toJSON(),
        token
      };
    } catch (error) {
      throw new Error(`Error al registrar: ${error.message}`);
    }
  }
  
  async login(email, password) {
    try {
      const usuario = await User.findOne({ email }).select('+password');
      if (!usuario) {
        throw new Error('Email o contraseña incorrectos');
      }
      
      const esValida = await usuario.comparePassword(password);
      if (!esValida) {
        throw new Error('Email o contraseña incorrectos');
      }
      
      if (!usuario.activo) {
        throw new Error('Usuario inactivo');
      }
      
      const token = this.generateToken(usuario);
      
      return {
        usuario: usuario.toJSON(),
        token
      };
    } catch (error) {
      throw new Error(`Error al login: ${error.message}`);
    }
  }
  
  generateToken(usuario) {
    return jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
  }
  
  async getProfile(userId) {
    try {
      const usuario = await User.findById(userId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error(`Error al obtener perfil: ${error.message}`);
    }
  }
  
  async getAllUsers() {
    try {
      return await User.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }
}

export default new AuthService();