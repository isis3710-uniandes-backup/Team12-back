const joi = require("joi");
const fs = require("fs");

const objectSchema = {
    id: joi.string().required(),
    name: joi.string().required(),
    price: joi.number().required(),
    rating: joi.number().min(0).max(10).optional(),
    seller_id: joi.string().required(),
    description: joi.string().required(),
    category_id: joi.string().optional(),
    subcategory_id: joi.string().optional(),
    available: joi.boolean().required()
};
const updateSchema = {
    name: joi.string().optional(),
    price: joi.number().optional(),
    rating: joi.number().min(0).max(10).optional(),
    description: joi.string().optional(),
    category_id: joi.string().optional(),
    subcategory_id: joi.string().optional(),
    available: joi.boolean().optional()
};

const fk_on_create = function(object, s) {
    /*var category_ok = object.category_id==undefined;
    var subcategory_ok = object.subcategory_id==undefined;*/
    var seller_ok = false;
    /*if(object.category_id!==undefined){
        let data = fs.readFileSync('./data/categorias.json', 'utf8');
        let categories = JSON.parse(data);
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id == object.category_id) {
                category_ok = true;
            }
        }
    }
    if(object.subcategory_id!==undefined){
        let data = fs.readFileSync('./data/subcategorias.json', 'utf8');
        let subcategories = JSON.parse(data);
        for (let i = 0; i < subcategories.length; i++) {
            if (subcategories[i].id == object.subcategory_id) {
                subcategory_ok = true;
            }
        }
    }*/
    let data = fs.readFileSync('./data/usuarios.json', 'utf8');
    let users = JSON.parse(data);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == object.userID) {
            seller_ok = true && s.seller_id == users[i].id;
        }
    }
    return seller_ok;
    //return (category_ok && subcategory_ok) && seller_ok;
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
            ans = true && objeto.seller_id == users[i].id;
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
            ans = true && objeto.seller_id == users[i].id;
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
            ans = true && objeto.seller_id == users[i].id;
            break;
        }
    }
    return ans;
}

module.exports.createSchema = objectSchema;
module.exports.updateSchema = updateSchema;
module.exports.fk_on_create = fk_on_create;
