const express = require('express');
const bodyParser = require('body-parser');
const notificationRoutes = require('./infrastructure/routes');

const app = express();

app.use(bodyParser.json());

// Middleware para logging de cada solicitud (tracking)
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Rutas definidas
app.use('/', notificationRoutes);

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en la solicitud:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
