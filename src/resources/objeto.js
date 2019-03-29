const SubController = require('../controllers/subresourcesController');
const Controller = require('../controllers/resourcesController');

module.exports = function(app) {
	var c = new SubController(require('../models/objetoModel'), './data/objetos.json', ['userID', 'objectID'], 'seller_id');
	var c = new Controller(require('../models/objetoModel'), './data/objetos.json', 'objectID');

    // services Routes
    app.route('/users/:userID/objetos')
        .get(function(req, res)  {
		    c.list_all(req, res);
		})
        .post(function(req, res)  {
		    c.create(req, res);
		});

    app.route('/users/:userID/objetos/:objectID')
        .get(function(req, res)  {
		    c.read_one(req, res);
		})
        .put(function(req, res)  {
		    c.update_one(req, res);
		})
        .delete(function(req, res)  {
		    c.delete_one(req, res);
		});

	app.route('/objetos')
        .get(function(req, res)  {
		    c.list_all(req, res);
		});
};
