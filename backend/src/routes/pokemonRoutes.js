const express = require('express');
const PokemonController = require('../controllers/pokemonController');

const router = express.Router();
const pokemonController = new PokemonController();

/**
 * @swagger
 * /api/pokemon:
 *   get:
 *     summary: Obtiene lista de Pokémon
 *     description: Retorna una lista paginada de Pokémon
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Número de Pokémon por página
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de Pokémon a saltar
 *     responses:
 *       200:
 *         description: Lista de Pokémon
 */
router.get('/', pokemonController.getPokemonList.bind(pokemonController));

/**
 * @swagger
 * /api/pokemon/{id}:
 *   get:
 *     summary: Obtiene un Pokémon por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 25
 *         description: ID del Pokémon
 *     responses:
 *       200:
 *         description: Información del Pokémon
 *       404:
 *         description: Pokémon no encontrado
 */
router.get('/:id', pokemonController.getPokemonById.bind(pokemonController));

/**
 * @swagger
 * /api/pokemon/name/{name}:
 *   get:
 *     summary: Obtiene un Pokémon por nombre
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: pikachu
 *         description: Nombre del Pokémon
 *     responses:
 *       200:
 *         description: Información del Pokémon
 *       404:
 *         description: Pokémon no encontrado
 */
router.get('/name/:name', pokemonController.getPokemonByName.bind(pokemonController));

/**
 * @swagger
 * /api/pokemon/{id}/cries:
 *   get:
 *     summary: Obtiene los sonidos de un Pokémon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 25
 *         description: ID del Pokémon
 *     responses:
 *       200:
 *         description: Sonidos del Pokémon
 *       404:
 *         description: Pokémon no encontrado
 */
router.get('/:id/cries', pokemonController.getPokemonCries.bind(pokemonController));

module.exports = router;