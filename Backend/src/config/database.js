import mongoose from 'mongoose';
import config from './config.js';

export const connectDatabase = async () => {
  try {
    console.log('🔌 Conectando a MongoDB Atlas...');
    
    const conn = await mongoose.connect(config.mongodb.uri);
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error desconectando de MongoDB:', error.message);
    process.exit(1);
  }
};