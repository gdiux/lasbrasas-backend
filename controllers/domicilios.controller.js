const { response } = require('express');
const ObjectId = require('mongoose').Types.ObjectId;

const Domicilio = require('../models/domicilios.model');


/** =====================================================================
 *  GET ID DOMICILIO
=========================================================================*/
const getDomicilioId = async(req, res = response) => {

    try {

        const doid = req.params.id;

        if (!ObjectId.isValid(doid)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error en el ID del domicilio'
            });
        }

        const domicilio = await Domicilio.findById(doid);

        res.json({
            ok: true,
            domicilio
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  POST DOMICILIO
=========================================================================*/
const createDomicilio = async(req, res = response) => {

    try {

        const domicilio = new Domicilio(req.body);
        domicilio.save();

        res.json({
            ok: true,
            domicilio
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  PUT DOMICILIO
=========================================================================*/
const updateDomicilio = async(req, res = response) => {

    try {

        const doid = req.params.id;

        if (!ObjectId.isValid(doid)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error en el ID del domicilio'
            });
        }

        const domicilioDB = await Domicilio.findById(doid);
        if (!domicilioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun propiedad con este ID'
            });
        }

        const {...campos } = req.body;

        const domicilioUpdate = await Domicilio.findByIdAndUpdate(doid, campos, { new: true, useFindAndModify: false });

        const domicilio = await Domicilio.findById(doid)
            .populate('carrito.product');

        res.json({
            ok: true,
            domicilio
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};


// EXPORTS
module.exports = {
    createDomicilio,
    getDomicilioId,
    updateDomicilio
}