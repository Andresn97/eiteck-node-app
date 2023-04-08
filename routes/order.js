const { Router } = require('express');
const { check } = require('express-validator');

const { hasRole, validateJWT, fieldValidate } = require('../middlewares');
const { 
  getSingleOrder, 
  getOrders, 
  setOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/order');
const { validateBreadBoxesInOrder } = require('../helpers/order-validators');
const { isTheClientInOrder, existsOrderId } = require('../middlewares/order-validators');



const router = Router();

router.get(
  '/', 
  [ 
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DELIVERY_ROLE'),
  ], 
  getOrders
);

router.get(
  '/:id',
  [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DELIVERY_ROLE'),
  ],
  getSingleOrder
);

router.post(
  '/new',
  [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('name', 'El nombre del pedido es obligatorio').
      notEmpty()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener por lo menos 3 caracteres'),
    check('address', 'La dirección es obligatoria').notEmpty(),
    check('phone', 'El teléfono es obligatorio').notEmpty(),
    check('payment_method', 'El método de pago es obligatorio')
      .notEmpty()
      .isIn(['CASH', 'CARD'])
      .withMessage('El método ingresado no es válido'),
    check('total', 'El total del pedido es obligatorio')
      .notEmpty()
      .isNumeric(),
    check('bread_boxes', 'El detalle de las cajas de pan es obligatorio')
      .notEmpty()
      .custom( validateBreadBoxesInOrder ),
    fieldValidate
  ],
  setOrder
);

router.put(
  '/:id',
  [
    validateJWT,
    isTheClientInOrder,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsOrderId ),
    check('payment_method')
      .isIn(['CASH', 'CARD'])
      .withMessage('El método ingresado no es válido'),
    check('total')
      .isNumeric()
      .withMessage('El total debe ser un número'),
    check('bread_boxes')
      .custom( validateBreadBoxesInOrder ),
    fieldValidate,
  ],
  updateOrder
);

router.delete(
  '/:id', 
  [
    validateJWT,
    isTheClientInOrder,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsOrderId ),
    fieldValidate,
  ],
  deleteOrder
);


module.exports = router;