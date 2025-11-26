// src/config/config.js
// Configuración centralizada con ES Modules

const getEnvVariable = (key, defaultValue = null) => {
  const value = process.env[key];
  
  if (!value && defaultValue === null) {
    throw new Error(`Variable de entorno ${key} no está definida`);
  }
  
  return value || defaultValue;
};

const config = {
  // Servidor
  port: getEnvVariable('PORT', '5000'),
  nodeEnv: getEnvVariable('NODE_ENV', 'development'),
  
  // Base de datos
  mongodb: {
    uri: getEnvVariable('MONGODB_URI'),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  
  // Autenticación JWT
  jwt: {
    secret: getEnvVariable('JWT_SECRET'),
    expiresIn: getEnvVariable('JWT_EXPIRE', '7d'),
  },
  
  // CORS
  cors: {
    origin: getEnvVariable('CORS_ORIGIN', 'http://localhost:5173'),
  },
  
};

export default config;