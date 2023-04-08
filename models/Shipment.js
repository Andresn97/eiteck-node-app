const { Schema, model } = require('mongoose');


const ShipmentSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: [ true, 'El usuario es requerido' ]
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    require: [ true, 'La orden es requerida' ]
  },
  sent_state: {
    type: String,
    require: [ true, 'El estado del envío es obligatorio' ],
    enum: [ 'PENDING', 'GIVING_OUT', 'DELIVERED' ],
    default: 'PENDING'
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

ShipmentSchema.methods.toJSON = function() {
  const { __v, ...shipment } = this.toObject();
  return shipment;
}


module.exports = model('Shipment', ShipmentSchema);