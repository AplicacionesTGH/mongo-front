const mongoose = require('mongoose');

// Definir el esquema del modelo Producto
const MarcaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }
});

// Crear el modelo de Producto
const Marca = mongoose.model('Marca', MarcaSchema);

module.exports = Marca;
