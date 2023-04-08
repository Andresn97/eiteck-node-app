
const jwtValidate = require('../middlewares/jwt-validators');
const fieldValidate = require('../middlewares/field-validators');
const roleValidate = require('../middlewares/roles-validators');

module.exports = {
  ...jwtValidate,
  ...fieldValidate,
  ...roleValidate
}