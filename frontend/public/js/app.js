// Aplicación principal
class PokemonApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSearch();
    this.setupAudioPlayers();
    this.setupPagination();
  }

  setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
  }

  setupSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('#search-input');
    
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        const query = searchInput.value.trim();
        if (!query) {
          e.preventDefault();
          searchInput.focus();
        }
      });
      
      // Auto-focus en campo de búsqueda
      searchInput.focus();
    }
  }

  setupAudioPlayers() {
    // Configurar todos los reproductores de audio
    document.querySelectorAll('audio').forEach(audio => {
      audio.addEventListener('play', (e) => {
        // Pausar otros audios cuando uno se reproduce
        document.querySelectorAll('audio').forEach(otherAudio => {
          if (otherAudio !== e.target) {
            otherAudio.pause();
          }
        });
      });
    });
  }

  setupPagination() {
    // Manejar botones de paginación
    document.querySelectorAll('.pagination-btn').forEach(btn => {
      if (!btn.classList.contains('disabled')) {
        btn.addEventListener('click', () => {
          const page = btn.dataset.page;
          if (page) {
            window.location.href = `?page=${page}`;
          }
        });
      }
    });
  }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new PokemonApp();
});