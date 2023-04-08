const bcrypt = require('bcryptjs');

const Role = require("../models/Role");
const User = require("../models/User");


const isRoleValid = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if ( !existsRole ) throw new Error(
    `El rol ${ role } no está registrado, por lo tanto no está permitido.`
  );
}

const isEmailValid = async (email = '') => {
  const user = await User.findOne({ email }); 

  if (user) throw new Error(
    `El correo ingresado no es correcto.`
  ); 
}

// const isEmailInDB = async (email = '') => {
//   const user = await User.findOne({ email }); 

//   if (!user) throw new Error(
//     'Correo Electrónico Incorrecto'
//   ); 
// }

const existsUserById = async ( id ) => {
console.log('entros');
  const currentUser = await User.findById(id);
  if ( !currentUser ) {
    throw new Error(`El id no existe ${ id }`);
  }
}

// const isPasswordValid = async ( password = '', { req } ) => {
//   const email = req.body.email;
//   const user = await User.findOne({ email }); 

//   if ( !email ) throw new Error('Correo Electrónico Incorrecto');

//   const validPassword = bcrypt.compareSync( password, user.password );

//   if ( !validPassword ) throw new Error('Contraseña Incorrecta');

// }

module.exports = {
  isRoleValid,
  isEmailValid,
  // isEmailInDB,
  // isPasswordValid,
  existsUserById
}

