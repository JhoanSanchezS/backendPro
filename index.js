const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Permite conexiones desde el frontend
app.use(express.json()); // Permite recibir datos en formato JSON

// Conexión a MongoDB (Reemplaza la URL si usas Atlas)
const MONGO_URI = 'mongodb://localhost:27017/proyectoWeb'; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('¡Conexión exitosa a MongoDB!'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Ruta de prueba
app.get('/api/prueba', (req, res) => {
  res.json({ mensaje: '¡Hola desde tu nuevo backend conectado a MongoDB!' });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});