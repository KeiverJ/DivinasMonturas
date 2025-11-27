# 📦 Carga Masiva de Productos con IA

Script automatizado para cargar 300+ productos analizando imágenes con Ollama + LLaVA.

## 🚀 Instalación

### 1. Instalar Ollama

**Windows:**
1. Descarga Ollama desde: https://ollama.com/download
2. Ejecuta el instalador
3. Abre PowerShell o CMD y verifica:
```bash
ollama --version
```

### 2. Descargar modelo de visión LLaVA

```bash
ollama pull llava:13b
```

Esto descargará ~5GB (solo la primera vez, es gratis).

Alternativamente, si tienes menos RAM o quieres mayor velocidad:

```bash
ollama pull llava:7b  # Más rápido, requiere menos RAM
```

### 3. Iniciar Ollama

```bash
ollama serve
```

Deja esta terminal abierta. Ollama correrá en http://localhost:11434

### 4. Instalar dependencias de Node.js

En otra terminal, ve a la carpeta Backend:

```bash
cd Backend
npm install axios form-data
```

## ⚙️ Configuración

### 1. Editar `scripts/bulkUpload.js`

Abre el archivo y cambia esta línea:

```javascript
const IMAGES_BASE_PATH = 'C:/ruta/a/tus/carpetas'; // CAMBIAR ESTO
```

Por la ruta donde están tus carpetas de imágenes. Por ejemplo:

```javascript
const IMAGES_BASE_PATH = 'C:/Users/Keiver/Desktop/Productos';
```

### 2. Organizar carpetas

Asegúrate de que tus carpetas tengan EXACTAMENTE estos nombres:

```
C:/Users/Keiver/Desktop/Productos/
├── 3 piezas caballero/
│   ├── imagen1.jpg
│   ├── imagen2.jpg
│   └── ...
├── Acetato caballero/
│   └── ...
├── Acetato dama/
│   └── ...
├── Acetato niño y niña/
│   └── ...
...
```

**Nombres de carpetas soportados:**
- 3 piezas caballero
- Acetato caballero
- Acetato dama
- Acetato niño y niña
- Aluminio
- Dama 3 piezas
- Dama económica
- Dama Fandia
- Dama metálicas
- Dama victoria rose acetato
- Dama zuka
- Flex dama
- Gorillaz
- Metálica caballero
- Metálica dama rosa
- Mistic Dama
- Montura dama funches
- Montura flex
- Montura flex niño y niña
- Montura sin flex caballero
- Réplicas disponibles
- Sin flex dama
- Sol aaa
- Sol económicas
- Tr90 dama
- Tr90 niño
- Varias
- Vivao

### 3. Verificar credenciales de Cloudinary

Asegúrate de que tu archivo `.env` tenga las credenciales correctas:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## 🎯 Ejecutar el script

### Asegúrate de que:
1. ✅ Ollama está corriendo (`ollama serve`)
2. ✅ MongoDB está accesible
3. ✅ Las rutas están configuradas
4. ✅ Las carpetas tienen los nombres correctos

### Ejecuta:

```bash
cd Backend
node scripts/bulkUpload.js
```

## 📊 Qué hace el script

Para cada imagen:

1. **🤖 Analiza con IA** (Ollama + LLaVA):
   - Detecta colores principales
   - Genera nombre descriptivo
   - Crea descripción profesional

2. **☁️ Sube a Cloudinary**:
   - Optimiza la imagen automáticamente
   - Organiza en carpetas por categoría

3. **💾 Guarda en MongoDB**:
   - Crea el producto completo
   - Asigna todos los campos automáticamente

## 🎬 Ejemplo de salida

```
🚀 Iniciando carga masiva de productos...

📊 Conectando a MongoDB...
✅ Conectado a MongoDB

📁 Encontradas 28 carpetas

============================================================
📂 Procesando carpeta: Acetato dama
============================================================
   Encontradas 15 imágenes

[1/15] Imagen 1 de 300...

📸 Procesando: IMG_0001.jpg
  🤖 Analizando con IA...
  ✅ Colores: Negro, Dorado, Transparente
  ☁️  Subiendo a Cloudinary...
  ✅ Imagen subida a Cloudinary
  💾 Guardando en base de datos...
  ✅ Producto creado: Montura Acetato Dama Negro con Detalles Dorados

...

============================================================
📊 RESUMEN FINAL
============================================================
✅ Productos creados exitosamente: 295
❌ Errores: 5
📈 Total procesados: 300

✅ Proceso completado
```

## ⏱️ Tiempo estimado

- **~0.5-1 segundo** por imagen con IA
- **300 imágenes** = ~5-10 minutos total

## 🔧 Solución de problemas

### Error: "Connection refused localhost:11434"
- Ollama no está corriendo
- Solución: Abre una terminal y ejecuta `ollama serve`

### Error: "Model not found"
- No descargaste el modelo
- Solución: `ollama pull llava:13b`

### Error: "Carpeta no tiene mapeo"
- El nombre de la carpeta no coincide exactamente
- Solución: Renombra la carpeta al nombre exacto de la lista

### Colores no precisos
- La IA puede equivocarse ocasionalmente
- Puedes editar manualmente después desde el admin panel

## 💡 Tips

1. **Prueba con pocas imágenes primero**: Mueve solo 2-3 imágenes a una carpeta de prueba
2. **Revisa los resultados**: Verifica que la IA esté generando buenos nombres
3. **Ajusta si necesario**: Puedes modificar el prompt en el código
4. **Pausa si hay errores**: Ctrl+C para detener, corrige, y vuelve a ejecutar

## ⚠️ IMPORTANTE: Una montura por foto

**RECOMENDACIÓN**: Cada imagen debe contener UNA SOLA montura para mejores resultados.

Si una imagen tiene múltiples monturas:
- La IA intentará analizar solo la montura más prominente/céntrica
- Puede haber errores en la detección de colores
- Los colores de diferentes monturas pueden mezclarse

**Solución ideal**:
- Toma fotos individuales de cada montura
- Una imagen = Un producto
- Esto garantiza descripciones y colores precisos

## 📝 Personalización

Si quieres cambiar cómo genera los nombres o descripciones, edita el prompt en `bulkUpload.js` línea 47:

```javascript
const prompt = `Tu prompt personalizado aquí...`;
```

## ✅ ¡Listo!

Ahora tienes 300 productos en tu base de datos sin escribir nada manualmente. 🎉
