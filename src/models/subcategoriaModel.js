const joi = require('joi');
const fs = require('fs');

exports.createSchema = {
    id: joi.string().required(),
    name: joi.string().required(),
    category_id: joi.string().required()
};

exports.updateSchema = {
    name: joi.string().optional()
};

exports.fk_on_create = function(subcategory, c) {
  let data = fs.readFileSync('./data/categorias.json', 'utf8');
  let categories = JSON.parse(data);
  
  for (let i = 0; i < categories.length; i++) {

      if (categories[i].id == subcategory.categoryID) {
          return true;
      }
  }
  return false;
}

exports.fk_on_list_all = function(obj) {
	var file = './data/categorias.json';
    var data = fs.readFileSync(file, 'utf8');
    var categories = JSON.parse(data);
    for (var i = 0; i < categories.length; i++) {
    	console.log(categories[i].id);
        if (categories[i].id == obj.categoryID) {
            return true;
        }
    }
    return false;
}
exports.fk_on_read_one = function(obj, objeto) {
	var file = './data/categorias.json';
    var data = fs.readFileSync(file, 'utf8');
    var categories = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id == obj.categoryID) {
            ans = true && objeto.category_id == categories[i].id;
            break;
        }
    }
    return ans;
}
exports.fk_on_update = function(obj, objeto) {
  var file = './data/categorias.json';
    var data = fs.readFileSync(file, 'utf8');
    var categories = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id == obj.categoryID) {
            ans = true && objeto.category_id == categories[i].id;
            break;
        }
    }
    return ans;
}
exports.fk_on_delete = function(obj, objeto) {
  var file = './data/categorias.json';
    var data = fs.readFileSync(file, 'utf8');
    var categories = JSON.parse(data);
    var ans = false;
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id == obj.categoryID) {
            ans = true && objeto.category_id == categories[i].id;
            break;
        }
    }
    return ans;
}
