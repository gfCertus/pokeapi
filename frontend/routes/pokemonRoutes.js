const express = require('express');
const PokemonController = require('../controllers/PokemonController');

const router = express.Router();
const pokemonController = new PokemonController();

// Rutas principales
router.get('/', (req, res) => pokemonController.getHome(req, res));
router.get('/pokemon', (req, res) => pokemonController.getPokemonList(req, res));
router.get('/pokemon/:id', (req, res) => pokemonController.getPokemonDetail(req, res));
router.get('/search', (req, res) => pokemonController.searchPokemon(req, res));

// Rutas de error (para testing - opcional)
router.get('/error/:type', (req, res) => pokemonController.getError(req, res));

module.exports = router;