// scripts/bulkUpload.js
// Script de carga masiva de productos con análisis de IA usando Ollama + LLaVA

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../src/models/Product.js';
import { uploadImage } from '../src/config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configuración
const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'llava:13b';  // Cambiado a LLaVA para mejor compatibilidad con imágenes
const IMAGES_BASE_PATH = 'C:\\Users\\Keiver\\Downloads\\Divinas Monturas';
const USER_ID = '6924a7468bc1304f6e1197fc'; // ID del usuario administrador

// Mapeo de carpetas a metadata
const folderMapping = {
  '3 piezas caballero': { tipo: 'montura', material: '3 piezas', genero: 'caballero', categoria: '3 Piezas Caballero' },
  'Acetato caballero': { tipo: 'montura', material: 'acetato', genero: 'caballero', categoria: 'Acetato Caballero' },
  'Acetato dama': { tipo: 'montura', material: 'acetato', genero: 'dama', categoria: 'Acetato Dama' },
  'Acetato niño y niña': { tipo: 'montura', material: 'acetato', genero: 'unisex', categoria: 'Acetato Niño y Niña' },
  'Aluminio': { tipo: 'montura', material: 'aluminio', genero: 'unisex', categoria: 'Aluminio' },
  'Dama 3 piezas': { tipo: 'montura', material: '3 piezas', genero: 'dama', categoria: 'Dama 3 Piezas' },
  'Dama económica': { tipo: 'montura', material: 'acetato', genero: 'dama', categoria: 'Dama Económica' },
  'Dama Fandia': { tipo: 'montura', material: 'acetato', genero: 'dama', categoria: 'Dama Fandia', marca: 'Fandia' },
  'Dama metálicas': { tipo: 'montura', material: 'metálica', genero: 'dama', categoria: 'Dama Metálicas' },
  'Dama victoria rose acetato': { tipo: 'montura', material: 'acetato', genero: 'dama', categoria: 'Dama Victoria Rose', marca: 'Victoria Rose' },
  'Dama zuka': { tipo: 'montura', material: 'acetato', genero: 'dama', categoria: 'Dama Zuka', marca: 'Zuka' },
  'Flex dama': { tipo: 'montura', material: 'flex', genero: 'dama', categoria: 'Flex Dama' },
  'Gorillaz': { tipo: 'montura', material: 'acetato', genero: 'unisex', categoria: 'Gorillaz', marca: 'Gorillaz' },
  'Metálica caballero': { tipo: 'montura', material: 'metálica', genero: 'caballero', categoria: 'Metálica Caballero' },
  'Metálica dama rosa': { tipo: 'montura', material: 'metálica', genero: 'dama', categoria: 'Metálica Dama Rosa' },
  'Mistic Dama': { tipo: 'montura', material: 'acetato', genero: 'dama', categoria: 'Mistic Dama', marca: 'Mistic' },
  'Montura dama funches': { tipo: 'montura', material: 'acetato', genero: 'dama', categoria: 'Montura Dama Funches', marca: 'Funches' },
  'Montura flex': { tipo: 'montura', material: 'flex', genero: 'unisex', categoria: 'Montura Flex' },
  'Montura flex niño y niña': { tipo: 'montura', material: 'flex', genero: 'unisex', categoria: 'Montura Flex Niño y Niña' },
  'Montura sin flex caballero': { tipo: 'montura', material: 'acetato', genero: 'caballero', categoria: 'Montura Sin Flex Caballero' },
  'Réplicas disponibles': { tipo: 'montura', material: 'acetato', genero: 'unisex', categoria: 'Réplicas Disponibles' },
  'Sin flex dama': { tipo: 'montura', material: 'acetato', genero: 'dama', categoria: 'Sin Flex Dama' },
  'Sol aaa': { tipo: 'lentes', material: 'acetato', genero: 'unisex', categoria: 'Sol AAA' },
  'Sol económicas': { tipo: 'lentes', material: 'acetato', genero: 'unisex', categoria: 'Sol Económicas' },
  'Tr90 dama': { tipo: 'montura', material: 'tr90', genero: 'dama', categoria: 'TR90 Dama' },
  'Tr90 niño': { tipo: 'montura', material: 'tr90', genero: 'niño', categoria: 'TR90 Niño' },
  'Varias': { tipo: 'montura', material: 'acetato', genero: 'unisex', categoria: 'Varias' },
  'Vivao': { tipo: 'montura', material: 'acetato', genero: 'unisex', categoria: 'Vivao', marca: 'Vivao' }
};

