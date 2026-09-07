const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true // Esto borra los espacios en blanco accidentales
  },
  correo: {
    type: String,
    required: true,
    unique: true, // ¡Garantiza que no haya dos cuentas con el mismo correo!
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Guarda la fecha y hora exacta en la que se creó la cuenta
});

module.exports = mongoose.model('Usuario', usuarioSchema);