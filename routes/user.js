const { Router } = require('express');
const { check } = require('express-validator');

const {
  fieldValidate,
  validateJWT,
  isAdminRole,
  isTheSameRole,
} = require('../middlewares');
const { 
  isRoleValid, 
  existsUserById 
} = require('../helpers/db-validators');
const { 
  getUsers, 
  updateUser, 
  deleteUser 
} = require('../controllers/user');



const router = Router();

router.get(
  '/', 
  [ validateJWT, isAdminRole ], 
  getUsers
);

router.put('/:id', [
  validateJWT,
  isTheSameRole,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existsUserById ),
  check('role').custom( isRoleValid ), 
  fieldValidate,
], updateUser );

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existsUserById ),
  fieldValidate
],deleteUser );


module.exports = router;