// Capitalizar palabras para nombres profesionales
function capitalizar(texto) {
  return texto
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(' ');
}

// Normalizar descripción para que suene más natural
function normalizarDescripcion(descripcion, folderMetadata) {
  if (!descripcion) return `Montura de ${folderMetadata.material} para ${folderMetadata.genero}`;

  // Reemplazar frases poco naturales
  let desc = descripcion
    .replace(/^Forma del frente es /i, 'Montura ')
    .replace(/^La forma del frente es /i, 'Montura ')
    .replace(/^El diseño es /i, 'Diseño ')
    .replace(/^Es una montura /i, 'Montura ')
    .trim();

  // Capitalizar primera letra
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);

  // Asegurar que termine en punto
  if (!desc.endsWith('.')) {
    desc += '.';
  }

  return desc;
}

// Análisis de imagen con Ollama
async function analyzeImage(imagePath, folderMetadata) {
  try {
    // Leer imagen y convertir a base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const prompt = `Eres un experto analizador de monturas ópticas. Tu trabajo es observar ESTA montura específica y describir EXACTAMENTE lo que ves.

⚠️ ADVERTENCIA CRÍTICA: NUNCA repitas la misma respuesta para diferentes monturas. Cada montura es ÚNICA.

INFORMACIÓN FIJA (USA ESTOS VALORES EXACTAMENTE):
- Material: ${folderMetadata.material}
- Género: ${folderMetadata.genero}
- Categoría: ${folderMetadata.categoria}
${folderMetadata.marca ? `- Marca conocida: ${folderMetadata.marca}` : ''}

SI HAY MÚLTIPLES MONTURAS EN LA IMAGEN:
- Enfócate SOLO en la montura más PROMINENTE o CÉNTRICA
- Ignora completamente las otras monturas

═══════════════════════════════════════════════════════════════════
ANÁLISIS PASO A PASO - SIGUE ESTE ORDEN EXACTO:
═══════════════════════════════════════════════════════════════════

PASO 1: IDENTIFICAR FORMA DEL FRENTE (marco principal donde van los lentes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Observa detenidamente la FORMA del frente:
✓ Rectangular - Lados rectos y esquinas definidas
✓ Cuadrada - Similar al rectangular pero más simétrico
✓ Redonda - Forma circular u ovalada perfecta
✓ Aviador - Forma de gota o lágrima invertida
✓ Cat-eye - Esquinas superiores elevadas/puntiagudas (estilo gato)
✓ Ovalada - Forma de óvalo suave
✓ Wayfarer - Trapezoidal con esquinas superiores más anchas
✓ Mariposa - Muy ancha y curva (similar a alas de mariposa)
✓ Geométrica - Formas angulares especiales (hexagonal, octagonal, etc.)

PASO 2: DETECTAR TODOS LOS COLORES CON PRECISIÓN EXTREMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Examina CADA PARTE DE LA MONTURA por separado:

A) FRENTE (marco principal):
   - ¿Qué color tiene? (Negro/Gris/Dorado/Plateado/Carey/Azul/Rojo/Café/Transparente/etc.)
   - ¿Qué tono específico? (Oscuro/Claro/Medio)
   - ¿Qué acabado? (Mate/Brillante/Metálico/Cromado/Satinado)
   - Si es metálico: ¿Es dorado, plateado, cromado, cobre, bronce?
   - Si es carey: ¿Carey claro, oscuro, miel?

B) PUENTE (parte entre los dos lentes):
   - ¿Mismo color que el frente o diferente?
   - ¿Tiene detalles metálicos?

C) BISAGRAS (uniones laterales):
   - ¿Son visibles?
   - ¿Qué color? (Dorado/Plateado/Cromado/Negro/del mismo color del frente)

D) PATILLAS/VARILLAS (partes que van a las orejas):
   - ¿Mismo color que el frente o DIFERENTE?
   - ¿Qué acabado tienen?
   - ¿Hay detalles decorativos?

E) TERMINALES DE PATILLAS:
   - ¿Qué color tienen?
   - ¿Hay protectores de goma de otro color?

