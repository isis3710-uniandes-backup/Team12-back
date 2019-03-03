const joi = require('joi');

exports.createSchema = {
    id: joi.number().required(),
    name: joi.string().required(),
    category_id: joi.number().positive().integer().required()
};

exports.updateSchema = {
    name: joi.string().optional()
};

exports.fk_on_create = function(subcategory) {
  let data = fs.readFileSync('./data/usuarios.json', 'utf8');
  let categories = JSON.parse(data);
  for (let i = 0; i < categories.length; i++) {
      if (categories[i].id == subcategory.category_id) {
          return true;
      }
  }
  return false;
}

exports.fk_on_update = function(subcategory) {
    return fk_on_create(subcategory);
}
