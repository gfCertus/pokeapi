const PokemonService = require('../services/PokemonService');

class PokemonController {
  constructor() {
    this.pokemonService = new PokemonService();
  }

  // GET /api/pokemon/:id
  async getPokemonById(req, res) {
    try {
      const { id } = req.params;
      const pokemon = await this.pokemonService.getPokemonById(id);
      res.json({
        success: true,
        data: pokemon,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/pokemon/name/:name
  async getPokemonByName(req, res) {
    try {
      const { name } = req.params;
      const pokemon = await this.pokemonService.getPokemonByName(name);
      res.json({
        success: true,
        data: pokemon,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/pokemon/:id/cries
  async getPokemonCries(req, res) {
    try {
      const { id } = req.params;
      const cries = await this.pokemonService.getPokemonCries(id);
      res.json({
        success: true,
        data: cries,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/pokemon
  async getPokemonList(req, res) {
    try {
      const { limit = 20, offset = 0 } = req.query;
      const pokemonList = await this.pokemonService.getPokemonList(
        parseInt(limit),
        parseInt(offset)
      );
      res.json({
        success: true,
        data: pokemonList,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = PokemonController;