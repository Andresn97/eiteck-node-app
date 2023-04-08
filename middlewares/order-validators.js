const { response } = require('express');
const Order = require('../models/Order');


const isTheClientInOrder = async ( req, res = response, next ) => {

  const { id } = req.params;
  
  try {
    
    const currentOrder = await Order.findById( id );

    if ( !currentOrder ) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontró la orden enviada'
      });  
    }
    const { user } = currentOrder;
    const currentUser = req.user;

    if ( user.toString() !== currentUser.id ) {
      if ( currentUser.role !== 'ADMIN_ROLE' ) {
        return res.status(400).json({
          ok: false,
          msg: `${ currentUser.name } no tiene los permisos suficientes para realizar esta acción`
        });
      }
    }

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Ocurrió un error, consulte con el administrador [Order]'
    });
  }

  next();

}

const existsOrderId = async ( id = 0 ) => {
  try {

    const currentOrder = await Order.findById(id);
    if ( !currentOrder ) {
      throw new Error(`El id no existe ${ id }`);
    }
    
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Ocurrió un error, consulte con el administrador [Order]'
    });
  }
}


module.exports = {
  isTheClientInOrder,
  existsOrderId
}