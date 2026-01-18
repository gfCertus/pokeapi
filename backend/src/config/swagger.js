const swaggerJsdoc = require('swagger-jsdoc');
const env = require('./env');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: env.swagger.title,
      version: '1.0.0',
      description: env.swagger.description,
      contact: {
        name: 'Equipo Educativo',
        email: 'educacion@pokemon-api.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Servidor local',
      },
      {
        url: 'https://api.pokemon-educativo.com',
        description: 'Servidor de producción',
      },
    ],
    components: {
      schemas: {
        Pokemon: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 25,
              description: 'ID único del Pokémon',
            },
            name: {
              type: 'string',
              example: 'pikachu',
              description: 'Nombre del Pokémon en inglés',
            },
            sprites: {
              type: 'object',
              properties: {
                front_default: {
                  type: 'string',
                  format: 'url',
                  example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
                },
              },
            },
            types: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['electric'],
              description: 'Tipos del Pokémon',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Pokémon no encontrado',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            path: {
              type: 'string',
              example: '/api/pokemon/9999',
            },
          },
        },
      },
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    externalDocs: {
      description: 'Documentación completa del proyecto',
      url: 'https://github.com/tu-usuario/pokemon-api-educativo',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;