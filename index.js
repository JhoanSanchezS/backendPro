const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Conexión a MongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017/mi_base_datos'; // Asegúrate de que sea tu URL

mongoose.connect(MONGO_URI)
  .then(() => console.log('¡Conexión exitosa a MongoDB!'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// ==========================================
// 🔌 AQUÍ CONECTAMOS NUESTRAS NUEVAS RUTAS
// ==========================================
const consumoRoutes = require('./routes/consumoRoutes');
// Le decimos a Express que cualquier petición que vaya a /api/consumo use ese archivo
app.use('/api/consumo', consumoRoutes);
// ==========================================

// Ruta de prueba (la que ya tenías)
app.get('/api/prueba', (req, res) => {
  res.json({ mensaje: '¡Hola desde tu nuevo backend conectado a MongoDB!' });
});

// --- RUTAS ---
app.use('/api/consumo', require('./routes/consumoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes')); // <- ESTA ES LA LÍNEA NUEVA

// --- INICIAR SERVIDOR ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en la puerta (puerto) ${PORT}`);
});