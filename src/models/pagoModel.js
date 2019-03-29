const Joi = require('joi');
const fs = require('fs');

exports.createSchema = {
    id: Joi.string().required(),
    prestamoId: Joi.string().required(),
    userId: Joi.string().required(),
    valor: Joi.number().required(),
    metodoPago: Joi.string().required(),
    numTarjeta: Joi.string().required(),
    cvv: Joi.number().integer().required()
};

exports.updateSchema = {
    metodoPago: Joi.string().optional(),
    valor: Joi.number().optional(),
    prestamoId: Joi.string().optional(),
    userId: Joi.string().optional(),
    numTarjeta: Joi.string().optional(),
    cvv: Joi.number().integer().optional()
};

exports.fk_on_list_all = function(obj) {
    var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/prestamos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var prestamos = JSON.parse(data2);

    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return usuarioOk;
    }
    
    for(var j=0; j < prestamos.length; j++){
        if(prestamos[j].id==obj.prestamoID){
            return prestamos[j].userId == obj.userID;
        }
    }
    
    return false;
}

/*
Si fuesen, por ejemplo, /users/1/object/1/categories.
Debería comprobar que exista el usuario de id 1, el objeto de id 1
y que el objeto de id 1 pertenece al usuario de id 1.
* obj = {userID=1, objectID=1, prestamoID= undefined}
*/
exports.fk_on_create = function(obj, payment) {
    var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/prestamos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var prestamos = JSON.parse(data2);
    
    var ans = false;
    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return false;
    }
    for(var j=0; j < prestamos.length; j++){
        if(prestamos[j].id==obj.prestamoID && prestamos[j].userId == obj.userID){
            ans = (true && payment.userId== users[i].id) && payment.prestamoId== obj.prestamoID;
        }
    }
    
    return ans;
}

exports.fk_on_read_one = function(obj, payment) {
    var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/prestamos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var prestamos = JSON.parse(data2);
    
    var ans = false;
    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return false;
    }
    for(var j=0; j < prestamos.length; j++){
        if(prestamos[j].id==obj.prestamoID && prestamos[j].userId == obj.userID){
            ans = (true && payment.userId== users[i].id) && payment.prestamoId== obj.prestamoID;
        }
    }
    
    return ans;
}

exports.fk_on_update = function(obj, payment) {
	var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/prestamos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var prestamos = JSON.parse(data2);
    
    var ans = false;
    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return false;
    }
    for(var j=0; j < prestamos.length; j++){
        if(prestamos[j].id==obj.prestamoID && prestamos[j].userId == obj.userID){
            ans = (true && payment.userId== users[i].id) && payment.prestamoId== obj.prestamoID;
        }
    }
    
    return ans;
}

exports.fk_on_delete = function(obj, payment) {
    var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/prestamos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var prestamos = JSON.parse(data2);
    
    var ans = false;
    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return false;
    }
    for(var j=0; j < prestamos.length; j++){
        if(prestamos[j].id==obj.prestamoID && prestamos[j].userId == obj.userID){
            ans = (true && payment.userId== users[i].id) && payment.prestamoId== obj.prestamoID;
        }
    }
    
    return ans;
}