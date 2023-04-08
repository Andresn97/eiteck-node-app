const { response } = require('express');
const User = require('../models/User');


const isAdminRole = ( req, res = response, next ) => {

  if ( !req.user ) {
    return res.status(500).json({
      ok: false,
      msg: 'Se verifica el rol sin validar el token antes'
    });
  }

  const { role, name } = req.user;

  if ( role !== 'ADMIN_ROLE' ) {
    return res.status(400).json({
      ok: false,
      msg: `${ name } no tiene los permisos necesarios para realizar esta acción`
    });
  }

  next();

}

const hasRole = ( ...roles ) => {
  return ( req, res = response, next ) => { 
    
    if ( !req.user ) {
      return res.status(500).json({
        ok: false,
        msg: 'Se verifica el rol sin validar el token antes'
      });
    }

    const { role, name } = req.user;
    if ( !roles.includes( role ) ) {
      return res.status(400).json({
        ok: false,
        msg: `${ name } no presenta el rol necesario para realizar esta acción`
      });
    }
    
    next(); 

  }
}

const isTheSameRole = ( req, res = response, next ) => {

  if ( !req.user ) {
    return res.status(500).json({
      ok: false,
      msg: 'Se verifica el rol sin validar el token antes'
    });
  }

  const { role, name, id } = req.user;
  const currentId = req.params;
  console.log('user-resp', currentId);
  console.log('user-jwt', id);

  if ( (id !== currentId.id) ) {
    if ( role !== 'ADMIN_ROLE' ) {
      return res.status(400).json({
        ok: false,
        msg: `${ name } no tiene los permisos necesarios para esta acción sdsd`
      });
    }
  }
  
  next(); 

}

module.exports = {
  isAdminRole,
  hasRole,
  isTheSameRole
}

