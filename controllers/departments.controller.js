const { response } = require('express');

const Department = require('../models/departments.model');

/** =====================================================================
 *  GET DEPARTMENTS
=========================================================================*/
const getDepartments = async(req, res = response) => {

    try {

        const [departments, total] = await Promise.all([
            Department.find({ visibility: true }),
            Department.countDocuments()
        ]);

        res.json({
            ok: true,
            departments,
            total
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
 *  GET DEPARTMENTS
=========================================================================*/

// EXPORTS
module.exports = {
    getDepartments
};