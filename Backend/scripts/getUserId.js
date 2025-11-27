// scripts/getUserId.js
// Script para obtener el ID de tu usuario administrador

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

dotenv.config();

async function getUserId() {
  try {
    console.log('🔍 Conectando a MongoDB...\n');
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('📋 Usuarios en la base de datos:\n');

    const users = await User.find({}).select('_id nombre email rol');

    if (users.length === 0) {
      console.log('❌ No hay usuarios en la base de datos');
      console.log('💡 Primero debes crear un usuario administrador\n');
      process.exit(1);
    }

    users.forEach((user, index) => {
      console.log(`${index + 1}. Usuario:`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Nombre: ${user.nombre}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Rol: ${user.rol}`);
      console.log('');
    });

    console.log('=' .repeat(60));
    console.log('📝 INSTRUCCIONES:');
    console.log('=' .repeat(60));
    console.log('1. Copia el ID del usuario que quieras usar (generalmente admin)');
    console.log('2. Edita Backend/scripts/bulkUpload.js línea 23');
    console.log('3. Reemplaza el USER_ID con tu ID real\n');

    console.log('Ejemplo:');
    console.log(`const USER_ID = '${users[0]._id}'; // ${users[0].nombre}\n`);

    await mongoose.disconnect();

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getUserId();
