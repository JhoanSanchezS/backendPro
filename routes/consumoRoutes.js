const express = require('express');
const router = express.Router();
const { registrarConsumo, obtenerConsumos, eliminarConsumo } = require('../controllers/consumoController');

// Ruta POST: Para GUARDAR datos
router.post('/', registrarConsumo);

// Ruta GET: Para LEER los datos
router.get('/', obtenerConsumos);

// Ruta DELETE: Para BORRAR un dato específico usando su ID
router.delete('/:id', eliminarConsumo);

module.exports = router;