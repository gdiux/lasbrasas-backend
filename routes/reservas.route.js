/** =====================================================================
 *  RESERVAS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

// CONTROLLERS
const { getReservaID, createReserva } = require('../controllers/reservas.controller');

const router = Router();

/** =====================================================================
 *  GET RESVEA ID
=========================================================================*/
router.get('/:id', getReservaID);
/** =====================================================================
 *  GET RESVEA ID
=========================================================================*/

/** =====================================================================
 *  CREATE RESERVAS
=========================================================================*/
router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('phone', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('qty', 'El email es obligatorio').not().isEmpty(),
        check('fecha', 'El email es obligatorio').not().isDate,
        validarCampos
    ],
    createReserva
);
/** =====================================================================
*  CREATE RESERVAS
=========================================================================*/


// EXPORTS
module.exports = router;