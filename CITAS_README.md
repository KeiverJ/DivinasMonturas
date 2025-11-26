# Sistema de Citas - Divinas Monturas

## ✅ Funcionalidad Completada

El sistema de citas ha sido completamente implementado con las siguientes características:

### Backend (API)
- ✅ **Modelo de datos** (`Backend/src/models/Cita.js`)
  - Almacena información del paciente
  - Fecha y hora de la cita
  - Primera visita (checkbox)
  - Síntomas/motivo de consulta
  - Archivo de prescripción opcional

- ✅ **Controlador** (`Backend/src/controllers/citaController.js`)
  - `POST /api/citas` - Crear nueva cita
  - `GET /api/citas/ocupados?date=YYYY-MM-DD` - Obtener horarios ocupados
  - `GET /api/citas` - Listar todas las citas (para admin)
  - `DELETE /api/citas/:id` - Eliminar una cita (para admin)

- ✅ **Rutas** (`Backend/src/routes/citaRoutes.js`)
  - Configuración de Multer para subir archivos
  - Validación de tipos de archivo (PDF, JPG, PNG)
  - Límite de 5MB por archivo

- ✅ **Notificaciones por Email** (Opcional)
  - Envío automático de correo al recibir una nueva cita
  - Soporte para adjuntar prescripción médica
  - Usa Nodemailer con Gmail

### Frontend (React)
- ✅ **Interfaz de usuario** (`Frontend/src/Pages/Citas.jsx`)
  - Calendario para seleccionar fecha
  - Horarios disponibles según el día:
    - Lun-Vie: 9:00-12:00, 14:30-18:00
    - Sábado: 9:00-16:00
    - Domingo: Cerrado
  - Formulario con validación
  - Subida de prescripción médica
  - Pantalla de confirmación con detalles de la cita
  - Marcado de horarios ocupados en tiempo real

- ✅ **Proxy configurado** (`Frontend/vite.config.js`)
  - Redirige `/api` al backend en `http://localhost:5000`

### Dependencias Instaladas
- ✅ `nodemailer` - Para envío de emails
- ✅ `multer` - Para subida de archivos

---

## 🚀 Configuración

### 1. Variables de Entorno

Crea o edita el archivo `Backend/.env` con las siguientes variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database - IMPORTANTE: Configura tu MongoDB
MONGODB_URI=mongodb://localhost:27017/divinas-monturas
# O usa MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/divinas-monturas

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# Email (OPCIONAL - para notificaciones de citas)
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASS=tu-app-password-de-gmail
EMAIL_RECIPIENT=keivercj@gmail.com
```

### 2. MongoDB

**Opción A: MongoDB Local**
1. Instala MongoDB Community Edition
2. Inicia el servicio:
   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

**Opción B: MongoDB Atlas (Cloud - Recomendado)**
1. Crea una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén tu connection string
4. Actualiza `MONGODB_URI` en `.env`

### 3. Email (Opcional)

Si quieres recibir notificaciones por email cuando se agenden citas:

1. Ve a tu cuenta de Gmail → Seguridad
2. Activa la verificación en dos pasos
3. Genera una "Contraseña de aplicación" en https://myaccount.google.com/apppasswords
4. Usa esa contraseña en `EMAIL_PASS`

**Nota:** Si no configuras el email, las citas se guardarán normalmente en la base de datos, simplemente no recibirás notificaciones.

---

## 🏃 Ejecutar el Proyecto

### Backend
```bash
cd Backend
npm install
npm run dev
```

El servidor estará corriendo en `http://localhost:5000`

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

---

## 📝 Uso del Sistema

1. **Agendar Cita**:
   - Ve a la página de Citas
   - Selecciona una fecha
   - Elige un horario disponible (los ocupados estarán deshabilitados)
   - Completa el formulario
   - Opcionalmente sube una prescripción médica
   - Haz clic en "Confirmar Cita"

2. **Ver Citas** (Admin):
   - `GET http://localhost:5000/api/citas`
   - Retorna todas las citas con paginación

3. **Eliminar Cita** (Admin):
   - `DELETE http://localhost:5000/api/citas/:id`

---

## 🔧 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/citas` | Crear nueva cita |
| GET | `/api/citas/ocupados?date=2025-01-15` | Obtener horarios ocupados |
| GET | `/api/citas` | Listar todas las citas |
| DELETE | `/api/citas/:id` | Eliminar una cita |

### Ejemplo de Request (POST /api/citas)

```javascript
const formData = new FormData();
formData.append('name', 'Juan Pérez');
formData.append('email', 'juan@ejemplo.com');
formData.append('phone', '+1234567890');
formData.append('firstVisit', 'true');
formData.append('symptoms', 'Revisión de vista');
formData.append('date', '2025-01-15');
formData.append('time', '10:00 AM');
formData.append('prescription', file); // Opcional

fetch('/api/citas', {
  method: 'POST',
  body: formData
});
```

---

## ⚠️ Notas Importantes

1. **MongoDB**: Asegúrate de tener MongoDB corriendo antes de iniciar el backend
2. **Horarios**: Los horarios disponibles se calculan automáticamente según el día
3. **Archivos**: Solo se permiten PDF, JPG y PNG con un máximo de 5MB
4. **Email**: Es opcional - el sistema funciona sin configuración de email

---

## 🔐 Seguridad

- ✅ Validación de tipos de archivo
- ✅ Límite de tamaño de archivo (5MB)
- ✅ Validación de datos requeridos
- ✅ CORS configurado
- ⚠️ **TODO**: Agregar autenticación a los endpoints de admin (GET /api/citas, DELETE /api/citas/:id)

---

## 🎯 Próximos Pasos (Opcional)

1. **Autenticación**: Proteger endpoints de admin con JWT
2. **Email al Cliente**: Enviar confirmación de cita al email del cliente también
3. **Recordatorios**: Sistema de recordatorios automáticos 24h antes
4. **Cancelación**: Permitir que los clientes cancelen citas con un link
5. **Panel de Admin**: Interfaz visual para gestionar citas

---

## 📦 Archivos Modificados/Creados

### Backend
- ✅ `Backend/src/controllers/citaController.js` (nuevo)
- ✅ `Backend/src/models/Cita.js` (nuevo)
- ✅ `Backend/src/routes/citaRoutes.js` (nuevo)
- ✅ `Backend/src/config/config.js` (actualizado - lazy loading)
- ✅ `Backend/src/config/database.js` (actualizado - dynamic import)
- ✅ `Backend/src/app.js` (actualizado - eliminado import de config)
- ✅ `Backend/server.js` (actualizado - mejor carga de dotenv)
- ✅ `Backend/.env` (creado)
- ✅ `Backend/.env.example` (creado)
- ✅ `Backend/package.json` (actualizado - nodemailer, multer)

### Frontend
- ✅ `Frontend/src/Pages/Citas.jsx` (ya existía, funcionando)
- ✅ `Frontend/vite.config.js` (actualizado - proxy configurado)

---

¡El sistema de citas está completamente funcional! 🎉
