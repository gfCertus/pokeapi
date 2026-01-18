require('dotenv').config();

const env = {
  // Configuración del servidor
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // PokeAPI
  pokeApi: {
    baseURL: process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2/',
    timeout: parseInt(process.env.POKEAPI_TIMEOUT || '5000'),
    retries: parseInt(process.env.POKEAPI_RETRIES || '3'),
  },
  
  // Caché
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '3600'),
    maxSize: parseInt(process.env.CACHE_MAX_SIZE || '100'),
  },
  
  // Seguridad
  security: {
    jwtSecret: process.env.JWT_SECRET || 'pokemon-api-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    rateLimit: {
      max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'),
    },
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || './logs',
  },
  
  // Cliente
  client: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
  },
  
  // Swagger
  swagger: {
    enabled: process.env.ENABLE_SWAGGER === 'true' || true,
    title: process.env.SWAGGER_TITLE || 'Pokémon API',
    description: process.env.SWAGGER_DESCRIPTION || 'API para estudiantes',
  },
  
  // Validación de configuración
  validate: function() {
    const required = ['POKEAPI_BASE_URL'];
    
    for (const key of required) {
      if (!process.env[key]) {
        console.warn(`⚠️  Advertencia: ${key} no está definida en .env`);
      }
    }
    
    console.log('✅ Configuración cargada correctamente');
    console.log(`🌍 Ambiente: ${this.nodeEnv}`);
    console.log(`🚪 Puerto: ${this.port}`);
  },
  
  // Verificar si estamos en producción
  isProduction: function() {
    return this.nodeEnv === 'production';
  },
  
  // Verificar si estamos en desarrollo
  isDevelopment: function() {
    return this.nodeEnv === 'development';
  },
};

// Validar configuración al cargar
env.validate();

module.exports = env;