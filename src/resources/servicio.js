const controller = require('../controllers/subresourcesController');

module.exports = function(app) {
	controller.init(require('../models/servicioModel'), './data/servicios.json', ['userID', 'serviceID']);

    // users Routes
    app.route('/users/:userID/services')
        .get(controller.list_all)
        .post(controller.create);


    app.route('/users/:userID/services/:serviceID')
        .get(controller.read_one)
        .put(controller.update_one)
        .delete(controller.delete_one);
};
