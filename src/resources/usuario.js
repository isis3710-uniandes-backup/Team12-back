const Controller = require('../controllers/resourcesController');
const {jwtMW} = require('../config');

module.exports = function(app) {
	var c = new Controller(require('../models/usuarioModel'), './data/usuarios.json', 'userID');

    // users Routes
	app.get('/users', jwtMW, function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/users', jwtMW, function(req, res)  {

		c.create(req, res);
	});


	app.get('/users/:userID', jwtMW, function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/users/:userID', jwtMW, function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/users/:userID', jwtMW, function(req, res)  {
		c.delete_one(req, res);
	});
};
