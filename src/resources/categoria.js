const controller = require('../controllers/resourcesController');

module.exports = function(app) {
	controller.init(require('../models/categoriaModel'), './data/categorias.json', 'categoriaID');
    // users Routes
    app.route('/categories')
        .get(controller.list_all)
        .post(controller.create);


    app.route('/categories/:categoriaID')
        .get(controller.read_one)
        .put(controller.update_one)
        .delete(controller.delete_one);
};
