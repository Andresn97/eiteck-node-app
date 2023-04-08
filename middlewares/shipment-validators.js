const Shipment = require("../models/Shipment");


const existsShipmentById = async ( id ) => {

  const shipment = await Shipment.findById(id);
  if ( !shipment ) {
    throw new Error(`El id no existe ${ id }`);
  }
}

module.exports = {
  existsShipmentById
}