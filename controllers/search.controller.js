const { response } = require('express');

const Department = require('../models/departments.model');
const Product = require('../models/products.model');

/** =====================================================================
 *  SEARCH FOR TABLE
=========================================================================*/
const search = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 50;

    let data = [];
    let total;
    let numeroPedido;

    switch (tabla) {

        case 'products':

            // data = await Client.find({ name: regex });
            [data, total] = await Promise.all([
                Product.find({
                    $or: [
                        { code: regex },
                        { name: regex },
                        { description: regex },
                        { type: regex }
                    ]
                })
                .populate('kit.product', 'name')
                .populate('taxid', 'name valor'),
                Product.countDocuments()
            ]);
            break;

        case 'departments':

            // data = await Department.find({ name: regex });
            [data, total] = await Promise.all([
                Department.find({ name: regex }),
                Department.countDocuments()
            ]);
            break;
        case 'categorias':

            // data = await Department.find({ name: regex });
            [data, total] = await Promise.all([
                Categoria.find({ name: regex })
                .populate('department', 'name did'),
                Categoria.countDocuments()
            ]);
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'Error en los parametros de la busquedad'
            });
            break;

    }

    res.json({
        ok: true,
        resultados: data,
        total
    });

};
/** =====================================================================
 *  SEARCH FOR TABLE
=========================================================================*/

/** =====================================================================
 *  SEARCH FRONTEND CLIENT
=========================================================================*/
const buscador = async(req, res = response) => {

    const termino = req.params.termino;
    const tipo = req.params.tipo;
    const regex = new RegExp(termino, 'i');

    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 10;

    let data = [];
    let total;

    switch (tipo) {
        case 'producto':

            data = await Product.find({
                    status: true,
                    out: false,
                    $or: [
                        { code: regex },
                        { name: regex },
                        { description: regex },
                        { type: regex }
                    ]
                })
                .populate('department', 'name')
                .skip(desde)
                .limit(hasta);
            break;

        case 'departamento':

            if (termino === 'none') {
                data = await Product.find({ status: true, out: false })
                    .populate('department', 'name')
                    .skip(desde)
                    .limit(hasta)
                    .sort({ sold: -1 });

            } else if (termino === 'nones') {
                data = await Product.find({ status: true, out: false })
                    .populate('department', 'name')
                    .skip(desde)
                    .limit(hasta)
                    .sort({ bought: -1 });

            } else {

                data = await Product.find({ department: termino, status: true, out: false })
                    .populate('department', 'name')
                    .skip(desde)
                    .limit(hasta);
            }

            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'Error en los parametros de la busquedad'
            });
            break;

    }

    res.json({
        ok: true,
        resultados: data,
        total
    });

};
/** =====================================================================
 *  SEARCH FRONTEND CLIENT
=========================================================================*/


// EXPORTS
module.exports = {
    search,
    buscador
};