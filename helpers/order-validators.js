const { isValidObjectId } = require('mongoose');


const validateBreadBoxesInOrder = async ( breadBoxes = [] ) => {
  let areBoxesError = false;
  breadBoxes.forEach( async ( box ) => {
    
    if ( !isValidObjectId(box) ) {
      areBoxesError = true;
    }

  });

  if ( areBoxesError ) throw new Error('No se pudo encontrar alguna caja ingresada');

}

module.exports = {
  validateBreadBoxesInOrder
}