F) DETALLES DECORATIVOS:
   - ¿Hay logos metálicos?
   - ¿Hay líneas o franjas de otro color?
   - ¿Hay adornos o incrustaciones?

REGLAS PARA LISTAR COLORES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Si encuentras 1 color: ["Color + Acabado Específico"]
   Ejemplo: ["Negro Brillante"]
   Ejemplo: ["Carey Oscuro"]
   Ejemplo: ["Dorado Mate"]

Si encuentras 2 colores: ["Color1 + Acabado", "Detalles Color2"]
   Ejemplo: ["Negro Mate", "Detalles Dorados"]
   Ejemplo: ["Carey Claro", "Bisagras Plateadas"]

Si encuentras 3+ colores: ["Color Frente", "Patillas Color2", "Detalles Color3"]
   Ejemplo: ["Gris Oscuro Mate", "Patillas Negras", "Bisagras Doradas"]
   Ejemplo: ["Carey Miel", "Patillas Café Oscuro", "Detalles Cromados"]

⚠️ IMPORTANTE: Si ves 3 colores diferentes, DEBES listar los 3. NO simplificar.

PASO 3: GENERAR DESCRIPCIÓN ÚNICA Y ESPECÍFICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Crea una descripción que mencione características ESPECÍFICAS de ESTA montura:
✓ Forma exacta del frente
✓ Estilo general (clásico/moderno/vintage/deportivo/elegante/minimalista)
✓ Detalles únicos (bisagras expuestas, puente doble, patillas gruesas/delgadas)
✓ Acabados especiales (mate/brillante/texturizado)

EJEMPLOS DE DESCRIPCIONES BUENAS (específicas y variadas):
✓ "Montura rectangular de perfil bajo con acabado mate y líneas minimalistas"
✓ "Diseño aviador clásico con puente doble y bisagras doradas decorativas"
✓ "Estilo cat-eye vintage con esquinas elevadas y detalles cromados"
✓ "Montura cuadrada de acetato grueso con acabado brillante y bisagras reforzadas"
✓ "Diseño deportivo de líneas aerodinámicas con patillas flexibles y ajuste envolvente"
✓ "Montura redonda retro con puente de llavija y acabado carey translúcido"
✓ "Estilo wayfarer moderno con frente trapezoidal y terminales de goma"
✓ "Diseño ovalado delicado con marco delgado y detalles florales en las patillas"

EJEMPLOS DE DESCRIPCIONES MALAS (genéricas - NO usar):
✗ "Estilo aviador clásico con acabado moderno y sofisticado" (demasiado genérico)
✗ "Montura de diseño elegante" (no dice nada específico)
✗ "Estilo moderno y contemporáneo" (vacío de detalles)

PASO 4: GENERAR NOMBRE DESCRIPTIVO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Formato: "Montura ${folderMetadata.material} ${folderMetadata.genero} [COLORES DETECTADOS]"

Ejemplos correctos:
✓ "Montura 3 Piezas Caballero Negro Mate con Bisagras Doradas"
✓ "Montura 3 Piezas Caballero Carey Oscuro con Patillas Negras"
✓ "Montura 3 Piezas Caballero Gris Oscuro Mate"
✓ "Montura 3 Piezas Caballero Dorado Brillante con Detalles Cromados"

═══════════════════════════════════════════════════════════════════
FORMATO DE RESPUESTA (SOLO JSON):
═══════════════════════════════════════════════════════════════════

{
  "marca": "nombre de marca visible o null",
  "colores": ["lista completa de colores detectados con acabados específicos"],
  "nombre": "Montura ${folderMetadata.material} ${folderMetadata.genero} [colores]",
  "descripcion": "Descripción ÚNICA y ESPECÍFICA de ESTA montura - menciona forma exacta, estilo y detalles únicos"
}

⚠️ RECUERDA: Cada montura es DIFERENTE. NUNCA repitas la misma descripción o colores.

