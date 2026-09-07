const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion } = require('../controllers/usuarioController');

// Ruta POST para registrarse: http://localhost:5000/api/usuarios/registro
router.post('/registro', registrarUsuario);

// Ruta POST para iniciar sesión: http://localhost:5000/api/usuarios/login
router.post('/login', iniciarSesion);

module.exports = router;