// src/config/config.js
// Configuración centralizada con ES Modules
const getEnvVariable = (key, defaultValue = null) => {
  const value = process.env[key];
  if (!value && defaultValue === null) {
    console.error(`⚠️  Variable de entorno ${key} no está definida`);
    return undefined;
  }
  return value || defaultValue;
};

const config = {
  // Servidor
  get port() {
    return getEnvVariable("PORT", "5000");
  },
  get nodeEnv() {
    return getEnvVariable("NODE_ENV", "development");
  },

  // Base de datos
  mongodb: {
    get uri() {
      const uri = getEnvVariable("MONGODB_URI");
      if (!uri) {
        throw new Error(
          "MONGODB_URI no está definida en las variables de entorno"
        );
      }
      return uri;
    },
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // Autenticación JWT
  jwt: {
    get secret() {
      const secret = getEnvVariable("JWT_SECRET");
      if (!secret) {
        throw new Error(
          "JWT_SECRET no está definida en las variables de entorno"
        );
      }
      return secret;
    },
    get expiresIn() {
      return getEnvVariable("JWT_EXPIRE", "7d");
    },
  },

  // CORS - Actualizado para manejar múltiples orígenes
  cors: {
    // Convertir string separado por comas a array
    get allowedOrigins() {
      const origins = getEnvVariable("CORS_ORIGIN", "http://localhost:5173");
      return origins.split(",").map((url) => url.trim());
    },

    // Función dinámica para CORS
    get origin() {
      const allowedOrigins = this.allowedOrigins;

      return function (origin, callback) {
        // Permitir requests sin origin (Postman, apps móviles, curl)
        if (!origin) return callback(null, true);

        // Verificar si el origin está en la lista permitida
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true); // Permitir
        } else {
          console.warn(`⚠️  CORS blocked: ${origin} not in allowed list`);
          callback(new Error("Not allowed by CORS"));
        }
      };
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },

  // Email configuration (opcional)
  email: {
    get user() {
      return process.env.EMAIL_USER || null;
    },
    get pass() {
      return process.env.EMAIL_PASS || null;
    },
    get recipient() {
      return process.env.EMAIL_RECIPIENT || "keivercj@gmail.com";
    },
  },
};

export default config;
