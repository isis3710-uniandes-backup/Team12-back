const Joi = require('joi');
const fs = require('fs');

exports.createSchema = {
    id: Joi.string().required(),
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    dni: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    city_id: Joi.string().required()
};

exports.updateSchema = {
    name: Joi.string().optional(),
    lastname: Joi.string().optional(),
    dni: Joi.string().optional(),
    age: Joi.number().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    city_id: Joi.string().optional()
};

/*
    En caso de no tener que revisar ninguna llave. Simplemente retornar true.
*/

exports.fk_on_create = function(user) {
    var file = './data/ciudades.json';
    var data = fs.readFileSync(file, 'utf8');
    var cities = JSON.parse(data);
    for (var i = 0; i < cities.length; i++) {
        if (cities[i].id == user.city_id) {
            return true;
        }
    }
    return false;
}

exports.fk_on_update = function(user) {
    if (user.city_id !== undefined)
        return this.fk_on_create(user);
    return true;
}
