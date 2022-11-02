const { Schema, model, connection } = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const ReservasSchema = Schema({

    reserva: {
        type: Number
    },

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
    },

    qty: {
        type: Number,
    },

    comment: {
        type: String,
    },

    decoration: {
        type: Boolean,
        default: false
    },

    status: {
        type: Boolean,
        default: false
    },

    fecha: {
        type: Date,
        require: true
    }

});

ReservasSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.rid = _id;
    return object;

});

ReservasSchema.plugin(autoIncrement.plugin, {
    model: 'Reservas',
    field: 'reserva',
    startAt: process.env.INVOICE_INIT
});

// invoice
module.exports = model('Reservas', ReservasSchema);