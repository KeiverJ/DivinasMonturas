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
    return getEnvVariable('PORT', '5000');
  },
  get nodeEnv() {
    return getEnvVariable('NODE_ENV', 'development');
  },

  // Base de datos
  mongodb: {
    get uri() {
      const uri = getEnvVariable('MONGODB_URI');
      if (!uri) {
        throw new Error('MONGODB_URI no está definida en las variables de entorno');
      }
      return uri;
    },
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  // Autenticación JWT
  jwt: {
    get secret() {
      const secret = getEnvVariable('JWT_SECRET');
      if (!secret) {
        throw new Error('JWT_SECRET no está definida en las variables de entorno');
      }
      return secret;
    },
    get expiresIn() {
      return getEnvVariable('JWT_EXPIRE', '7d');
    },
  },

  // CORS
  cors: {
    get origin() {
      return getEnvVariable('CORS_ORIGIN', 'http://localhost:5173');
    },
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
      return process.env.EMAIL_RECIPIENT || 'keivercj@gmail.com';
    },
  },
};

export default config;