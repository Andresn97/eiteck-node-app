
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    require: [ true, 'El nombre es obligatorio' ]
  },
  email: {
    type: String,
    require: [ true, 'El correo electrónico es obligatorio' ],
    unique: true
  },
  password: {
    type: String,
    require: [ true, 'La contraseña es obligatoria' ]
  },
  role: {
    type: String,
    require: true,
    enum: [ 'ADMIN_ROLE', 'USER_ROLE', 'DELIVERY_ROLE' ],
    default: 'USER_ROLE'
  },
  state: {
    type: Boolean,
    default: true
  }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = model( 'User', UserSchema );