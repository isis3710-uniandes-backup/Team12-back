const Joi = require('joi');

exports.createSchema = {
    id: Joi.number().positive().integer().required(),
    paymentId: Joi.number().positive().integer().required(),
    objectId: Joi.number().positive().integer().required(),
    startDate: Joi.date().format('DD-MM-YYYY'),
    endDate: Joi.date().format('DD-MM-YYYY')
};

exports.updateSchema = {
    name: Joi.string().optional(),
    startDate: Joi.date().format('YYYY-MM-DD').optional(),
    endDate: Joi.date().format('YYYY-MM-DD').optional()

};

exports.fk_on_create = function(prestamo) {
    var paymentIdOk = prestamo.paymentId==undefined;
    var objectIdOk = prestamo.objectId==undefined;
    if(prestamo.paymentId!==undefined){
        let data = fs.readFileSync('./data/pagos.json', 'utf8');
        let payments = JSON.parse(data);
        for (let i = 0; i < payments.length; i++) {
            if (payments[i].id == prestamo.paymentId) {
                paymentIdOk = true;
            }
        }
    }
    if(prestamo.objectId!==undefined){
        let data = fs.readFileSync('./objetos.json', 'utf8');
        let objects = JSON.parse(data);
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].id == prestamo.objectId) {
                objectIdOk = true;
            }
        }
    }
    return paymentIdOk && objectIdOk;
}

exports.fk_on_update = function(prestamo) {
	if (prestamo.paymentId !== undefined || prestamo.subcategory_id !== undefined)
        return this.fk_on_create(prestamo);
    return true;
}
