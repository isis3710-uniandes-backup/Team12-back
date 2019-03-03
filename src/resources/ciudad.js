const controller = require('../controllers/ciudadController');

module.exports = function(app) {
    // users Routes
    app.route('/cities')
        .get(controller.list_all_users)
        .post(controller.create_user);


    app.route('/cities/:ciryID')
        .get(controller.read_a_user)
        .put(controller.update_a_user)
        .delete(controller.delete_a_user);
};
