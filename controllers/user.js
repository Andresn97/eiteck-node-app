const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/User');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
        .skip( Number( from ) )
        .limit(Number( limit ))
  ]);

  res.json({
    ok: true,
    total,
    users
  });
}

const updateUser = async ( req, res = response ) => {
  const { id } = req.params;
  const { _id, password, email, ...rest } = req.body;

  try {

    if ( password ) {
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync( password, salt );
    }
  
    const user = await User.findByIdAndUpdate( id, rest, { new: true } );
    
    res.json({
      ok: true,
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Ocurrió un error, consulte con el administrador [User]'
    });  
  }
}

const deleteUser = async(req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate( 
    id, { state: false } , { new: true }
  );

  res.json({
    ok: true,
    user
  });
}


module.exports = { 
  getUsers,
  updateUser,
  deleteUser
}