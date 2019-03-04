const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const fs = require('fs');

exports.createSchema = {
    id: Joi.number().integer().required(),
    paymentId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
    objectId: Joi.number().integer().required(),
    startDate: Joi.date().format('DD-MM-YYYY'),
    endDate: Joi.date().format('DD-MM-YYYY')
};
 
exports.updateSchema = {
    name: Joi.string().optional(),
    paymentId: Joi.number().integer().optional(),
    userId: Joi.number().integer().optional(),
    objectId: Joi.number().integer().optional(),
    startDate: Joi.date().format('DD-MM-YYYY').optional(),
    endDate: Joi.date().format('DD-MM-YYYY').optional()

};
/*
* obj = {userID=1, objectID=1, prestamoID= undefined}
*/
exports.fk_on_list_all = function(obj) {
    var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/objetos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var objects = JSON.parse(data2);

    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return false;
    }
    for(var j=0; j < objects.length; j++){
        if(objects[j].id==obj.userID){
            return objects[j].seller_id == obj.userID;
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
exports.fk_on_create = function(obj, prestamo) {
    var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/objetos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var objects = JSON.parse(data);
    
    var ans = false;
    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return false;
    }
    for(var j=0; j < objects.length; j++){
        if(objects[j].id==obj.userID && objects[j].seller_id == obj.userID){
            ans = (true && prestamo.userId== users[i].id) && prestamo.objectId== obj.userID;
        }
    }
    
    return ans;
}

exports.fk_on_read_one = function(obj, prestamo) {
    var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/objetos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var objects = JSON.parse(data);
    
    var ans = false;
    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return false;
    }
    for(var j=0; j < objects.length; j++){
        if(objects[j].id==obj.userID && objects[j].seller_id == obj.userID){
            ans = (true && prestamo.userId== users[i].id) && prestamo.objectId== obj.userID;
        }
    }
    
    return ans;
}

exports.fk_on_update = function(prestamo) {
	var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/objetos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var objects = JSON.parse(data);
    
    var ans = false;
    for (var i = 0; i < users.length; i++) {
        for(var j=0; j < objects.length; j++){
            if(user[i].id==obj.userID && objects[j].id==obj.objectID && objects[j].seller_id == users[i]){
                ans = (true && prestamo.userId== users[i].id) && prestamo.objectId== obj.userID;
                break;
            }
        }
    }
    return ans;
}

exports.fk_on_delete = function(obj, service) {
    var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);

    var file2 = './data/objetos.json';
    var data2 = fs.readFileSync(file2, 'utf8');
    var objects = JSON.parse(data);
    
    var ans = false;
    var usuarioOk=false;
    for (var i = 0; i < users.length; i++) {
        if(users[i].id==obj.userID){
            usuarioOk=true;
            break;
        }
        return false;
    }
    for(var j=0; j < objects.length; j++){
        if(objects[j].id==obj.userID && objects[j].seller_id == obj.userID){
            ans = (true && prestamo.userId== users[i].id) && prestamo.objectId== obj.userID;
        }
    }
    
    return ans;
}
