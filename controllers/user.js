const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/User');

const getUsers = async(req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

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

  if ( password ) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate( id, rest );

  res.json({
    ok: true,
    user
  });
}

const deleteUser = async(req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate( 
    id, { state: false } 
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