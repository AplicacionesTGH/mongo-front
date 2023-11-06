const mongoose = require('mongoose');
const Marca = require('../conection/MaarcaModel');

// Definir el esquema del modelo Producto
const productoSchema = new mongoose.Schema({
  nombre: {
    type: String
  },
  idmarca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Marca' // Referencia a la colección de Marcas
  }
});

// Crear el modelo de Producto
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
