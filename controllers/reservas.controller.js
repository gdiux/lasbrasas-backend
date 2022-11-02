const { response } = require('express');

const Reserva = require('../models/reservas.model');

/** =====================================================================
 *  GET RESERVA ID
=========================================================================*/
const getReservaID = async(req, res = response) => {

    try {

        const rid = req.params.id;

        const reserva = await Reserva.findById(rid);
        if (!reserva) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una reserva con este ID'
            });
        }

        res.json({
            ok: true,
            reserva
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  POST RESERVA
=========================================================================*/
const createReserva = async(req, res = response) => {

    try {

        const reserva = new Reserva(req.body);
        reserva.save();

        res.json({
            ok: true,
            reserva
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
    createReserva,
    getReservaID
}