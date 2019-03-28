const joi = require('joi');

exports.createSchema = {
    id: joi.string().required(),
    name: joi.string().required()
};

exports.updateSchema = {
    name: joi.string().optional()
};

exports.fk_on_create = function(category) {
    return true;
}

exports.fk_on_update = function(category) {
    return true;
}
