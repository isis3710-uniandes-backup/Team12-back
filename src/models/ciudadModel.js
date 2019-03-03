const Joi = require('joi');

exports.createSchema = {
    id: Joi.number().required(),
    name: Joi.string().required()
};

exports.updateSchema = {
    name: Joi.string().optional()
};

/*
    En caso de no tener que revisar ninguna llave. Simplemente retornar true.
*/

exports.fk_on_create = function(city) {
    return true;
}

exports.fk_on_update = function(city) {
    return this.fk_on_create(city);
}
