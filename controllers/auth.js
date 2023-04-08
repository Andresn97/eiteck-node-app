const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');


const createUser = async ( req, res = response ) => {
  try {
    const { password } = req.body;
    const user = new User( req.body );
  
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    await user.save();
    
    return res.status(201).json({
      ok: true,
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }

}

const loginUser = async ( req, res = response ) => {

  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'Correo Electrónico Incorrecto',
      });
    }

    if ( !user.state ) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario Inactivo',
      });
    }

    const validPassword = bcrypt.compareSync( password, user.password );

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña Incorrecta',
      });
    }

    const token = await generateJWT( user.id, user.name );

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }

}

const reloadToken = async ( req, res ) => {

  console.log(req.user);
  const { id, name } = req.user;

  const token = await generateJWT( id, name );

  res.json({
    ok: true,
    token
  });
}


module.exports = { 
  createUser,
  loginUser,
  reloadToken
}