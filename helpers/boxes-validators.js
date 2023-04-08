const BreadBox = require('../models/BreadBox');

const existsBreadBoxById = async ( id ) => {
  try {

    const currentBox = await BreadBox.findById(id);
    if ( !currentBox ) {
      throw new Error(`El id no existe ${ id }`);
    }
    
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Ocurrió un error, consulte con el administrador [BreadBox]'
    });
  }
}

module.exports = {
  existsBreadBoxById
}