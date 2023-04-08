const { response } = require('express');
const Shipment = require('../models/Shipment');
const User = require('../models/User');
const Order = require('../models/Order');


const getSingleShipment = async ( req, res = response ) => {
  const { id } = req.params;

  try {
    
    const shipment = await Shipment.findById( id );
    
    if ( !shipment ) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontró esta orden'
      });  
    }

    const currentUser = await User.findById( shipment.user )
                                  .select(['-password', '-__v', '-role'] );

    if ( !currentUser ) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontró el usuario del envío'
      });  
    }

    const currentOrder = await Order.findById( shipment.order )
                                  .select(['name', 'total'] );

    if ( !currentOrder ) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontró el pedido'
      });  
    }

    shipment.user = currentUser;
    shipment.order = currentOrder;

    res.json({
      ok: true,
      shipment
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador [Shipment]',
    });
  }
}

const setShipment = async ( req, res = response ) => {
  try {

    const { _id } = req.user;
    const { user } = req.body;
    let currentUser;

    if ( !user ) {
      currentUser = await User.findById( _id ).select(['_id', 'name', 'email']);
  
      if ( !currentUser ) {
        return res.status(400).json({
          ok: false,
          msg: 'No se encontró el usuario actual'
        });  
      }
    }

    const data = {
      ...req.body,
      user: currentUser ? currentUser : user,
    };

    const shipment = new Shipment( data );
  
    await shipment.save();
    
    return res.status(201).json({
      ok: true,
      shipment
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador [Order]',
    });
  }
}

const updateShipment = async ( req, res = response ) => {
  const { id } = req.params;
  const { sent_state } = req.body;

  try {

    const shipment = await Shipment.findByIdAndUpdate( id, { sent_state }, { new: true } );
  
    res.json({
      ok: true,
      shipment
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Ocurrió un error, consulte con el administrador [Order]'
    });  
  }

}

const deleteShipment = async ( req, res = response ) => {
  const { id } = req.params;

  const shipment = await Shipment.findByIdAndUpdate( 
    id, { state: false } , { new: true }
  );

  res.json({
    ok: true,
    shipment
  });
}


module.exports = {
  getSingleShipment,
  setShipment,
  updateShipment,
  deleteShipment
}