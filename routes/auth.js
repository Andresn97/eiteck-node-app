
// Routes of Users / Auth
// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { 
  createUser, 
  loginUser, 
  reloadToken 
} = require('../controllers/auth');


router.post(
  '/new', 
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check(
      'password', 
      'La contraseña debe tener como mínimo 6 caracteres.'
    ).isLength({ min: 6 }),
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check(
      'password', 
      'La contraseña debe tener como mínimo 6 caracteres.'
    ).isLength({ min: 6 }),
  ],
  loginUser
);

router.get('/renew', reloadToken);


module.exports = router;