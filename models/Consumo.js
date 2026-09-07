const mongoose = require('mongoose');

const consumoSchema = new mongoose.Schema({
  // Esta línea es magia pura: vincula el recibo con la familia que lo subió
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  tipoServicio: {
    type: String,
    enum: ['Agua', 'Energía', 'Gas'],
    required: true
  },
  mesRegistrado: {
    type: String, // Ejemplo: "2026-08" para Agosto 2026
    required: true
  },
  cantidadConsumida: {
    type: Number, // Los kWh o Metros Cúbicos
    required: true
  },
  costoFactura: {
    type: Number, // El valor que pagaron en pesos
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Consumo', consumoSchema);