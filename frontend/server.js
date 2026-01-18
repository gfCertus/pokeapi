require('dotenv').config();
const express = require('express');
const path = require('path');

// Importar rutas
const pokemonRoutes = require('./routes/pokemonRoutes');
const viewMiddleware = require('./middleware/viewMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // IMPORTANTE: Solo busca en /views

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para vistas
app.use(viewMiddleware);

// Rutas
app.use('/', pokemonRoutes);

// ===== MANEJO DE ERRORES =====

// 404 - Para rutas no encontradas
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Página no encontrada',
    page: '404',
    requestedUrl: req.url 
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err.stack);
  
  res.status(500).render('500', { 
    title: 'Error del servidor',
    page: '500',
    error: process.env.NODE_ENV === 'development' ? err.message : null 
  });
});

// ===== INICIAR SERVIDOR =====

app.listen(PORT, () => {
  console.log(`Frontend ejecutándose en http://localhost:${PORT}`);
  console.log(`Vistas configuradas en: ${path.join(__dirname, 'views')}`);
});