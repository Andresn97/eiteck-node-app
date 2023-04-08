const { Schema, model } = require('mongoose');


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
  payment_method: {
    type: String,
    require: [ true, 'El método de pago del pedido es obligatorio.' ],
    enum: [ 'CASH', 'CARD' ],
    default: 'CASH'
  },
  total: {
    type: Number,
    require: [ true, 'El valor total del pedido es obligatorio.' ]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: [ true, 'El usuario es requerido' ]
  },
  bread_boxes: {
    type: [Schema.Types.ObjectId],
    ref: 'BreadBox',
    require: [ true, 'Por lo menos se debe ingresar una caja al pedido.' ]
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

OrderSchema.methods.toJSON = function() {
  const { __v, ...order } = this.toObject();
  return order;
}

module.exports = model( 'Order', OrderSchema );