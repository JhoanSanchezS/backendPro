const Consumo = require('../models/Consumo');

// 1. Función para registrar (Crear)
const registrarConsumo = async (req, res) => {
  try {
    const { usuario, tipoServicio, mesRegistrado, cantidadConsumida, costoFactura } = req.body;
    const nuevoConsumo = new Consumo({ usuario, tipoServicio, mesRegistrado, cantidadConsumida, costoFactura });
    await nuevoConsumo.save();
    res.status(201).json({ mensaje: '¡Factura guardada con éxito!', consumo: nuevoConsumo });
  } catch (error) {
    console.error('Error al guardar el consumo:', error);
    res.status(500).json({ mensaje: 'Hubo un error en el servidor al guardar los datos' });
  }
};

// 2. Función para obtener (Leer)
const obtenerConsumos = async (req, res) => {
  try {
    const consumos = await Consumo.find().sort({ mesRegistrado: 1 });
    res.status(200).json(consumos);
  } catch (error) {
    console.error('Error al obtener los consumos:', error);
    res.status(500).json({ mensaje: 'Hubo un error al buscar los datos' });
  }
};

// 3. NUEVA FUNCIÓN: Eliminar un recibo (Borrar)
const eliminarConsumo = async (req, res) => {
  try {
    const { id } = req.params; // Tomamos el ID del recibo que queremos borrar
    await Consumo.findByIdAndDelete(id); // Le decimos a MongoDB que lo destruya
    res.status(200).json({ mensaje: 'Recibo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el consumo:', error);
    res.status(500).json({ mensaje: 'Hubo un error al intentar eliminar el recibo' });
  }
};

// Exportamos las TRES funciones
module.exports = { registrarConsumo, obtenerConsumos, eliminarConsumo };