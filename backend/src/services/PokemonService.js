const axios = require('axios');
const env = require('../config/env');

class PokemonService {
  constructor() {
    // Usar variables de entorno
    this.baseURL = env.pokeApi.baseURL;
    this.timeout = env.pokeApi.timeout;
    this.retries = env.pokeApi.retries;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'User-Agent': 'Pokemon-Educational-API/1.0',
      },
    });
    
    // Configurar interceptores para reintentos
    this.setupInterceptors();
  }

  setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;
        
        // Si no tiene config o ya se intentó muchas veces
        if (!config || config.__retryCount >= this.retries) {
          return Promise.reject(error);
        }
        
        // Incrementar contador de reintentos
        config.__retryCount = config.__retryCount || 0;
        config.__retryCount += 1;
        
        // Esperar antes de reintentar (backoff exponencial)
        const delay = Math.pow(2, config.__retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Reintentar la petición
        return this.client(config);
      }
    );
  }

  async getPokemonById(id) {
    try {
      console.log(`🔍 Buscando Pokémon con ID: ${id}`);
      const response = await this.client.get(`/pokemon/${id}`);
      
      if (env.isDevelopment()) {
        console.log(`✅ Pokémon encontrado: ${response.data.name}`);
      }
      
      return this.formatPokemonData(response.data);
    } catch (error) {
      console.error(`❌ Error obteniendo Pokémon ${id}:`, error.message);
      throw new Error(`Pokémon con ID ${id} no encontrado`);
    }
  }

  async getPokemonByName(name) {
    try {
      console.log(`🔍 Buscando Pokémon: ${name}`);
      const response = await this.client.get(`/pokemon/${name.toLowerCase()}`);
      
      if (env.isDevelopment()) {
        console.log(`✅ Pokémon encontrado: ${response.data.name}`);
      }
      
      return this.formatPokemonData(response.data);
    } catch (error) {
      console.error(`❌ Error obteniendo Pokémon "${name}":`, error.message);
      throw new Error(`Pokémon "${name}" no encontrado`);
    }
  }

  formatPokemonData(pokemonData) {
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      sprites: {
        front_default: pokemonData.sprites.front_default,
        front_shiny: pokemonData.sprites.front_shiny,
        official_artwork: pokemonData.sprites.other?.['official-artwork']?.front_default || null,
      },
      types: pokemonData.types.map(type => type.type.name),
      height: pokemonData.height / 10,
      weight: pokemonData.weight / 10,
      abilities: pokemonData.abilities.map(ability => ({
        name: ability.ability.name,
        is_hidden: ability.is_hidden,
      })),
      base_experience: pokemonData.base_experience,
      stats: pokemonData.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      // Datos adicionales para aprendizaje
      _metadata: {
        source: 'PokeAPI',
        fetched_at: new Date().toISOString(),
        environment: env.nodeEnv,
      },
    };
  }

  async getPokemonCries(id) {
    try {
      const response = await this.client.get(`/pokemon/${id}`);
      const cries = response.data.cries;
      
      if (!cries) {
        return { 
          latest: null, 
          legacy: null,
          message: 'Este Pokémon no tiene sonidos disponibles'
        };
      }
      
      return {
        latest: cries.latest || null,
        legacy: cries.legacy || null,
      };
    } catch (error) {
      throw new Error('No se pudieron obtener los sonidos');
    }
  }

  async getPokemonList(limit = 20, offset = 0) {
    try {
      const response = await this.client.get(`/pokemon?limit=${limit}&offset=${offset}`);
      
      // Para fines educativos, podemos agregar información adicional
      return {
        results: response.data.results,
        count: response.data.count,
        pagination: {
          limit,
          offset,
          next: response.data.next ? `?limit=${limit}&offset=${offset + limit}` : null,
          previous: response.data.previous ? `?limit=${limit}&offset=${Math.max(0, offset - limit)}` : null,
        },
        _educational: {
          note: 'Este endpoint muestra paginación básica',
          example_query: `/api/pokemon?limit=${limit}&offset=${offset}`,
        },
      };
    } catch (error) {
      throw new Error('Error obteniendo lista de Pokémon');
    }
  }
}

module.exports = PokemonService;