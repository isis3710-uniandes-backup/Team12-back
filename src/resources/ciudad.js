const controller = require('../controllers/resourcesController');

module.exports = function(app) {
	controller.init(require('../models/ciudadModel'), './data/ciudades.json', 'cityID');
    // users Routes
    app.route('/cities')
        .get(controller.list_all)
        .post(controller.create);


    app.route('/cities/:cityID')
        .get(controller.read_one)
        .put(controller.update_one)
        .delete(controller.delete_one);
};
