const Joi = require("joi");
const fs = require('fs');

exports.createSchema = {
    id: Joi.number().required(),
    seller_id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
};

exports.updateSchema = {
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional()
};

/*
Si fuesen, por ejemplo, /users/1/object/1/categories.
Debería comprobar que exista el usuario de id 1, el objeto de id 1
y que el objeto de id 1 pertenece al usuario de id 1.
obj = {userID: 1, serviceID: undefined}
*/
exports.fk_on_list_all = function(obj) {
	var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);
    for (var i = 0; i < users.length; i++) {
    	console.log(users[i].id);
        if (users[i].id == obj.userID) {
            return true;
        }
    }
    return false;
}

/*
Si fuesen, por ejemplo, /users/1/object/1/categories.
Debería comprobar que exista el usuario de id 1, el objeto de id 1
y que el objeto de id 1 pertenece al usuario de id 1.
obj = {userID: 1, serviceID: undefined}
*/
exports.fk_on_create = function(obj, service) {
	var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == obj.userID) {
            ans = true && service.seller_id == users[i].id;
            break;
        }
    }
    return ans;
}

/*
Si fuesen, por ejemplo, /users/1/object/1/categories.
Debería comprobar que exista el usuario de id 1, el objeto de id 1
y que el objeto de id 1 pertenece al usuario de id 1.
obj = {userID: 1, serviceID: 1}
*/
exports.fk_on_read_one = function(obj, service) {
	var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == obj.userID) {
            ans = true && service.seller_id == users[i].id;
            break;
        }
    }
    return ans;
}

/*
Si fuesen, por ejemplo, /users/1/object/1/categories.
Debería comprobar que exista el usuario de id 1, el objeto de id 1
y que el objeto de id 1 pertenece al usuario de id 1.
obj = {userID: 1, serviceID: 1}
*/
exports.fk_on_update = function(obj, service) {
	var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == obj.userID) {
            ans = true && service.seller_id == users[i].id;
            break;
        }
    }
    return ans;
}

/*
Si fuesen, por ejemplo, /users/1/object/1/categories.
Debería comprobar que exista el usuario de id 1, el objeto de id 1
y que el objeto de id 1 pertenece al usuario de id 1.
obj = {userID: 1, serviceID: 1}
*/
exports.fk_on_delete = function(obj, service) {
	var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == obj.userID) {
            ans = true && service.seller_id == users[i].id;
            break;
        }
    }
    return ans;
}