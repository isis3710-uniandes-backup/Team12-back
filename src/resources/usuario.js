const controller = require('../controllers/usuarioController');

module.exports = function(app) {
    // users Routes
    app.route('/users')
        .get(controller.list_all_users)
        .post(controller.create_user);


    app.route('/users/:userID')
        .get(controller.read_a_user)
        .put(controller.update_a_user)
        .delete(controller.delete_a_user);
};
