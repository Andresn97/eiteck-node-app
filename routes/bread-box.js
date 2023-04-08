const { Router } = require('express');
const { check } = require('express-validator');

const { 
  getBreadBoxes, 
  setBreadBox, 
  updateBreadBox, 
  deleteBreadBox
} = require('../controllers/bread-box');
const { 
  isAdminRole, 
  validateJWT, 
  fieldValidate, 
  hasRole
} = require('../middlewares');
const { existsBreadBoxById } = require('../helpers/boxes-validators');



const router = Router();

router.get(
  '/', 
  [ 
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
  ], 
  getBreadBoxes
);

router.post(
  '/new', 
  [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre de la caja es obligatorio')
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('El nombre por lo menos debe tener 3 caracteres'),
    check('price')
      .notEmpty()
      .isNumeric()
      .withMessage('El precio debe ser un número'),
    check('total_units', 'El total de unidades es obligatorio')
      .notEmpty()
      .isNumeric()
      .withMessage('El total debe ser un número'),
    check('description', 'La descripción de la caja es obligatoria')
      .notEmpty(),
    check('images', 'Es obligatorio mandar imágenes')
      .notEmpty(),
    fieldValidate,
  ],
  setBreadBox
);

router.put(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsBreadBoxById ),
    check('price')
      .isNumeric()
      .withMessage('El precio debe ser un número'),
    check('total_units')
      .isNumeric()
      .withMessage('El precio debe ser un número'),
    check('images').notEmpty(),
    fieldValidate,
  ],
  updateBreadBox
);

router.delete(
  '/:id', 
  [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsBreadBoxById ),
    fieldValidate,
  ],
  deleteBreadBox
);


module.exports = router;