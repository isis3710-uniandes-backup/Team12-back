const joi = require("joi");

const objectSchema = {
    id: joi.number.positive().integer().required(),
    name: joi.string.required(),
    price: joi.number.required(),
    rating: joi.number.min(0).max(10).optional(),
    seller_id: joi.number.required(),
    description: joi.string.required(),
    category_id: joi.number.positive().integer().optional(),
    subcategory_id: joi.string.positive().integer().optional(),
    available: joi.boolean().required()
};
const updateSchema = {
    name: joi.string.optional(),
    price: joi.number.positive().integer().optional(),
    rating: joi.number.min(0).max(10).optional(),
    description: joi.string.optional(),
    category_id: joi.string.positive().integer().optional(),
    subcategory_id: joi.string.positive().integer().optional(),
    available: joi.boolean().optional()
};

const fk_on_create = function(object, seller_checked) {
    var category_ok = object.category_id==undefined;
    var subcategory_ok = object.subcategory_id==undefined;
    var seller_ok = seller_checked;
    if(object.category_id!==undefined){
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
    }
    let data = fs.readFileSync('./data/usuarios.json', 'utf8');
    let users = JSON.parse(data);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == object.seller_id) {
            seller_ok = true;
        }
    }
    return (category_ok && subcategory_ok) && seller_ok;
}

const fk_on_update = function(object) {
    if (object.category_id !== undefined || object.subcategory_id !== undefined)
        return this.fk_on_create(object, true);
    return true;
}

module.exports.createSchema = objectSchema;
module.exports.updateSchema = updateSchema;
module.exports.checkFKCreate = fk_on_create;
module.exports.checkFKUpdate = fk_on_update;
