const { response } = require('express');


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
      msg: `${ name } no es Adminstrador, no puede realizar esta acción`
    });
  }
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

module.exports = {
  isAdminRole,
  hasRole
}

