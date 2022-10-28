/** =====================================================================
 *  DEPARTMENTS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getDepartments } = require('../controllers/departments.controller');

const router = Router();

/** =====================================================================
 *  GET DEPARTMENTS
=========================================================================*/
router.get('/', getDepartments);
/** =====================================================================
 *  GET DEPARTMENTS
=========================================================================*/


// EXPORTS
module.exports = router;