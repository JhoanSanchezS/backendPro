const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // Traemos la herramienta de seguridad

// Función 1: Crear una cuenta nueva
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // 1. Verificamos si el correo ya está registrado en la base de datos
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'Este correo ya está en uso. Intenta con otro.' });
    }

    // 2. Encriptamos la contraseña (le ponemos el candado)
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // 3. Guardamos al nuevo usuario, pero con la contraseña ilegible
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      password: passwordEncriptada
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: '¡Cuenta creada con éxito!' });

  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Función 2: Iniciar Sesión (Validar los datos)
const iniciarSesion = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // 1. Buscamos si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      // Mensaje ambiguo por seguridad (no le decimos al hacker si falló el correo o la clave)
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    // 2. Comparamos la contraseña que escribió con la encriptada que tenemos guardada
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    // 3. Si todo coincide, le damos acceso y le devolvemos sus datos básicos (sin la contraseña)
    res.status(200).json({ 
      mensaje: '¡Inicio de sesión exitoso!', 
      usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo } 
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Exportamos las dos funciones
module.exports = { registrarUsuario, iniciarSesion };