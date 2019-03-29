const Controller = require('../controllers/resourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/usuarioModel'), './data/usuarios.json', 'userID');

    // users Routes
	app.get('/users',function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/users',function(req, res)  {

		c.create(req, res);
	});


	app.get('/users/:userID',function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/users/:userID',function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/users/:userID',function(req, res)  {
		c.delete_one(req, res);
	});
};
