const ApiService = require('../services/ApiService');

class PokemonController {
  constructor() {
    this.apiService = new ApiService();
  }

  async getHome(req, res) {
    try {
      res.render('index', { 
        title: 'Pokédex',
        page: 'home'
      });
    } catch (error) {
      res.render('error', {
        title: 'Error',
        message: 'Error cargando la página principal'
      });
    }
  }

  async getPokemonList(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 20;
      const offset = (page - 1) * limit;

      const data = await this.apiService.getPokemonList(limit, offset);
      
      res.render('pokemon-list', {
        title: 'Lista de Pokémon',
        page: 'pokemon-list',
        pokemons: data.data.results || [],
        pagination: {
          current: page,
          total: Math.ceil((data.data.count || 0) / limit),
          hasNext: data.data.pagination?.next !== null,
          hasPrev: data.data.pagination?.previous !== null
        }
      });
    } catch (error) {
      res.render('error', {
        title: 'Error',
        page: 'error',
        message: error.message
      });
    }
  }

  async getPokemonDetail(req, res) {
    try {
      const { id } = req.params;
      
      const pokemonData = await this.apiService.getPokemonById(id);
      const criesData = await this.apiService.getPokemonCries(id).catch(() => null);
      
      res.render('pokemon-detail', {
        title: `Pokémon #${id}`,
        page: 'pokemon-detail',
        pokemon: pokemonData.data,
        cries: criesData?.data || null
      });
    } catch (error) {
      res.render('error', {
        title: 'Pokémon no encontrado',
        page: 'error',
        message: error.message
      });
    }
  }

  async searchPokemon(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.render('search', {
          title: 'Buscar Pokémon',
          page: 'search',
          searchTerm: '',
          results: null,
          error: null
        });
      }

      let results = null;
      let error = null;
      
      // Intentar buscar por ID
      if (/^\d+$/.test(q)) {
        try {
          const data = await this.apiService.getPokemonById(q);
          results = data.data;
        } catch (idError) {
          error = idError.message;
        }
      }
      
      // Si no se encontró por ID o no es número, buscar por nombre
      if (!results && !error) {
        try {
          const data = await this.apiService.getPokemonByName(q);
          results = data.data;
        } catch (nameError) {
          error = nameError.message;
        }
      }

      res.render('search', {
        title: error ? 'Buscar Pokémon' : `Resultados: ${q}`,
        page: 'search',
        searchTerm: q,
        results: results,
        error: error
      });
    } catch (error) {
      res.render('error', {
        title: 'Error en búsqueda',
        page: 'error',
        message: error.message
      });
    }
  }



  
}

module.exports = PokemonController;