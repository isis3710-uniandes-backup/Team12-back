const Joi = require('joi');

exports.createSchema = {
    id: Joi.number().required(),
    valor: Joi.number().positive().required(),
    prestamoId : Joi.number().positive().integer().required(),
    metodoPago: Joi.string().required(),
    numTarjeta: Joi.number.integer().required()
};

exports.updateSchema = {
	valor: Joi.number().positive().optional(),
	numTarjeta: Joi.string().optional,
    metodoPago: Joi.string().optional()
};

exports.fk_on_create = function(payment) {
 var prestamoIdOk = payment.prestamoId==undefined;
    if(payment.prestamoId!==undefined){
        let data = fs.readFileSync('./data/prestamos.json', 'utf8');
        let prestamos = JSON.parse(data);
        for (let i = 0; i < prestamos.length; i++) {
            if (prestamos[i].id == payment.prestamoId) {
                prestamoIdOk = true;
            }
        }
    }
    return prestamoIdOk;
}

exports.fk_on_update = function(payment) {
	if (payment.prestamoId!== undefined)
        return this.fk_on_create(payment);
    return true;
}
