const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');



const validateJWT = async ( req, res = response, next ) => {

  const token = req.header('x-token');

    if ( !token ) {
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición'
      });
    }

    try {
      const { uid } = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
      );

      const user = await User.findById( uid );

      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: 'Token no válido - Usuario Inválido'
        });
      }

      if ( !user.state ) return
        return res.status(400).json({
          ok: false,
          msg: 'Token no válido - Usuario Inactivo'
        });

      req.user = user;

    } catch (error) {
      console.log(error);
      return res.status(401).json({
        ok: false,
        msg: 'Token no válido'
      });
    }
    
    next();
}


module.exports = {
  validateJWT
}