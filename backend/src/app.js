require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');

// Importar rutas
const pokemonRoutes = require('./routes/pokemonRoutes');

// Configuración de rate limiting usando variables de entorno
const limiter = rateLimit({
  windowMs: env.security.rateLimit.windowMs,
  max: env.security.rateLimit.max,
  message: {
    error: 'Demasiadas peticiones, por favor intenta más tarde',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

// Middlewares de seguridad usando variables de entorno
app.use(helmet());

// Configurar CORS basado en el ambiente
const corsOptions = {
  origin: env.isDevelopment() 
    ? ['http://localhost:3001', 'http://localhost:3000']
    : env.client.frontendUrl,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Aplicar rate limiting a todas las rutas
app.use(limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (solo en desarrollo)
if (env.isDevelopment()) {
  const morgan = require('morgan');
  app.use(morgan('dev'));
  console.log('📝 Modo desarrollo activado - Logging detallado');
}

// Configuración de Swagger usando variables de entorno
if (env.swagger.enabled) {
  const swaggerSpec = require('./config/swagger');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📚 Swagger habilitado en /api-docs');
}

// Rutas
app.use('/api/pokemon', pokemonRoutes);

// Ruta principal con información del ambiente
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API Pokémon Educativa',
    environment: env.nodeEnv,
    version: '1.0.0',
    endpoints: {
      pokemon: '/api/pokemon',
      documentation: '/api-docs',
      health: '/health',
    },
    config: {
      cache_ttl: `${env.cache.ttl} segundos`,
      rate_limit: `${env.security.rateLimit.max} peticiones por minuto`,
    },
  });
});

// Health check mejorado
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'pokemon-api',
    environment: env.nodeEnv,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// Ruta para ver configuración (solo en desarrollo)
if (env.isDevelopment()) {
  app.get('/config', (req, res) => {
    res.json({
      environment: env.nodeEnv,
      pokeapi: env.pokeApi,
      cache: env.cache,
      security: {
        rateLimit: env.security.rateLimit,
      },
    });
  });
}

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = env.isProduction() 
    ? 'Error interno del servidor' 
    : err.message;
  
  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path,
    ...(env.isDevelopment() && { stack: err.stack }),
  });
});

// Iniciar servidor
const port = env.port;
app.listen(port, () => {
  console.log('='.repeat(50));
  console.log('🚀 API Pokémon Educativa');
  console.log('='.repeat(50));
  console.log(`🌍 Ambiente: ${env.nodeEnv}`);
  console.log(`🚪 Puerto: ${port}`);
  console.log(`🔗 URL: http://localhost:${port}`);
  console.log(`📚 Documentación: http://localhost:${port}/api-docs`);
  console.log(`🏥 Health check: http://localhost:${port}/health`);
  console.log('='.repeat(50));
  
  if (env.isDevelopment()) {
    console.log('💡 Consejo: Usa .env para configurar variables');
    console.log('🔧 Configuración: http://localhost:3000/config');
  }
});