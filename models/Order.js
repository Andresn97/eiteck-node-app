const { Schema, model } = require('mongoose');
const BreadBox = require('./BreadBox');


const OrderSchema = Schema({
  name: {
    type: String,
    require: [ true, 'El nombre del pedido es obligatorio.' ]
  },
  address: {
    type: String,
    require: [ true, 'La dirección del pedido es obligatoria.' ]
  },
  phone: {
    type: String,
    require: [ true, 'El número de contacto para el pedido es obligatorio.' ]
  },
  payment_methods: {
    type: String,
    require: [ true, 'El método de pago del pedido es obligatorio.' ],
    enum: [ 'CASH', 'CARD' ],
    default: 'CASH'
  },
  bread_boxes: {
    type: [BreadBox],
    require: [ true, 'Por lo menos se debe ingresar una caja al pedido.' ]
  },
  total: {
    type: Number,
    require: [ true, 'El valor total del pedido es obligatorio.' ]
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

module.exports = model( 'Order', OrderSchema );