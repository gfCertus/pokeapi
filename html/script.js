// Patrón de Módulo: Encapsulamos la lógica para evitar contaminar el scope global.
const PokemonPlayerModule = (() => {
    // Variables Privadas (solo accesibles dentro del Módulo)
    const POKEMON_ID = 25; // Pikachu
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${POKEMON_ID}`;
    
    const audioElement = document.getElementById('pokemonAudio');
    const statusMessage = document.getElementById('statusMessage');

    //     Función Privada: Realiza la llamada a la API y extrae el URL del sonido.
     
    const fetchPokemonSound = async () => {
        try {
            statusMessage.textContent = `Buscando datos del Pokémon #${POKEMON_ID}...`;
            
            // 1. Consumir la API
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('No se pudo cargar el Pokémon.');
            }
            const data = await response.json();
            
            // 2. Localizar el URL del sonido (Cry/Grito)
            const soundUrl = data.cries.latest;
            
            // 3. Devolver el URL
            return soundUrl;

        } catch (error) {
            console.error("Error en la API:", error);
            statusMessage.textContent = `Error: ${error.message}`;
            return null;
        }
    };

    /**
     * Función Privada: Inicializa el reproductor de audio.
     */
    const loadPlayer = async () => {
        const soundSource = await fetchPokemonSound();

        if (soundSource) {
            // Asignar el URL de la API de sonido al elemento <audio> de HTML5
            audioElement.src = soundSource;
            
            // Mostrar los controles y actualizar el estado
            audioElement.style.visibility = 'visible';
            statusMessage.classList.remove('alert-info');
            statusMessage.classList.add('alert-success');
            statusMessage.textContent = `¡Listo! Grito de ${POKEMON_ID}. Presiona play.`;
        } else {
             // Manejar el caso de URL no encontrado
             statusMessage.classList.remove('alert-info');
             statusMessage.classList.add('alert-danger');
        }
    };

    // Objeto Público: Solo exponemos la función de inicialización.
    return {
        // Función Pública: El punto de entrada para iniciar la aplicación.
        init: loadPlayer
    };
})();

// Punto de entrada: Cuando el DOM esté cargado, inicializa el módulo.
document.addEventListener('DOMContentLoaded', PokemonPlayerModule.init);
