const { response } = require('express');

const Product = require('../models/products.model');

/** =====================================================================
 *  GET PRODUCTS
=========================================================================*/
const getProducts = async(req, res = response) => {

    try {

        const tipo = req.query.tipo || 'none';
        const department = req.query.departamento || 'none';
        const valor = req.query.valor || 'false';
        const initial = req.query.initial || '01/01/2001';
        const end = req.query.end || new Date();
        const desde = Number(req.query.desde) || 0;
        const limite = Number(req.query.limite) || 10;
        const status = req.query.status || false;

        let products;
        switch (tipo) {
            case 'agotados':

                if (department !== 'none') {

                    products = await Product.find({ department: department, out: valor })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .sort({ out: -1 })
                        .skip(desde)
                        .limit(1000);

                } else {

                    products = await Product.find({ out: valor })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .sort({ out: -1 })
                        .skip(desde)
                        .limit(1000);
                }


                break;
            case 'vencidos':

                if (department !== 'none') {

                    products = await Product.find({
                            department: department,
                            $and: [{ expiration: { $gte: new Date(initial), $lt: new Date(end) } }]
                        })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .skip(desde)
                        .limit(limite);

                } else {

                    products = await Product.find({
                            $and: [{ expiration: { $gte: new Date(initial), $lt: new Date(end) } }],
                        })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .skip(desde)
                        .limit(limite);
                }

                // products = expirateProduct(productos);
                for (let i = 0; i < products.length; i++) {

                    if (!products[i].vencido) {

                        products[i].vencido = true;

                        // ACTUALIZAMOS
                        const productUpdate = await Product.findByIdAndUpdate(products[i]._id, products[i], { new: true, useFindAndModify: false });

                    }
                }

                break;
            case 'top':

                if (department !== 'none') {

                    products = await Product.find({ department: department, out: valor })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .sort({ sold: -1 })
                        .skip(desde)
                        .limit(limite);

                } else {

                    products = await Product.find()
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .sort({ sold: -1 })
                        .skip(desde)
                        .limit(limite);
                }

                break;
            case 'none':

                if (department !== 'none') {

                    products = await Product.find({ department: department })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .skip(desde)
                        .limit(1000);

                } else {

                    products = await Product.find()
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .skip(desde)
                        .limit(limite);

                }

                break;

            default:
                break;
        }

        const total = await Product.countDocuments();

        res.json({
            ok: true,
            products,
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
 *  GET PRODUCTS
=========================================================================*/

/** =====================================================================
 *  GET PRODUTS FOR ID
=========================================================================*/
const oneProduct = async(req, res = response) => {

    const id = req.params.id;

    try {

        const product = await Product.findById(id)
            .populate('kit.product', 'name')
            .populate('taxid', 'name valor');

        res.json({
            ok: true,
            product
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
 *  GET PRODUCTS BY CODE
=========================================================================*/
const codeProduct = async(req, res = response) => {

    try {

        const code = req.params.code;

        const product = await Product.findOne({ code, status: true })
            .populate('kit.product', 'name')
            .populate('taxid', 'name valor')
            .populate('department', 'name');

        res.json({
            ok: true,
            product
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
 *  GET PRODUCTS BY CATEGORY
=========================================================================*/
const departmentProduct = async(req, res = response) => {

    const department = req.params.department;
    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 1000;

    try {

        // data = await User.find({ name: regex });
        [products, total] = await Promise.all([
            Product.find({ department: department, status: true })
            .populate('kit.product', 'name')
            .populate('department', 'name')
            .populate('taxid', 'name valor')
            .skip(desde)
            .limit(hasta),
            Product.countDocuments()
        ]);

        res.json({
            ok: true,
            products,
            total
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });

    }

}




// EXPORTS
module.exports = {
    getProducts,
    oneProduct,
    codeProduct,
    departmentProduct,
};