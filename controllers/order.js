const { response } = require('express');
const Order = require('../models/Order');
const BreadBox = require('../models/BreadBox');
const User = require('../models/User');


const getOrders = async ( req, res = response ) => {

  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [ total, orders ] = await Promise.all([
    Order.countDocuments(query),
    Order.find(query)
        .skip( Number( from ) )
        .limit(Number( limit ))
  ]);

  res.json({
    ok: true,
    total,
    orders
  });

}

const getSingleOrder = async ( req, res = response ) => {
  const { id } = req.params;

  try {
    
    const order = await Order.findById( id );
    
    if ( !order ) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontró esta orden'
      });  
    }

    const currentUser = await User.findById( order.user )
                                  .select(['-password', '-__v', '-role'] );

    if ( !currentUser ) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontró el cliente del pedido'
      });  
    }

    order.user = currentUser;

    res.json({
      ok: true,
      order
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador [Order]',
    });
  }
}

const setOrder = async ( req, res = response ) => {
  try {

    const { _id } = req.user;
    const { bread_boxes } = req.body;

    for (let index = 0; index < bread_boxes.length; index++) {
      const currentId = bread_boxes[index];
      const currentBox = await BreadBox.findById( currentId );
      if ( !currentBox ) {
        return res.status(400).json({
          ok: false,
          msg: 'Alguna caja ingresada no corresponde con la base de datos.'
        }); 
      }

    }

    const data = {
      ...req.body,
      user: _id,
      bread_boxes
    };

    const order = new Order( data );
  
    await order.save();
    
    return res.status(201).json({
      ok: true,
      order
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador [Order]',
    });
  }
}

const updateOrder = async ( req, res = response ) => {
  const { id } = req.params;
  const { _id, state, created_at, user, ...rest } = req.body;

  try {

    const { bread_boxes } = req.body;

    for (let index = 0; index < bread_boxes.length; index++) {
      const currentId = bread_boxes[index];
      const currentBox = await BreadBox.findById( currentId );
      if ( !currentBox ) {
        return res.status(400).json({
          ok: false,
          msg: 'Alguna caja ingresada no corresponde con la base de datos.'
        }); 
      }
    }
  
    const order = await Order.findByIdAndUpdate( id, rest, { new: true } );
    
    res.json({
      ok: true,
      order
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Ocurrió un error, consulte con el administrador [Order]'
    });  
  }
}

const deleteOrder = async ( req, res = response ) => {
  const { id } = req.params;

  const order = await Order.findByIdAndUpdate( 
    id, { state: false } , { new: true }
  );

  res.json({
    ok: true,
    order
  });
}


module.exports = {
  getOrders,
  getSingleOrder,
  setOrder,
  updateOrder,
  deleteOrder
}
