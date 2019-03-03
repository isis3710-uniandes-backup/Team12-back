const Joi = require('joi');

exports.createSchema = {
    id: Joi.number().positive().integer().required(),
    paymentId: Joi.number().positive().integer().required(),
    userId: Joi.number().positive().integer().required(),
    objectId: Joi.number().positive().integer().required(),
    startDate: Joi.date().format('DD-MM-YYYY'),
    endDate: Joi.date().format('DD-MM-YYYY')
};

exports.updateSchema = {
    name: Joi.string().optional(),
    paymentId: Joi.number().positive().integer().optional(),
    userId: Joi.number().positive().integer().optional(),
    objectId: Joi.number().positive().integer().optional(),
    startDate: Joi.date().format('DD-MM-YYYY').optional(),
    endDate: Joi.date().format('DD-MM-YYYY').optional()

};

exports.fk_on_create = function(prestamo) {
    var objectIdOk = prestamo.objectId==undefined;
    var userIdOk = prestamo.userId== undefined;
    if(prestamo.objectId!==undefined){
        let data = fs.readFileSync('./objetos.json', 'utf8');
        let objects = JSON.parse(data);
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].id == prestamo.objectId) {
                objectIdOk = true;
            }
        }
    }
    if(prestamo.userId!==undefined){
        let data = fs.readFileSync('./usuarios.json', 'utf8');
        let users = JSON.parse(data);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == prestamo.userId) {
                objectIdOk = true;
            }
        }
    }
    return objectIdOk && userIdOk;
}

exports.fk_on_update = function(prestamo) {
	if (prestamo.objectId !== undefined || prestamo.userId !== undefined)
        return this.fk_on_create(prestamo);
    return true;
}
