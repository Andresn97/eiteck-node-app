const { Schema, model } = require('mongoose');


const Role = Schema({
  role: {
    type: String,
    required: [ true, 'El rol es obligatorio.' ]
  }
});

module.exports = model('Role', Role);