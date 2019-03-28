const joi = require('joi');
const fs = require('fs');

exports.createSchema = {
    id: joi.number().required(),
    precioAnterior: joi.integer().required(),
    porcentajeDescuento: joi.number.required(),
    userId: joi.number().integer().required(),
    objetosId: joi.array().items(joi.number()).required()
};

exports.updateSchema = {
    precioAnterior: joi.integer().required(),
    porcentajeDescuento: joi.number.required(),
    userId: joi.number().integer().optional(),
    objetosId: joi.array().items(joi.number()).optional()

};

exports.fk_on_create = function(ofertas, c) {
  let data = fs.readFileSync('./data/usuarios.json', 'utf8');
  let users = JSON.parse(data);
  
  for (let i = 0; i < users.length; i++) {

      if (users[i].id == ofertas.userID) {
          return true && c.userId == ofertas.userID;
      }
  }
  return false;
}

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
exports.fk_on_read_one = function(obj, objeto) {
	var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == obj.userID) {
            ans = true && objeto.userId == users[i].id;
            break;
        }
    }
    return ans;
}
exports.fk_on_update = function(obj, objeto) {
  var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == obj.userID) {
            ans = true && objeto.userId == users[i].id;
            break;
        }
    }
    return ans;
}
exports.fk_on_delete = function(obj, objeto) {
  var file = './data/usuarios.json';
    var data = fs.readFileSync(file, 'utf8');
    var users = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == obj.userID) {
            ans = true && objeto.userId == users[i].id;
            break;
        }
    }
    return ans;
}
