/** =====================================================================
 *  RESERVAS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

// CONTROLLERS
const { createDomicilio, getDomicilioId, updateDomicilio } = require('../controllers/domicilios.controller');

const router = Router();

/** =====================================================================
 *  GET DOMICILIO ID
=========================================================================*/
router.get('/:id', getDomicilioId);
/** =====================================================================
 *  GET DOMICILIO ID
=========================================================================*/

/** =====================================================================
 *  CREATE DOMICILIO
=========================================================================*/
router.post('/', [
        check('ubicacion', 'La ubicacion es obligatoria').not().isEmpty(),
        check('nombres', 'El nombre es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createDomicilio
);
/** =====================================================================
*  CREATE DOMICILIO
=========================================================================*/
/** =====================================================================
 *  UPDATE DOMICILIO ID
=========================================================================*/
router.put('/:id', updateDomicilio);
/** =====================================================================
 *  UPDATE DOMICILIO ID
=========================================================================*/


// EXPORTS
module.exports = router;