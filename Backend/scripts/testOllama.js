// scripts/testOllama.js
// Script de prueba para verificar que Ollama está funcionando correctamente

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'llava:13b';  // Cambiado a LLaVA para mejor compatibilidad con imágenes

async function testOllama() {
  console.log('🧪 Prueba de Ollama + LLaVA\n');

  try {
    // 1. Verificar que Ollama está corriendo
    console.log('1️⃣  Verificando conexión con Ollama...');
    const healthCheck = await axios.get('http://localhost:11434', { timeout: 5000 });
    console.log('   ✅ Ollama está corriendo\n');

    // 2. Verificar que el modelo está instalado
    console.log('2️⃣  Verificando modelo llava:13b...');
    const modelsResponse = await axios.get('http://localhost:11434/api/tags');
    const hasModel = modelsResponse.data.models?.some(m => m.name.includes('llava'));

    if (!hasModel) {
      console.log('   ❌ Modelo llava:13b no encontrado');
      console.log('   💡 Ejecuta: ollama pull llava:13b');
      process.exit(1);
    }
    console.log('   ✅ Modelo instalado\n');

    // 3. Prueba básica sin imagen
    console.log('3️⃣  Probando generación de texto...');
    console.log('   ⏳ Primera vez puede tardar 1-2 minutos cargando el modelo...\n');

    const textResponse = await axios.post(OLLAMA_API, {
      model: MODEL,
      prompt: 'Di "Hola" en una palabra',
      stream: false
    }, { timeout: 120000 }); // 2 minutos

    console.log(`   ✅ Respuesta: ${textResponse.data.response.trim()}\n`);

    // 4. Prueba con imagen de ejemplo (si existe)
    console.log('4️⃣  Probando análisis de imagen...');
    console.log('   💡 Para probar con una imagen real, coloca una imagen llamada "test.jpg" en scripts/\n');

    const testImagePath = path.join(__dirname, 'test.jpg');

    if (fs.existsSync(testImagePath)) {
      const imageBuffer = fs.readFileSync(testImagePath);
      const base64Image = imageBuffer.toString('base64');

      console.log('   🖼️  Analizando test.jpg...');

      const imageResponse = await axios.post(OLLAMA_API, {
        model: MODEL,
        prompt: 'Describe esta imagen en español en una oración corta.',
        images: [base64Image],
        stream: false
      }, { timeout: 120000 }); // 2 minutos

      console.log(`   ✅ Descripción: ${imageResponse.data.response.trim()}\n`);
    } else {
      console.log('   ⚠️  No se encontró test.jpg, saltando prueba de imagen\n');
    }

    // Resumen
    console.log('=' .repeat(60));
    console.log('✅ TODAS LAS PRUEBAS PASARON');
    console.log('=' .repeat(60));
    console.log('🎉 Ollama está listo para usar');
    console.log('💡 Ahora puedes ejecutar: node scripts/bulkUpload.js\n');

  } catch (error) {
    console.log('\n❌ ERROR EN LA PRUEBA\n');

    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Ollama no está corriendo');
      console.log('   Solución: Abre una terminal y ejecuta "ollama serve"\n');
    } else if (error.response?.status === 404) {
      console.log('💡 Modelo no encontrado');
      console.log('   Solución: ollama pull llava:13b\n');
    } else if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
      console.log('💡 Timeout - El modelo está tardando mucho');
      console.log('   Posibles causas:');
      console.log('   1. Primera vez cargando el modelo (normal, espera más tiempo)');
      console.log('   2. RAM insuficiente (necesitas al menos 8GB disponibles)');
      console.log('   3. CPU lenta (el modelo es pesado)\n');
      console.log('   Solución: Vuelve a ejecutar, la segunda vez será más rápido');
      console.log('   Si persiste: considera usar un modelo más pequeño (llava:7b)\n');
    } else {
      console.log('Error:', error.message);
      if (error.response?.data) {
        console.log('Detalles:', error.response.data);
      }
    }

    process.exit(1);
  }
}

testOllama();
