const Joi = require("joi");

exports.serviceSchema = {
    id: Joi.number().required(),
    seller_id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
};
