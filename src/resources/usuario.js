const controller = require('../controllers/resourcesController');

module.exports = function(app) {
	controller.init(require('../models/usuarioModel'), './data/usuarios.json', 'userID');

    // users Routes
    app.route('/users')
        .get(controller.list_all)
        .post(controller.create);


    app.route('/users/:userID')
        .get(controller.read_one)
        .put(controller.update_one)
        .delete(controller.delete_one);
};
