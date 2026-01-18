module.exports = (req, res, next) => {
  // Variables disponibles en todas las vistas
  res.locals.API_URL = process.env.API_URL || 'http://localhost:3000';
  res.locals.currentYear = new Date().getFullYear();
  res.locals.env = {
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV !== 'production'
  };
  
  next();
};