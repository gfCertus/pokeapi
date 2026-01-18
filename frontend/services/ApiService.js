const axios = require('axios');

class ApiService {
  constructor() {
    this.baseURL = process.env.API_URL || 'http://localhost:3000';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });
  }

  async getPokemonList(limit = 20, offset = 0) {
    try {
      const response = await this.client.get(`/api/pokemon?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Error obteniendo lista de Pokémon');
    }
  }

  async getPokemonById(id) {
    try {
      const response = await this.client.get(`/api/pokemon/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Pokémon con ID ${id} no encontrado`);
    }
  }

  async getPokemonByName(name) {
    try {
      const response = await this.client.get(`/api/pokemon/name/${name}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Pokémon "${name}" no encontrado`);
    }
  }

  async getPokemonCries(id) {
    try {
      const response = await this.client.get(`/api/pokemon/${id}/cries`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'No se pudieron obtener los sonidos');
    }
  }

  handleError(error, customMessage) {
    if (error.response) {
      // El servidor respondió con un código de error
      return new Error(error.response.data.error || customMessage);
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      return new Error('No se pudo conectar con el servidor');
    } else {
      // Error al configurar la petición
      return new Error(customMessage || 'Error en la petición');
    }
  }
}

module.exports = ApiService;