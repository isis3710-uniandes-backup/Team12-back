const Controller = require('../controllers/resourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/usuarioModel'), './data/usuarios.json', 'userID');

    // users Routes
    app.route('/users')
        .get(function(req, res)  {
		    c.list_all(req, res);
		})
        .post(function(req, res)  {

		    c.create(req, res);
		});


    app.route('/users/:userID')
        .get(function(req, res)  {
		    c.read_one(req, res);
		})
        .put(function(req, res)  {
		    c.update_one(req, res);
		})
        .delete(function(req, res)  {
		    c.delete_one(req, res);
		});
};
