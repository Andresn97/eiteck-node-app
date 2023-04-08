const { Router } = require('express');
const { check } = require('express-validator');

const { 
  getSingleShipment, 
  setShipment, 
  updateShipment, 
  deleteShipment 
} = require('../controllers/shipment');
const { 
  validateJWT, 
  hasRole, 
  fieldValidate 
} = require('../middlewares');
const { existsUserById } = require('../helpers/db-validators');
const { existsOrderId } = require('../middlewares/order-validators');
const { existsShipmentById } = require('../middlewares/shipment-validators');


const router = Router();

router.get(
  '/:id', 
  [
    validateJWT,
    hasRole('ADMIN_ROLE', 'DELIVERY_ROLE'),
  ],
  getSingleShipment
);

router.post(
  '/new',
  [
    validateJWT,
    hasRole('ADMIN_ROLE', 'DELIVERY_ROLE'),
    check('order')
      .notEmpty()
      .withMessage('La orden es requerida')
      .custom( existsOrderId ),
    check('sent_state')
      .isIn(['PENDING', 'GIVING_OUT', 'DELIVERED'])
      .withMessage('El estado enviado no es correcto'),
    fieldValidate
  ], 
  setShipment
  );

router.put(
  '/:id',
  [
    validateJWT,
    hasRole('ADMIN_ROLE', 'DELIVERY_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsShipmentById ),
    check('sent_state')
      .isIn(['PENDING', 'GIVING_OUT', 'DELIVERED'])
      .withMessage('El estado enviado no es correcto'),
    fieldValidate
  ], 
  updateShipment
);

router.delete(
  '/:id',
  [
    validateJWT,
    hasRole('ADMIN_ROLE', 'DELIVERY_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsShipmentById ),
    fieldValidate
  ],
  deleteShipment
);


module.exports = router;