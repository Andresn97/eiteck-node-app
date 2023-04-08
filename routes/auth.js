
// Routes of Users / Auth
// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');

const { 
  createUser, 
  loginUser, 
  reloadToken 
} = require('../controllers/auth');
const { fieldValidate } = require('../middlewares/field-validators');
const { 
  isRoleValid, 
  isEmailValid,
} = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/jwt-validators');


const router = Router();

router.post(
  '/new', 
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido')
      .isEmail()
      .custom( isEmailValid ),
    check(
      'password', 
      'La contraseña debe tener como mínimo 6 caracteres.'
    ).isLength({ min: 6 }),
    check('role').custom( isRoleValid ),
    fieldValidate,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check(
      'password', 
      'La contraseña es obligatoria.'
    )
    .not().isEmpty()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener como mínimo 6 caracteres.'),
    fieldValidate
  ],
  loginUser
);

router.get('/renew', validateJWT, reloadToken);


module.exports = router;