Responde ÚNICAMENTE el JSON, nada más.`;

    const response = await axios.post(OLLAMA_API, {
      model: MODEL,
      prompt: prompt,
      images: [base64Image],
      stream: false,
      options: {
        temperature: 0.1,  // Temperatura muy baja para máxima precisión y consistencia
        num_predict: 500   // Límite de tokens para respuesta concisa
      }
    });

    // Parsear respuesta
    const aiResponse = response.data.response;

    // Extraer JSON de la respuesta
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo extraer JSON de la respuesta de IA');
    }

    let analyzed;
    try {
      analyzed = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.warn(`  ⚠️  Error parseando JSON, usando valores por defecto`);
      analyzed = {};
    }

    // Normalizar marca: limpiar valores como "null", "N/A", "ninguna", etc.
    const normalizarMarca = (marca) => {
      if (!marca) return '';
      if (typeof marca !== 'string') return '';
      const marcaLower = marca.toLowerCase().trim();
      const valoresInvalidos = ['null', 'n/a', 'ninguna', 'sin marca', 'desconocida', 'no visible'];
      if (valoresInvalidos.includes(marcaLower)) return '';
      return marca.trim();
    };

    // Priorizar marca del folder, luego la detectada por IA (normalizada)
    const marcaDetectada = normalizarMarca(analyzed.marca);
    const marcaFinal = folderMetadata.marca || marcaDetectada;

    // Normalizar colores
    const colores = Array.isArray(analyzed.colores) && analyzed.colores.length > 0
      ? analyzed.colores.filter(c => c && typeof c === 'string')
      : ['Sin especificar'];

    // Generar nombre validado: asegurarse que use el material y género correctos
    let nombreFinal;
    if (analyzed.nombre) {
      // Verificar si el nombre incluye el material y género correctos
      const materialCorrecto = analyzed.nombre.toLowerCase().includes(folderMetadata.material.toLowerCase());
      const generoCorrecto = analyzed.nombre.toLowerCase().includes(folderMetadata.genero.toLowerCase());

      if (materialCorrecto && generoCorrecto) {
        // La IA lo hizo bien, capitalizar para mejor presentación
        nombreFinal = capitalizar(analyzed.nombre);
      } else {
        // La IA no siguió el formato, generar nombre correcto manualmente
        nombreFinal = generarNombreConColores(folderMetadata, colores);
      }
    } else {
      // No hay nombre, generar uno con los colores detectados
      nombreFinal = generarNombreConColores(folderMetadata, colores);
    }

    // Función helper para generar nombres con colores
    function generarNombreConColores(metadata, coloresArray) {
      if (coloresArray.length === 0 || coloresArray[0] === 'Sin especificar') {
        return `Montura ${capitalizar(metadata.material)} ${capitalizar(metadata.genero)}`;
      }

      // Si hay un solo color
      if (coloresArray.length === 1) {
        return `Montura ${capitalizar(metadata.material)} ${capitalizar(metadata.genero)} ${coloresArray[0]}`;
      }

      // Si hay 2 colores: "Montura X Y Color1 con Color2"
      if (coloresArray.length === 2) {
        return `Montura ${capitalizar(metadata.material)} ${capitalizar(metadata.genero)} ${coloresArray[0]} con ${coloresArray[1]}`;
      }

      // Si hay 3+ colores: "Montura X Y Color1 con Color2 y Color3"
      // Ejemplo: ["Gris Metálico", "Patillas Negras", "Detalles Dorados"]
      // Resultado: "Montura 3 Piezas Caballero Gris Metálico con Patillas Negras y Detalles Dorados"
      const colorPrincipal = coloresArray[0];
      const coloresSecundarios = coloresArray.slice(1);

      if (coloresSecundarios.length === 1) {
        return `Montura ${capitalizar(metadata.material)} ${capitalizar(metadata.genero)} ${colorPrincipal} con ${coloresSecundarios[0]}`;
      }

      // Unir con comas excepto el último que va con "y"
      const ultimoColor = coloresSecundarios[coloresSecundarios.length - 1];
      const otrosColores = coloresSecundarios.slice(0, -1);

      return `Montura ${capitalizar(metadata.material)} ${capitalizar(metadata.genero)} ${colorPrincipal} con ${otrosColores.join(', ')} y ${ultimoColor}`;
    }

    return {
      marca: marcaFinal,
      colores: colores,
      nombre: nombreFinal,
      descripcion: normalizarDescripcion(analyzed.descripcion, folderMetadata)
    };
  } catch (error) {
    console.error(`  ❌ Error analizando imagen:`, error.message);

    // Valores por defecto si falla completamente la IA
    return {
      marca: folderMetadata.marca || '',
      colores: ['Sin especificar'],
      nombre: `${folderMetadata.categoria} ${folderMetadata.material}`,
      descripcion: `Montura de ${folderMetadata.material} para ${folderMetadata.genero}`
    };
  }
}

// Procesar una imagen
async function processImage(imagePath, folderMetadata, stats) {
  try {
    console.log(`\n📸 Procesando: ${path.basename(imagePath)}`);

    // 1. Analizar imagen con IA
    console.log('  🤖 Analizando con IA...');
    const aiData = await analyzeImage(imagePath, folderMetadata);
    console.log(`  ✅ Colores: ${aiData.colores.join(', ')}`);
    if (aiData.marca) {
      console.log(`  ✅ Marca: ${aiData.marca}`);
    } else {
      console.log(`  ℹ️  Marca: No detectada (está bien, no es obligatorio)`);
    }
    console.log(`  ✅ Nombre: ${aiData.nombre}`);

    // 2. Subir a Cloudinary
    console.log('  ☁️  Subiendo a Cloudinary...');
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    const cloudinaryResult = await uploadImage(dataURI, `divinasmonturas/${folderMetadata.categoria}`);
    console.log('  ✅ Imagen subida a Cloudinary');

    // 3. Crear producto en BD
    console.log('  💾 Guardando en base de datos...');
    const productData = {
      nombre: aiData.nombre,
      descripcion: aiData.descripcion,
      tipo: folderMetadata.tipo,
      categoria: folderMetadata.categoria,
      marca: aiData.marca,  // Usar marca detectada por IA (ya incluye fallback a folder)
      material: folderMetadata.material,
      genero: folderMetadata.genero,
      color: aiData.colores,
      disponible: true,
      imagenes: {
        principal: cloudinaryResult.url,
        adicionales: []
      },
      creadoPor: USER_ID
    };

    const producto = new Product(productData);
    await producto.save();

    console.log(`  ✅ Producto creado exitosamente`);
    stats.success++;

    return producto;
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    stats.errors++;
    stats.errorDetails.push({
      image: path.basename(imagePath),
      error: error.message
    });
    return null;
  }
}

// Procesar todas las carpetas
async function processAllFolders() {
  const stats = {
    total: 0,
    success: 0,
    errors: 0,
    errorDetails: []
  };

  console.log('🚀 Iniciando carga masiva de productos...\n');

  // Conectar a MongoDB
  console.log('📊 Conectando a MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Conectado a MongoDB\n');

  // Leer todas las carpetas
  const folders = fs.readdirSync(IMAGES_BASE_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`📁 Encontradas ${folders.length} carpetas\n`);

  for (const folder of folders) {
    const folderPath = path.join(IMAGES_BASE_PATH, folder);
    const metadata = folderMapping[folder];

    if (!metadata) {
      console.log(`⚠️  Carpeta "${folder}" no tiene mapeo, saltando...`);
      continue;
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📂 Procesando carpeta: ${folder}`);
    console.log(`${'='.repeat(60)}`);

    // Leer imágenes de la carpeta
    const images = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => path.join(folderPath, file));

    console.log(`   Encontradas ${images.length} imágenes`);

    for (let i = 0; i < images.length; i++) {
      const imagePath = images[i];
      stats.total++;

      console.log(`\n[${i + 1}/${images.length}] Imagen ${stats.total} de ${stats.total + images.length - i - 1 + folders.length * 10}...`);

      await processImage(imagePath, metadata, stats);

      // Pequeña pausa para no saturar
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Resumen final
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 RESUMEN FINAL');
  console.log('='.repeat(60));
  console.log(`✅ Productos creados exitosamente: ${stats.success}`);
  console.log(`❌ Errores: ${stats.errors}`);
  console.log(`📈 Total procesados: ${stats.total}`);

  if (stats.errors > 0) {
    console.log('\n❌ Detalles de errores:');
    stats.errorDetails.forEach((err, i) => {
      console.log(`  ${i + 1}. ${err.image}: ${err.error}`);
    });
  }

  await mongoose.disconnect();
  console.log('\n✅ Proceso completado');
}

// Ejecutar
processAllFolders().catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});
