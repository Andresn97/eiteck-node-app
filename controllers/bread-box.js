const { response, request } = require('express');
const BreadBox = require('../models/BreadBox');


const getBreadBoxes = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [ total, boxes ] = await Promise.all([
    BreadBox.countDocuments(query),
    BreadBox.find(query)
        .skip( Number( from ) )
        .limit(Number( limit ))
  ]);

  res.json({
    ok: true,
    total,
    boxes
  });
}

const setBreadBox = async ( req, res = response ) => {
  try {
    const breadBox = new BreadBox( req.body );
  
    await breadBox.save();
    
    return res.status(201).json({
      ok: true,
      breadBox
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador [BreadBox]',
    });
  }
}

const updateBreadBox = async ( req, res = response ) => {

  const { id } = req.params;
  const { _id, state, created_at, ...rest } = req.body;

  try {
  
    const box = await BreadBox.findByIdAndUpdate( id, rest );
    
    res.json({
      ok: true,
      box
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Ocurrió un error, consulte con el administrador [BreadBox]'
    });  
  }
}

const deleteBreadBox = async ( req, res = response ) => {
  const { id } = req.params;

  const box = await BreadBox.findByIdAndUpdate( 
    id, { state: false } , { new: true }
  );

  res.json({
    ok: true,
    box
  });
}


module.exports = {
  getBreadBoxes,
  setBreadBox,
  updateBreadBox,
  deleteBreadBox
}