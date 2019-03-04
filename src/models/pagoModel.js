const Joi = require('joi');

exports.createSchema = {
    id: Joi.number().required(),
    valor: Joi.number().required(),
    metodoPago: Joi.string().required(),
    numTarjeta: Joi.string().required(),
    cvv: Joi.number().integer().required()
};

exports.updateSchema = {
    metodoPago: Joi.string().optional(),
    valor: Joi.number().optional(),
    numTarjeta: Joi.string().optional(),
    cvv: Joi.number().integer().optional()
};

/*
    En caso de no tener que revisar ninguna llave. Simplemente retornar true.
*/

exports.fk_on_create = function(payment) {
    return true;
}

exports.fk_on_update = function(payment) {
    return this.fk_on_create(payment);
}