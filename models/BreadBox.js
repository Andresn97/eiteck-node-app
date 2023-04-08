
const { Schema, model } = require('mongoose');


const BreadBoxSchema = Schema({
  name: {
    type: String,
    require: [ true, 'El nombre de la caja es obligatorio.' ]
  },
  price: {
    type: String,
    require: [ true, 'El precio de la caja es obligatorio.' ]
  },
  total_units: {
    type: Number,
    require: [ true, 'El número de unidades es obligatorio.' ]
  },
  description: {
    type: String,
    require: [ true, 'La descripción de la caja es obligatoria.' ]
  },
  images: {
    type: [String],
    require: [ true, 'Por lo menos una imagen es obligatoria.' ]
  },
  state: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = model( 'BreadBox', BreadBoxSchema );