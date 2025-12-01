// src/config/cloudinary.js
// Configuración de Cloudinary para almacenamiento de imágenes

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar dotenv con la ruta correcta del .env
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Sube una imagen a Cloudinary
 * @param {Buffer|String} file - Buffer del archivo o path local
 * @param {String} folder - Carpeta en Cloudinary (opcional)
 * @returns {Promise<Object>} - Resultado de la subida con URL
 */
export const uploadImage = async (file, folder = 'divinasmonturas/productos') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'image',
      transformation: [
        { width: 1000, height: 1250, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    throw new Error(`Error al subir imagen a Cloudinary: ${error.message}`);
  }
};

/**
 * Elimina una imagen de Cloudinary
 * @param {String} publicId - ID público de la imagen en Cloudinary
 * @returns {Promise<Object>} - Resultado de la eliminación
 */
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Error al eliminar imagen de Cloudinary: ${error.message}`);
  }
};

export default cloudinary;
